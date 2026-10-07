# Public onboarding target

This trusted disposable target contains public synthetic Markdown only.
Implement only the approved Objective's owned source paths. Do not change the
immutable checker, workflow, package metadata, README or these instructions.
Do not commit, push, publish, deploy, access credentials or operate Factory's
controller lifecycle; Factory owns validation and delivery.

The one implementation Work Item owns src/parse-tasks.mjs and src/tasks.mjs.
Its parent coding context owns CLI input/output and formatting in src/tasks.mjs.
Delegate the independently implementable parser in src/parse-tasks.mjs to exactly
one native child context. The child may change only that parser file, receives
the complete README contract, and must not delegate or start another child.
The parent waits for that specific child's completion, inspects the result,
integrates the two files and runs the acceptance command before finishing.
Do not start a second child or a second whole implementation attempt.
This is a recorded scenario bound, not an assertion of a runtime SDK hard cap.
Provider access, spending, target permissions and lifecycle authority are limited
to the approved Objective; contributors' personal standing mandate does not apply.
