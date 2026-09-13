# NodeVelo demo: recovered decisions, local work, and repository comparison

**Research snapshot: 2026-09-13.** The demo work preserved a substantial product brief and several useful fixes that have not reached GitHub. Its strongest contribution is a clearer definition of the intended user and experience: a knowledgeable, self-coached cyclist who wants inspectable guidance, personal control, and little friction. Its hosting architecture, provisional scores, and curated examples serve the demonstration; they do not establish production readiness or coaching effectiveness.

This report consolidates the original owner inputs, local implementation, and historical verification, then compares them with refreshed GitHub source. It is evidence for future decisions, not a change to the [roadmap](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/ROADMAP.md) or authorization to implement the recommendations.

## 1. Scope, evidence, and how to follow references

| Source | Examined scope |
|---|---|
| Original conversations | All available pages of **Plan NodeVelo app demo**, **Create demo tab screenshots**, and **Create demo tab screenshots (2)**. Twenty-six unique owner messages after removing inherited duplicates. |
| Local demo | Clean worktree at `/Users/otis/Cycling App/.worktrees/codex-demo-instance-plan`; branch `codex/demo-instance-plan`, HEAD `427924460eff27c59e1079eef56b2416a2237430`. Demo docs, commit/file inventory, relevant source and tests, selected stored logs. |
| GitHub baseline | Public repository **Xon333/NodeVelo**, refreshed `origin/main` at `cbdc2edf157beb88e0a3ba70decc0db4b0647c89`. GitHub links below pin this revision so the findings remain reproducible. |
| Internal consolidation | Local agent report plus deduplicated original input archive. These preserve detailed intent/provenance without publishing a raw conversation transcript. |

The demo diverged from `3bbc1f03633f9baf125f24e3e9f8ac69e77ac5ec`: **17 demo commits**, **109 changed files** from that base, and **10 later main commits absent from the demo**. No fetched remote branch contains the demo HEAD. These are dated inventory measurements, not ongoing project counters.

**Source priority:** original owner statements for intent; source/tests for behavior; persisted logs for historical verification; handoffs for navigation. Repeated text in a forked task is one source, not independent confirmation. This was a consolidation and targeted source comparison, not a line-by-line audit of all 109 files. Archived-task discovery, a new browser run, current Vercel-account inspection, and a fresh performance benchmark were outside the examined evidence.

**Local links** below open on the owner's machine in a compatible editor; GitHub cannot serve these files. They deliberately point to the preserved local demo rather than nonexistent public demo commits. The two internal files are `AGENT-REPORT.md` and `USER-INPUTS.md`. Both live under `/Users/otis/.codex/reports/nodevelo-demo-2026-09-13/` and are not committed with this report.

## 2. What you said about the product

The main primary source is the Slovenian DM pasted in **Create demo tab screenshots**, turn `01a08fa2-87a6-7e40-934e-90ca49824360`. The following is an English paraphrase, preserving its status as your product framing rather than verified market or physiological findings.

| ID | Your input | Meaning for the product | Current evidence / qualification |
|---|---|---|---|
| D1 | Advanced users encounter opacity, unreliability, bloat, and insufficient customization in AI coaching apps. | Transparent decisions and useful controls are central value, not optional technical detail. | Your problem hypothesis; no comparative market study was performed here. |
| D2 | You take the perspective of a cyclist with training knowledge who coaches themself; overtraining and lack of direction are recurring concerns. | Support athlete judgment and clear direction while preserving ownership of intent. | Current self-directed and prescribed workflows fit this audience. The app has not thereby proved it prevents overtraining. |
| D3 | NodeVelo is a framework/skeleton: training philosophy, nutrition philosophy, and historical data should be easy imports through API/Markdown plus ordinary settings. | Customization should extend beyond changing a few profile values. | Synced history and typed settings exist. Importing arbitrary philosophy into executable rules does not. |
| D4 | The finished product should be utilitarian and frictionless. | Concise wording, clear hierarchy, low navigation burden, and inspectable evidence are product requirements. | Your two page reviews give concrete examples; broad first-journey and performance work remain incomplete. |
| D5 | You use the app for your own training while developing it and deciding what comes next. | Real-use feedback matters alongside implementation evidence. | First-person context, not a substitute for the prospective block evidence required by the roadmap. |
| D6 | AI is useful but must sit on a deterministic foundation; otherwise the same opacity and reliability problems recur. Provider/token optimization remains active work. | Training decisions need explicit rules and facts; language capability must have bounded authority. | Substantially aligned with current generation and AI contracts; no provider replacement was decided in the demo. |
| D7 | Configurable segment metrics are work in progress; the Intervals.icu library is a crucial future cornerstone of deterministic, validated generation. Reusable plans also matter. | Preserve these as distinct strategic directions. | Owner requested dashed future connections. Existing workout export is not complete library reuse or whole-plan export. |

