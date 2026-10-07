# Markdown task summary

A dependency-free Node.js command-line utility for turning a Markdown checklist
into a stable plain-text task summary. This proposed public onboarding fixture
is independent of earlier Factory qualification scenarios; it grants no replay,
state replacement, controlled failure or service-restart authority.

## Behavior

Run `node src/tasks.mjs` with UTF-8 Markdown on standard input. No arguments
are supported. A nonempty argument list exits 2, writes exactly
`Usage: node src/tasks.mjs\n` to standard error, and writes no standard output.

The parser exports `parseTasks(markdown)` from `src/parse-tasks.mjs`. It returns
an array of `{ done: boolean, text: string }` objects in document order.
Recognize a task only when a line has zero to three leading spaces, one of
`-`, `*`, or `+`, one space, `[ ]`, `[x]`, or `[X]`, one space, and a nonempty
label after trimming its outer whitespace. Preserve label contents, including
literal backticks, brackets, angle brackets and ampersands. Four-space-indented
lines, ordinary bullets and checkbox-looking inline-code-only lines are not
checkbox tasks. Checkbox text inside a task label creates no extra task.
LF and CRLF documents have the same meaning.

Ignore task-looking lines inside fenced code. A fence opens with zero to three
spaces and at least three identical backticks or tildes, optionally followed by
an information string. It closes with zero to three spaces, the same character
repeated at least the opening count, and optional trailing whitespace only.
A different fence character or a shorter fence does not close the block.
An unclosed fence hides the remainder of the document. Inline code in a label
stays literal; this utility does not implement a general Markdown renderer.

The CLI writes exactly `Tasks: N (D done, O open)\n`, followed by each task as
`[x] LABEL\n` or `[ ] LABEL\n`. An empty/no-task document produces exactly
`Tasks: 0 (0 done, 0 open)\n`. Output has no timestamps, paths or extra prose.
No dependencies, network, configuration, Markdown library or HTML output.

## Acceptance command

`node scripts/check.mjs`

The immutable check starts the real CLI with Markdown on standard input and
compares actual output/exit status. It covers mixed checkbox markers, literal
inline-code labels, fenced exclusions, long/short fence closing, LF/CRLF,
empty input and argument refusal. Independent review assesses the full contract;
passing examples alone do not prove every stated parser rule.

## Delivery

The pull-request workflow job `source-check` must pass on the exact published
head before integration. Final Objective review verifies the integrated result.
Only `src/parse-tasks.mjs` and `src/tasks.mjs` may change. The checker, workflow,
package metadata, README and AGENTS instructions are immutable baseline sources.
