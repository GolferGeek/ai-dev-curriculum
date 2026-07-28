# Scope and precedence

Use a tool-neutral scope model:

- **Personal:** one person or machine; experimentation and individual preference.
- **Project/team:** committed with a repository or shared team environment.
- **Enterprise:** organization-wide policy or reusable capability.

Actual tools differ; verify supported locations and override behavior.

Default precedence:

```text
enterprise prohibitions > project requirements > team preferences > personal preferences
```

Record whether overrides are allowed, who approves them, and how conflicts are surfaced. Personal convenience never weakens corporate security or project correctness.