D7 comes from **Create demo tab screenshots (2)**, turns `01a09007-7ef1-7bd1-a2dc-dbaa04bc68d9` and `01a0900c-fc53-7bf1-accc-8cfbce55b37b`. The original wording is retained in the local input archive.

The repository already explains much of the deterministic foundation in [README](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/README.md), [generation](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/docs/systems/06-generation.md), and [AI authority](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/docs/systems/07-ai-layer.md). What this recovery adds is your more explicit target-athlete framing, the relationship between customization and transparency, and the concrete experience you want.

### Decisions, interpretations, and proposals must stay separate

- **Explicit owner decisions:** local-only demo source; later standalone Vercel hosting; one demo badge; selective shared UI/prose changes; provisional displayed interval score; scoring-policy deferral; experimental state/signals labels; Knowledge integration presented as inactive; a separate visual reference page; future library/metric connections dashed.
- **Agent interpretation:** hiding season panels in this demo answered your question about removing the season feature. It is not a decision to delete season planning from NodeVelo.
- **Proposed design:** translating imported philosophy into explicit, reviewed rules was an agent's implementation concept illustrated in the diagram. Your framework ambition and acceptance of the visual do not settle a policy schema, import format, validation contract, or implementation schedule.
- **Unfinished choices:** first-time viewer flow, performance improvements, production score policy, broader metric support, and the actual philosophy-import design.

Sources: original first/second reviews in the input archive; [refinement record](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/docs/demo/REFINEMENT.md>); [handoff](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/docs/demo/HANDOFF.md>).

## 3. What was built and how it evolved

| Stage | Local commits | Outcome |
|---|---|---|
| Plan and local recording instance | `14092a9`, `95fdab5` | Isolated synthetic athlete/history, populated real pages, fixed clock, recording/reset workflow, compiler-produced provisional block. |
| Integration and self-directed scenes | `e70079b` | Connection explanation, supported athlete-intent example, simulated saved-calendar handoff. Broad decluttering initially deferred. |
| Hosted interactive instance | `1dc4263`, `703e331` | Browser-owned visitor state, stateless request gateway, production build/package workflow; automatic Git connection removed and standalone deployment adopted. |
| Handoff and first page refinement | `bac7ea7`, `b3637eb`, `5ffdd10` | Owner's annotated review applied; richer synthetic evidence, shorter prose, clearer formula, shared layout fixes and updated captures. |
| Second review and scene navigation | `4aed013`, `0358354`, `b79b716` | Experimental labels, inactive Knowledge wording, climb/descent example, provisional score display, and explicit scene-reset escape from the preview leave guard. |
| Generation review | `a3226ac`, `fcdbc5e`, `00de9ea` | Goal inclusion controls, protection from late prefill, all-goal active-block summary, generation/acceptance matrix; problematic sample event removed. |
| Reference board | `60192f0`, `4b44086`, `4279244` | Two diagrams plus three supplied Intervals.icu captures; final titles **System** and **Configurability**. |

