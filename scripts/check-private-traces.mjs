import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { once } from "node:events";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

// Exercise actual build output: a clean checkout otherwise hides accidental runtime-data tracing.
const root = process.cwd();
const next = path.join(root, "node_modules/next/dist/bin/next");
const scratch = await fs.mkdtemp(path.join(os.tmpdir(), "nodevelo-traces-"));
const token = `trace-canary-${randomUUID()}`;
const canaries = [
  `data/${token}.json`,
  `data/${token}.json.bak`,
  `knowledge-base/${token}.md`,
  `knowledge-base/block-retrospectives/${token}.md`,
];
const created = [];
let server;
let serverExit;
const env = {
  ...process.env,
  NODEVELO_DATA_DIR: path.join(scratch, "data"),
  NODEVELO_KB_DIR: path.join(scratch, "knowledge-base"),
  NODEVELO_BACKUP_DIR: "",
  NEXT_TELEMETRY_DISABLED: "1",
};

try {
  for (const rel of canaries) {
    const file = path.join(root, rel);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify({ synthetic: token }), { flag: "wx" });
    created.push(file);
  }
  await fs.mkdir(env.NODEVELO_DATA_DIR);
  await fs.mkdir(env.NODEVELO_KB_DIR);
  const data = JSON.stringify({ synthetic: "external-runtime-data" });
  const knowledge = "# External runtime knowledge\nSynthetic production smoke fixture.\n";
  await fs.writeFile(path.join(env.NODEVELO_DATA_DIR, "smoke.json"), data);
  await fs.writeFile(path.join(env.NODEVELO_KB_DIR, "athlete_profile.md"), knowledge);

  const build = spawn(process.execPath, [next, "build"], { env, stdio: "inherit" });
  const [buildCode] = await once(build, "exit");
  assert.equal(buildCode, 0, "production build must succeed");

  const output = path.join(root, ".next");
  const traces = (await fs.readdir(output, { recursive: true }))
    .filter((file) => file.endsWith(".nft.json"));
  assert.ok(traces.length > 0, "build must emit trace manifests");
  const traced = new Set();
  let privateReferences = 0;
  for (const rel of traces) {
    const manifest = path.join(output, rel);
    const { files } = JSON.parse(await fs.readFile(manifest, "utf8"));
    for (const file of files) {
      const absolute = path.resolve(path.dirname(manifest), file);
      traced.add(absolute);
      if (["data", "knowledge-base"].some((dir) =>
        absolute.startsWith(path.join(root, dir) + path.sep))) privateReferences++;
    }
  }
  // Report counts only: developer builds may contain personal filenames.
  assert.equal(privateReferences, 0, "private runtime references in production traces");
  for (const name of (await fs.readdir(path.join(root, "knowledge-base-defaults")))) {
    if (name.endsWith(".md") && name !== "README.md") {
      assert.ok(traced.has(path.join(root, "knowledge-base-defaults", name)),
        `shipped knowledge default missing from traces: ${name}`);
    }
  }
  console.log(`Checked ${traces.length} trace manifests: no private runtime files; defaults retained.`);

  // Let the OS choose a free loopback port; obtain it from Next's ready output.
  server = spawn(process.execPath, [next, "start", "-H", "127.0.0.1", "-p", "0"],
    { env, stdio: ["ignore", "pipe", "pipe"] });
  serverExit = once(server, "exit");
  let outputText = "";
  server.stdout.on("data", (chunk) => { outputText += chunk; });
  server.stderr.on("data", (chunk) => { outputText += chunk; });
  let origin;
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    origin = outputText.match(/http:\/\/127\.0\.0\.1:\d+/)?.[0];
    if (origin && /Ready in/.test(outputText)) break;
    assert.equal(server.exitCode, null, "production server exited before readiness");
    await delay(100);
  }
  assert.ok(origin && /Ready in/.test(outputText), "production server readiness timed out");
  async function get(route) {
    const response = await fetch(`${origin}${route}`, { signal: AbortSignal.timeout(10_000) });
    assert.equal(response.status, 200, `${route} must return 200`);
    return response.json();
  }
  const bundle = await get("/api/export");
  assert.deepEqual(bundle.data, { "smoke.json": data });
  assert.deepEqual(bundle.knowledgeBase, { "athlete_profile.md": knowledge });
  assert.equal((await get("/api/knowledge?file=athlete_profile.md")).content, knowledge);
  assert.equal((await get("/api/knowledge?file=training_knowledge.md")).content,
    await fs.readFile(path.join(root, "knowledge-base-defaults/training_knowledge.md"), "utf8"));
  console.log("Production smoke passed: external data/knowledge reads and shipped KB fallback.");
} finally {
  if (server && server.exitCode === null) {
    server.kill("SIGTERM");
    await serverExit;
  }
  await Promise.all(created.map((file) => fs.unlink(file)));
  await fs.rm(scratch, { recursive: true, force: true });
}
