---
name: whats-next
description: Use when asked what to work on next, to check the roadmap for priorities, or to suggest the next task — including splitting work across two concurrent sessions.
---

# What's next

1. Read [ROADMAP's ordered queue](../../../ROADMAP.md#follow-this-queue), then the selected
   defect's acceptance detail in [todo](../../../todo.md). The roadmap owns order; reports and
   historical plans are evidence, not alternative backlogs.
2. Verify the queue against current integrated commits and relevant PR state. Distinguish merged,
   open, local-only, blocked, and disproved work. If the first item already closed, record the
   evidence and advance; a newly demonstrated P1 can interrupt with a stated reason.
3. Recommend the first actionable item and its completion criterion. For a blocked item, state
   the missing prerequisite and follow the roadmap's explicit fallback. Do not invent readiness
   from elapsed dates or old plan checkboxes.
4. Link the relevant [Compass subsystem](../../../docs/COMPASS.md#i-need-to) and known rough edges
   when they affect the proposed work. Flag stale documentation briefly without starting an audit.
5. Honor the current one-implementation-task freeze. If the user explicitly requests concurrent
   implementation, identify that change of scope and use disjoint file ownership; otherwise the
   parallel lane is normal riding and FR-9 evidence, as the roadmap specifies.
6. A recommendation-only request ends with the recommendation. If the user already authorized
   implementation of the next task, continue through the existing workflow without asking again.