These commits remain local. The recorded deployment addresses are [interactive demo](https://nodevelo-demo.vercel.app/today) and [reference board](https://nodevelo-demo.vercel.app/reference). This report does not assert their present uptime. The final title deployment log records `READY` for `dpl_9pkTT9C1qnEXbvT9dpcgiH2mW7kv`; this is later than the deployment quoted near the top of the handoff. See [title deployment log](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/.demo-runtime/reference-titles-deploy.log>).

### Local and hosted architecture

The five scenes are **Planned ride**, **Completed ride**, **Choose your ride**, **Self-directed**, and **Provisional block**. They use the fixed day **2026-09-10** and twelve weeks of generated history. The original 30–60-second video opportunity evolved into a shareable interactive instance. No completed video or recipient viewing outcome was found.

The local launcher owns isolated runtime stores and a separate build directory. The hosted adaptation puts mutable JSON/Knowledge state in browser localStorage. A same-origin Web Lock serializes requests across tabs. Each routed API call submits the current state to `/api/demo/session`; allowlisted existing handlers run inside an AsyncLocalStorage scope and return updated state. Separate browsers have separate state; scene switching/reset starts fresh; reload retains that browser's edits. Server rendering uses bundled default-scene data.

This reuses actual scoring, deterministic generation, publication checks, and local action rules. Calendar writes are simulated. Sync reads scene state; analysis returns prepared commentary; provider calls and external transport are disabled. It is a purpose-built demonstration transport, not a migration of the production single-athlete app to hosted accounts.

Sources: [hosted runbook](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/docs/demo/HOSTED.md>), [browser transport](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/lib/demo/browser-session.ts>), [gateway](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/app/api/demo/session/route.ts>), [dispatch allowlist](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/lib/demo/hosted-dispatch.ts>), [runtime isolation](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/lib/demo/runtime.ts>).

### Provenance and the deliberate score exception

Your initial permission allowed an altered personal-data baseline. The implementation instead generated the interactive dataset entirely: identity, weight, physiology, rides, intake, laps, notes, history, and calendar IDs. Scores and supported calibration use real calculations over those generated inputs. Coach commentary is authored; the illustrative power curve is a synthetic capacity envelope. Neither is evidence of a real language-provider result or real athlete improvement.

The final self-directed fixture is a 75-minute ride: two 20-minute tempo efforts with five easy minutes between, a 25-minute rolling climb, and a five-minute descent. Three supported power/duration objectives are scored; descent-speed intent remains unscored context. The richer example was built within the existing matching rules.

You explicitly deferred scoring policy and approved a **provisional 8.9/10** display for **89% adherence** across Today, Plan, and Trends. The helper applies rounded adherence divided by ten only to eligible matched interval records in demo mode. Stored scores and athlete-model/planning inputs retain the original values. Consequently, a visible score and an experimental model insight can differ. That is an acknowledged presentation exception, not evidence that the production scorer was repaired.

The reference page is a separate provenance category: three original personal Intervals.icu captures, authorized specifically for that page. One shows a planned workout; two show the same self-directed ride. They are not imported into the interactive scenes and do not prove a calendar write by this hosted instance. This report links the local provenance, without copying those images to GitHub.

Sources: [manifest](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/demo/MANIFEST.md>), [fixtures](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/demo/scenarios.ts>), [presentation helper](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/lib/demo/presentation.ts>), [reference page](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/app/reference/page.tsx>).

## 4. Your page-by-page feedback and its disposition

| Area | Recovered requirement | Recorded implementation / remaining distinction |
|---|---|---|
| Global | Remove repeated connection strip and freshness banners; use information icons and consistent readable fonts; cut duplicate labels, rhetoric and lengthy explanations. Apply shared changes across scenes. | Selective refinements landed locally. The single app badge remains; reference visuals carry the integration story. Some edits affect shared code without a demo guard. |
| Today, prescribed | Open power execution; concise help; remove chart legend/target line; plausible fatigue on final repetition and short evidence-based takeaway. | Fixture's fifth effort finishes early at 1:45 / 245 W; note and takeaway aligned to evidence. Score-policy issue remains separately deferred. |
| Today, shared / no block | Remove repeated readiness/form/load-ramp explanation and redundant ride instructions; label uncertain signals experimental. | Local presentation updated. No-block summary stopped asserting all weekly loads were in range and stopped calling unspecified rides self-directed. |
| Plan | Richer goals/weakpoints, varied workout types, clear provisional syntax; clarify one-goal prefill and test generation. | Active block includes Threshold, VO2max, SIT, Z2, Recovery and Rest. Included/total goals, Include all, late-prefill guard and full saved-goal text added (remaining CSS clamp noted in F2). Season hidden only for demo. |
| Trends | Short Pw:HR, CTL and HRRc headings; **Work & Fuel**; remove redundant captions; vary recent session scores; inspect expanded history. | Generated effort variation now reaches the visible recent window. Layout wrapping improved. Original “brackets inside” defect was not reproduced; don't record it as diagnosed and fixed. |
| Model | Keep useful heading, remove repeated explanatory copy, improve directive examples. | Local copy and specific examples added. Successful Recovery sessions no longer suggest increasing intensity. Experimental status remains visible. |
| Profile / nutrition | Remove introductory/freshness clutter; put effort bands after formula; show learned multipliers and clearer calculation. | Formula component displays resolved calculation terms and support for calibration. This changes presentation, not validation of nutrition physiology. |
| Settings | Avoid Anthropic branding while provider choice is under consideration. | Local neutral wording; production provider and FR-6 decision remain unchanged. |
| Knowledge | Showcase customization, then explicitly identify integration as off and under development. | Notes remain editable; local UI points to effective Profile/Settings inputs. No Markdown-to-planning authority was added. |
| Self-directed | One note presentation; richer supported intent; add climb/descent, improve takeaway. | Final three graded objectives plus ungraded speed context; no invented speed score or terrain capability. |
| Reference | Separate from app UI; two diagrams and supplied screenshots, short labels, no document-like exposition. | Implemented. Current versus future connections use solid/dashed lines. Titles shortened at your request. |
| Viewer flow / lag | Easy first journey, meaningful differentiators, fewer ambiguous states, faster Vercel experience. | Selective clarity work and reference board completed; overall journey and measured performance remain open. |

Detailed requirements and historical checks: [REFINEMENT](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/docs/demo/REFINEMENT.md>). Capture sets: [initial review manifest](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/.demo-runtime/screens/ui-review-2026-09-11/manifest.json>) and [refined review manifest](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/.demo-runtime/screens/refined-review/manifest.json>). The original full input archive preserves every individual wording request.

## 5. Triangulation with GitHub

### 5.1 Product direction versus implemented capability

| Claim or direction | GitHub finding at the pinned revision |
|---|---|
| Deterministic decisions with optional AI language | Already implemented/documented. Generation invokes the compiler, not a plan-generating LLM. [Generation route](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/app/api/generate/route.ts); [AI contract](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/docs/systems/07-ai-layer.md). |
| Inspectable prescription and explicit acceptance | Compiler checks structured prescription/text meaning; publication uses the stored verdict for the submitted plan and refuses blockers. [Compiler](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/lib/block-compiler.ts); [write route](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/app/api/write/route.ts). |
| Self-directed support without owning the plan | Supported labelled intent and lap evidence already exist. Arbitrary metrics, speed grading and compound terrain semantics must not be inferred from the richer demo. [Intent scoring](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/lib/intent-scoring.ts); [scoring system](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/docs/systems/02-scoring-and-learning.md). |
| History-aware personalization | Existing athlete model, dated physiology, goals and settings support it; long-term effectiveness is still being tested. [Athlete model](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/lib/athlete-model.ts); [data system](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/docs/systems/01-sync-and-data.md). |
| Markdown philosophy controls training | Not implemented. Reference/history files remain editable; deterministic generation consumes typed data. Legacy profile parsing has a narrower compatibility role, so “Markdown is never read anywhere” would also be wrong. [Knowledge contract](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/docs/systems/04-knowledge.md); [KB loader](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/lib/kb-loader.ts). |
| Curated workout library drives the compiler | Incomplete. Local curation/services and individual-workout export exist; full curate/reuse/provenance/accepted-use loop remains FR-7. Current compiler uses its typed catalogue. [Library service](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/lib/workout-library-service.ts); [export](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/lib/workout-library-export.ts); [generation contract](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/docs/systems/06-generation.md). |
| Accepted block becomes reusable Intervals.icu training plan | A recorded direction, not shipped. Current publisher creates calendar events. [Roadmap](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/ROADMAP.md); [write route](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/app/api/write/route.ts). |
| Hosted demo implies hosted production product | No. Main remains a local, single-athlete application; hosting/accounts/productization remain deferred. [README](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/README.md); [freeze queue](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/ROADMAP.md). |

### 5.2 Specific local findings worth preserving

These identifiers label this report's evidence, not newly accepted tracker work. They require explicit selection and appropriate reproduction before production changes.

| ID | Finding | Main comparison and next useful action |
|---|---|---|
| F1 | New season-query data could overwrite an explicitly edited goal. Local `fcdbc5e` adds an edit guard. | Main [PlanView](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/components/dashboard/PlanView.tsx) still reapplies prefill for a new snapshot without that guard. Port a focused regression and minimal fix if selected; preserve intentional focus changes. [Local test](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/components/dashboard/PlanView.test.tsx>). |
| F2 | Active-block summary showed only the first saved goal line. | Main [plan component](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/components/dashboard/plan.tsx) still takes the first line; local preserves the full value in the DOM. Its surrounding paragraph still has `line-clamp-1`, so verify actual visibility before declaring the display repair complete. Distinguish hidden content from lost persisted goals. |
| F3 | A one-goal default was explained poorly. | Main focus filtering is deliberate, not evidence of profile deletion. Local included/total count and Include all improve control. Evaluate alongside F1/F2; don't remove filtering indiscriminately. [BlockGenerator](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/components/dashboard/BlockGenerator.tsx). |
| F4 | Successful Recovery sessions suggested adding a repetition or raising the target. | Main [deriveInsights](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/lib/athlete-model.ts) uses the generic success suggestion; local special-cases Recovery. A narrowly scoped wording/behavior repair is available with a regression. |
| F5 | No-block summary asserted that weekly load was in range regardless of actual total and called unplanned rides self-directed. | Main [no-block summary](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/lib/no-block-summary.ts) retains both claims. Local removes the unsupported range claim and uses unplanned terminology. Preserve the actual envelope/guidance evidence when selecting a repair. |
| F6 | An eight-week demo generation hit a protected event whose inherited slot was 49 minutes but RaceSim needed 56. | Demo removed the hidden November B fixture event. Compiler, skeleton and template source are identical across compared heads, so this was not a compiler fix. Reintroduce the event in an isolated regression to establish current scope/severity. [Skeleton](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/lib/block-skeleton.ts); [templates](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/lib/workout-templates.ts); [generation record](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/docs/demo/REFINEMENT.md>). |
| F7 | Shared presentation work is useful but mixed with demo infrastructure and policy exceptions. | Review selected changes in [demo PlanView](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/components/dashboard/PlanView.tsx>), [Knowledge editor](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/components/KnowledgeBaseEditor.tsx>), and [nutrition formula](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/components/NutritionFormulaSummary.tsx>). Whole-branch integration would import unrelated demo machinery and stale code. |

The disputed **3/10** was not a rendering arithmetic error. The recorded investigation found that 89% adherence received no adherence bonus under discrete bands, and whole-ride IF 0.79 subtracted two points from a baseline five. Main [execution scorer](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/lib/execution-score.ts) is unchanged between these heads. Whether that policy is useful is unresolved; the provisional display should not silently become the production policy.

### 5.3 Main has moved forward independently

Main contains repairs absent from the demo: runtime-store trace exclusion (MA-3), local-day preservation (SR-3), Profile container validation (MA-2), retrospective body validation (SR-4), deterministic backup concurrency testing (SR-5), updated product/setup language (MA-8), and dependency updates, alongside workflow/history work. See [shipment history](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/docs/history/shipments.md) and [dependency PR #127](https://github.com/Xon333/NodeVelo/pull/127).

This also resolves one historical warning: the demo used `UV_THREADPOOL_SIZE=16` after a backup test exhausted a 50-tick wait. Main's [SR-5 / PR #124](https://github.com/Xon333/NodeVelo/pull/124) now synchronizes at the actual filesystem pause. Do not carry that old workaround forward as a current-main requirement.

## 6. Verification: what the evidence actually establishes

| Historical evidence inspected | Supported conclusion | Limit |
|---|---|---|
| [First-refinement check](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/.demo-runtime/refinement-check.log>) | 2,634 tests passed, one skipped; required gate recorded. | Historical source/environment only. |
| [Second-pass check](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/.demo-runtime/second-pass-check.log>) | 2,638 passed, one skipped. | Second UI round was desktop-only by request. |
| [Reference check](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/.demo-runtime/reference-check.log>) | 2,640 passed, one skipped, plus recorded workflow/link checks. | Final title-only change intentionally did not rerun the suite. |
| [Public browser regression](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/.demo-runtime/reference-public-regression.log>) | 35 page/scene combinations; acceptance, reload persistence, visitor isolation and reset passed; no errors or external requests recorded by the script. | Functional sample, not a performance/security/accessibility audit. |
| [Generation test source](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/demo/generation-review.test.ts>) and [run log](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/.demo-runtime/generation-review-tests.log>) | Fresh generation/acceptance, preview non-mutation, retained profile goals and simulated events across two scenes and four lengths. | **Eight cases**, not every goal-count permutation: one goal at 2 weeks, three goals at 4/6/8 weeks; fixed start 2026-09-28. Removed event absent. |
| [Prefill red](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/.demo-runtime/generation-prefill-red.log>) / [green](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/.demo-runtime/generation-prefill-green.log>) | Focused test failed without the guard and passed with it. | Evidence for that regression, not every form-prefill interaction. |
| [Live-generation handoff](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/docs/demo/HANDOFF.md>) | Reports a separate four-week browser acceptance starting 2026-09-14, all three goals and 28 events. | Historical agent record; this consolidation did not repeat the interaction. |

The distinction in generation coverage matters: the handoff's “one/all goals” language can be read too broadly. The executable test establishes the narrower matrix above.

Synthetic scene success does not count as prospective nutrition validation, successful real block cycles, live language-provider quality, or real Intervals.icu publication. Those remain separate evidence contracts.

## 7. Open work and recommended use of this report

**Preserve the product brief.** Use D1–D7 when a future task revisits README/product framing, domain decisions, or UX. Current owning documents remain authoritative for shipped behavior. The framework aspiration should remain visible without claiming that Markdown already executes as training policy.

**Select fixes individually.** F1–F5 have concrete local changes and recognizable main-code counterparts. F6 needs a fresh minimal reproduction and an explicit event-duration contract. F7 is a source of selective UX improvements. None of these findings silently reprioritizes the freeze queue.

**Keep the deferred decisions explicit.** Scoring policy, experimental state/supporting signals, philosophy import, configurable segment metrics, library reuse, and whole-plan export each need their own accepted scope. Your interest is established; detailed contracts and activation are not.

**Complete demo work only when selected.** The handoff's five streams now resolve to: selective walkthrough refinements implemented with further review possible; first-journey design open; performance open; ambiguity partly addressed; reference visuals implemented. Full-state transport and serialized reads are plausible latency contributors visible in source, but no measured cause or before/after result was found. Measure before changing that architecture.

**Preserve the local sources.** Runtime captures/logs are ignored and the demo branch is local-only. This public synthesis improves discoverability but is not a backup of the source branch or recordings. No backup/publication of that material was performed.

The [current roadmap](https://github.com/Xon333/NodeVelo/blob/cbdc2edf157beb88e0a3ba70decc0db4b0647c89/ROADMAP.md) still has FR-6 awaiting comparison evidence/owner decisions, the small reliability fallback completed, and FR-7/FR-8 gated. This report completes the explicitly requested research scope without reopening those packages.

## 8. Local source map and stale-record cautions

| Need | Local reference |
|---|---|
| Operate/reset scenes | [Demo README](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/docs/demo/README.md>) |
| Hosting/state/package rules | [Hosted runbook](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/docs/demo/HOSTED.md>) |
| Page requests, implementation and generation review | [Refinement record](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/docs/demo/REFINEMENT.md>) |
| Continuation context and five workstreams | [Handoff](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/docs/demo/HANDOFF.md>) |
| Synthetic versus personal reference provenance | [Manifest](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/demo/MANIFEST.md>) |
| Diagram source | [System SVG](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/public/reference/decision-flow.svg>) and [Configurability SVG](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/public/reference/configuration.svg>) |
| Original local implementation plan | [Local-demo plan](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/docs/superpowers/plans/2026-09-10-local-demo-instance.md>) |
| Hosted adaptation plan | [Hosted-demo plan](</Users/otis/Cycling App/.worktrees/codex-demo-instance-plan/docs/superpowers/plans/2026-09-10-hosted-demo.md>) |

Treat these as layered history. The README's connection strip and two 30-minute Z2 example are superseded by later refinement; parts of the handoff still name earlier application/deployment revisions and omit the added climb. The handoff's original “screenshots not yet selected” paragraph is superseded by the approved reference-page section and manifest. HOSTED's statement about real scores needs the manifest's later provisional-display exception. This report resolves those contradictions for its snapshot without rewriting the preserved demo records.

