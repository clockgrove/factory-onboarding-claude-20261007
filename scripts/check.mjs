import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

const markdown = [
  "# Checklist",
  "- [ ] Link the work item",
  "* [x] Explain `changed code`",
  "+ [X] Keep `[ ]` inside a label",
  "`- [x] Inline-only text is not a task`",
  "- `[ ]` An ordinary bullet",
  "    - [ ] Four-space-indented code",
  "````js",
  "- [x] Hidden in backtick fence",
  "```",
  "- [ ] A short fence did not close it",
  "~~~~",
  "- [ ] The other character did not close it",
  "````",
  "~~~text",
  "- [ ] Hidden in tilde fence",
  "~~~",
  "  - [ ] Preserve <literal> & text",
  "- [ ]      ",
  "- [x]No required space after checkbox",
  "```",
  "- [x] Hidden by unclosed final fence",
].join("\n");
const expected = "Tasks: 4 (2 done, 2 open)\n[ ] Link the work item\n[x] Explain `changed code`\n[x] Keep `[ ]` inside a label\n[ ] Preserve <literal> & text\n";
function check(input, args, output, status = 0, stderr = "") {
  const result = spawnSync(process.execPath, ["src/tasks.mjs", ...args], {
    input, encoding: "utf8", timeout: 5000,
  });
  assert.ifError(result.error);
  assert.equal(result.status, status, result.stderr);
  assert.equal(result.stdout, output);
  assert.equal(result.stderr, stderr);
}
check(markdown, [], expected);
check(markdown.replaceAll("\n", "\r\n"), [], expected);
check("", [], "Tasks: 0 (0 done, 0 open)\n");
check("- [ ] Unused", ["extra"], "", 2, "Usage: node src/tasks.mjs\n");
console.log("PASS task-summary CLI");
