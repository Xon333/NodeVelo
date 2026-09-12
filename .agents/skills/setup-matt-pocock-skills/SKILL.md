---
name: setup-matt-pocock-skills
description: "Set up missing engineering-skill configuration or change the requested tracker, triage, or domain-document settings."
disable-model-invocation: true
---

# Setup Matt Pocock's Skills

NodeVelo is already configured. For this repository, inspect the relevant files in `docs/agents/` and change only the requested configuration. [AGENTS](../../../AGENTS.md) owns policy, `CLAUDE.md` imports it, and [domain documentation](../../../docs/agents/domain.md) maps glossary and decisions to their existing owners. Preserve those owners and formats; do not rerun the generic first-time setup or ask the user to reconfirm settled choices.

For a requested NodeVelo configuration change, read only the affected owner:

- [Issue tracker](../../../docs/agents/issue-tracker.md).
- [Triage labels](../../../docs/agents/triage-labels.md).
- [Domain documentation](../../../docs/agents/domain.md).

Inspect current values, resolve only material missing decisions, update the owner, and verify affected links. Follow [WORKFLOW](../../../WORKFLOW.md#codex-workflow) for repository integration.

For an explicitly requested setup in an unconfigured repository, read [FIRST-TIME-SETUP.md](FIRST-TIME-SETUP.md). Provider templates and generic domain layouts are conditional references within that guide; do not load them for ordinary NodeVelo tasks.
