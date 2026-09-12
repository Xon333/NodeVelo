---
name: ask-matt
description: Ask which skill or flow fits your situation. A router over the skills in this repo.
disable-model-invocation: true
---

# Ask Matt

Recommend the skill or workflow that fits the user's requested outcome. Inspect available context before asking for missing information. A request for advice ends with the recommendation; an already authorized task continues through the appropriate workflow. Merely having a repository or a large task does not require an interview, a new session, or a stack of skills.

## The main flow: idea → ship

Choose the entry point that answers the current need; these are alternatives, not mandatory stages.

| Requested outcome | Relevant guidance |
|---|---|
| Stress-test an idea through an interview | [grilling](../grilling/SKILL.md), with [grill-with-docs](../grill-with-docs/SKILL.md) when recording agreed terms and decisions is requested |
| Answer a design question with something runnable | [prototype](../prototype/SKILL.md); deliver the experiment and findings within its scope |
| Capture settled requirements or split approved work into tickets | [to-spec](../to-spec/SKILL.md) / [to-tickets](../to-tickets/SKILL.md), within the user's authorization for tracker writes |
| Implement a concrete spec or ticket | [implement](../implement/SKILL.md), through NodeVelo's sanctioned finish workflow |
| Build or fix behavior test-first | [tdd](../tdd/SKILL.md) |
| Review code or received feedback | [code-review](../code-review/SKILL.md) |

For work spanning multiple steps, retain the user's scope, decisions, and current evidence. Do not clear context between tickets or require a handoff to run a prototype. See [completion policy](../../../AGENTS.md#completion-and-decisions).

## On-ramps

- For uncertain bug causes, use [diagnosing-bugs](../diagnosing-bugs/SKILL.md). Source inspection and provisional hypotheses help construct a useful reproduction; fixes need supporting evidence. An unavailable test seam does not automatically authorize an architecture project.
- For incoming issue or PR triage, use [triage](../triage/SKILL.md) with the configured tracker and requested scope.
- For an explicitly requested map of unresolved decisions, use [wayfinder](../wayfinder/SKILL.md). Clear requirements can proceed directly to the requested plan or implementation.

## Codebase health

Use [improve-codebase-architecture](../improve-codebase-architecture/SKILL.md) for a requested architecture investigation. Do not start one merely because there is spare time or a routine task touches an imperfect module.

## Vocabulary underneath

Use [domain-modeling](../domain-modeling/SKILL.md) when changing domain terms or decisions, and [codebase-design](../codebase-design/SKILL.md) when reasoning about module interfaces. Reading existing terminology alone does not require a modeling session. [NodeVelo domain documentation](../../../docs/agents/domain.md) owns the glossary and decision locations.

## Phase boundaries

Continue authorized work through normal compaction. Consult [PHASE-BOUNDARIES.md](PHASE-BOUNDARIES.md) only when deciding whether an actual transfer or delegated task is needed. Do not infer model limits from a fixed token threshold.

## Standalone

- [research](../research/SKILL.md) produces cited findings; delegation is conditional, not required.
- [grill-me](../grill-me/SKILL.md) supports an explicitly requested interview without saved artifacts; use [grill-with-docs](../grill-with-docs/SKILL.md) when documentation is part of the request.
- [resolving-merge-conflicts](../resolving-merge-conflicts/SKILL.md) handles an in-progress merge or rebase conflict.
- [to-questionnaire](../to-questionnaire/SKILL.md) prepares questions for another person; [wizard](../wizard/SKILL.md) guides steps only the human can perform.
- [wait-what](../wait-what/SKILL.md) re-explains an unclear response; [teach](../teach/SKILL.md) supports requested learning.
- [writing-for-agents](../writing-for-agents/SKILL.md) guides repository instructions and documentation.

## Precondition

NodeVelo already has [tracker configuration](../../../docs/agents/issue-tracker.md) and domain documentation. Use [setup-matt-pocock-skills](../setup-matt-pocock-skills/SKILL.md) only for a requested configuration change or an unconfigured repository.
