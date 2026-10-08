import { readFileSync } from "node:fs";
import { parseTasks } from "./parse-tasks.mjs";

if (process.argv.length > 2) {
  process.stderr.write("Usage: node src/tasks.mjs\n");
  process.exitCode = 2;
} else {
  const tasks = parseTasks(readFileSync(0, "utf8"));
  const done = tasks.filter((task) => task.done).length;
  const lines = [
    `Tasks: ${tasks.length} (${done} done, ${tasks.length - done} open)`,
    ...tasks.map((task) => `[${task.done ? "x" : " "}] ${task.text}`),
  ];
  process.stdout.write(`${lines.join("\n")}\n`);
}
