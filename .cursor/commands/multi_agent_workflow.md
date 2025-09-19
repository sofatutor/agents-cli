# Multi-Agent Decision Session Blueprint

Use this template when kicking off a structured collaboration between multiple personas inside Cursor. It pairs well with the shared rules in `.cursor/rules/multi_agent_guidelines.mdc`.

## Purpose
Provide a repeatable command that guides two or more expert personas through iterative review/refinement of a target artifact (e.g., spec, PRD, architecture doc) until it is stakeholder-ready.

## How to Use
1. Update the **Context** section before running (repository, files of interest, problem statement).
2. List the personas you want to involve; each persona should have a clear responsibility.
3. Copy the final prompt block into Cursor’s command runner (or invoke via saved command) to start the session. The command automatically inherits any rules placed in `.cursor/rules/`, so enable `multi_agent_guidelines.mdc` when you want the Observe→Reason→Adjust→Verify→Hand Off workflow enforced.
4. To run the same session via the OpenAI CLI, wrap the command with `zsh -ic` so your shell aliases/environment load correctly:

   ```bash
   zsh -ic "openai api chat.completions.create \\ \\
     -m gpt-5 \\ \\
     -g system \"<system-guidance>\" \\ \\
     -g user \"<multi-agent prompt copied from this file>\" \\ \\
     --format json"
   ```

   Notes:
   - Replace `<system-guidance>` with the high-level instructions (e.g., "Enforce Observe→Reason→Adjust→Verify→Hand Off and alternate personas").
   - If your prompt contains quotes or newlines, pipe it through `sed -e 's/"/\\"/g'` (or similar) before interpolation to keep the JSON payload valid.
   - Escape backticks (`\``) by appending the sed expression -e 's/`/\\`/g' so zsh does not treat them as command substitution.
   - The `--format json` flag ensures the response is emitted as valid JSON; parse the `choices[0].message.content` field.
   - For multi-turn loops, capture the JSON, append follow-up messages with `-g assistant` / `-g user`, and rerun the command. Persist the conversation history in a `.jsonl` file if you need reproducibility.

5. For ad-hoc edits to the working prompt, use `sed` inline filters (chain multiple -e expressions like `sed -e 's/<placeholder>/<value>/g' -e 's/`/\\`/g'`) so the command stays copy/paste friendly and safe for shells.

## Context (edit as needed)
- Artifact to refine: `<path/to/document>`
- Goal: `<clear objective>`
- Personas: `<Persona A>`, `<Persona B>`, `[optional Persona C]`

## Session Framework
Each persona must follow a consistent loop during the session:
- **Observe**: skim the next relevant portion of the artifact.
- **Reason**: call out findings, risks, or gaps from their perspective.
- **Adjust**: propose or make focused edits (append to the doc, insert TODOs, or note follow-ups).
- **Verify**: restate the change and confirm it improves alignment with the goal.
- **Hand Off**: direct the next persona toward the remaining open items.

Continue cycling personas until they jointly agree the artifact is ready for review. Document unresolved questions explicitly.

## Command Prompt
Paste the following prompt when starting a session (replace placeholders first):

```
You are coordinating a multi-persona working session. The personas are: <Persona A role>, <Persona B role>[, <Persona C role>]. Alternate between personas. On each turn, the active persona must Observe a small portion of <artifact>, Reason about issues or improvements, Adjust the document or add TODOs, Verify the outcome, then Hand Off to the next persona with explicit guidance. If automation scripts replay this prompt, assume inputs may be escaped/templated with `sed` (including backtick sanitization) and respond with well-formed JSON when requested. Repeat until the artifact meets the stated goal, then provide a joint summary and list outstanding questions.
```

## Tips
- Keep each turn scoped; do not rewrite the whole document at once.
- Use callouts like `> TODO (Owner)` for follow-ups.
- Encourage personas to reference relevant sections rather than general opinions.
- Conclude only when all personas agree the objective is met.
