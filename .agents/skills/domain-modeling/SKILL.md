---
name: domain-modeling
description: Refine domain terminology and record accepted design decisions when the project model is being changed.
---

# Domain Modeling

Sharpen domain terms and relationships when they affect the requested design. Reading an existing glossary alone does not require a modeling session.

## Repository ownership

Follow [NodeVelo domain documentation](../../../docs/agents/domain.md) for glossary and decision ownership. Preserve existing formats and stable IDs. Record accepted terms and decisions in those owners; do not create parallel domain files.

## File structure

NodeVelo already has the required documents. Only when adapting this skill to a repository without established owners, consult [CONTEXT-FORMAT.md](CONTEXT-FORMAT.md) for glossary layouts and [ADR-FORMAT.md](ADR-FORMAT.md) for decision records. These generic templates are not required reading for NodeVelo work.

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with the existing glossary, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y. Which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account': do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible. Which is right?"

### Update the glossary inline

When a term is resolved within the authorized task, update the owning glossary using its existing format. Keep it focused on domain meaning; implementation details and decisions belong in their own documents.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse**: the cost of changing your mind later is meaningful
2. **Surprising without context**: a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off**: there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Record accepted decisions in the owning decision log using its existing format.
