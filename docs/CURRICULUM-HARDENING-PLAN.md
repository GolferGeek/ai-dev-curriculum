# Curriculum Hardening Plan

Status: implementation complete; final validation and release recorded
2026-07-28. Client-specific preflight and an instructor rehearsal remain
delivery gates for each scheduled cohort, not unfinished curriculum work.

## Outcome

Deliver a marketable five-day AI development program for developers that can
be taught from the repository without relying on unfinished outlines,
placeholder documents, undocumented instructor knowledge, or one specific AI
coding harness.

## 1. Establish a clean baseline

- Classify all modified, renamed, and untracked files.
- Separate source artifacts from temporary, rendered, and inspection output.
- Update `.gitignore` for reproducible generated output.
- Verify the phase-directory moves and repair broken references.
- Commit the legitimate existing work in reviewable slices.
- Push and confirm a clean working tree.
- Retire the existing phase tags after their history is safely represented.
- Create the single immutable starter-kit tag only after the starter state
  passes clean-clone verification.

## 2. Finalize the delivery model

- Keep one continuing learner codebase instead of phase branches or tags.
- Use `apps/` as the learner workspace.
- Place complete reference applications under `completed/apps/`.
- Define exactly what is present at the starter-kit tag and what learners move
  after receiving the complete repository.
- Explain that completed applications are visible references, not hidden
  answers.
- Verify the experience from a fresh clone.

## 3. Build the portable AI operating layer

- Select an unambiguous location for canonical skills and agents.
- Define portable skill and agent schemas.
- Generate native Claude Code, Cursor, and Codex interpretations.
- Keep harness-specific models, tools, permissions, and settings in overlays.
- Commit generated project-level distributions so a clone works immediately.
- Support optional personal, plugin, and organization-managed publication.
- Mark generated files and prevent direct edits.
- Add format validation, projection completeness checks, and drift detection.
- Add CI checks that fail when generated files do not match canonical sources.
- Migrate and test the existing skills and agents.
- Correct outdated harness documentation.
- Define ownership, approval, release, update, and retirement practices.

## 4. Finish every teaching and delivery artifact

Create an artifact inventory that identifies the audience, phase, usage point,
source, related deck, and completion status of every document.

Every instructor-facing and participant-facing artifact must be reviewed for:

- A complete purpose, audience, and expected outcome.
- Fully developed teaching content rather than headings or starter prose.
- Accurate prerequisites, commands, links, terminology, and tool behavior.
- Before-lab preparation, during-lab instruction, and after-lab follow-through.
- Timing, transitions, demonstrations, discussion prompts, and checkpoints.
- Complete exercises, expected results, acceptance criteria, and recovery
  guidance.
- Common misconceptions, likely failures, and instructor responses.
- Consistency with the phase overview, lesson plan, deck, syllabus, setup
  guide, and marketing claims.
- Removal of placeholders, TODOs, stale claims, and unnecessary duplication.
- Clear indication of what the instructor teaches from and what participants
  receive.

PowerPoint decks must receive slide-by-slide content and visual review. A
generated `.pptx` file does not count as a finished deck until it has been
rendered and inspected.

## 5. Validate the five-day program

- Map phases and combined blocks onto five teachable days.
- Confirm that each day has achievable outcomes and realistic lab time.
- Check pacing, transitions, breaks, setup overhead, and recovery time.
- Ensure recurring ideas build coherently across the week.
- Verify that the program is strictly for developers.
- Create a remote-delivery runbook for single-client and multi-client cohorts.
- Define account, license, repository, connectivity, and pre-class checks.
- Test the instructor path and participant path independently.

## 6. Teach tool choice and organizational maintenance

- Recommend Cursor as the common development environment without making it a
  client requirement.
- Fully support Claude Code and Codex workflows.
- Teach the differences between IDE, CLI, plugin, and agent-first surfaces.
- Explain current model-provider and vendor-platform tradeoffs as dated
  terrain, not permanent truth.
- Require participants to choose and preflight a supported harness before
  class.
- Teach the monorepo as shared organizational memory and an organizational AI
  capability maintained through Git governance.
- Distinguish repository-level distribution from vendor-managed enforcement.
- Teach discovery, evaluation, publication, testing, drift management,
  updating, and retirement for both skills and agents.

## 7. Produce MindNode teaching maps

Store all maintained map sources and generated maps in
[`docs/mind-maps/`](mind-maps/README.md).

- Build a curated master teaching map for the complete program.
- Build one detailed teaching map per finalized phase or teaching block.
- Generate both the master and phase maps from one maintainable source.
- Use OPML as the portable interchange format for MindNode.
- Include the program story, timing, concepts, demonstrations, discussion
  prompts, labs, verification, common failures, recovery, and follow-through.
- Link map nodes to the authoritative curriculum artifacts where practical.
- Validate generated OPML before import.
- Import and visually inspect the maps in MindNode.
- Have the instructor revise a representative map in MindNode, compare the
  revised export with its generated baseline, and turn those changes into
  reusable content and presentation conventions.
- Regenerate the remaining maps using the instructor-calibrated conventions
  and perform a final instructor spot check.
- Apply or document the selected MindNode theme and final visual adjustments.
- Keep maps synchronized with curriculum changes and detect stale output.

## 8. Release validation and marketability decision

- Run repository structure, link, command, and clean-clone checks.
- Smoke-test the supported Claude Code, Cursor, and Codex distributions.
- Verify every phase's documents, labs, decks, and instructor resources.
- Conduct an instructor dry run and capture timing or content failures.
- Resolve all release-blocking findings.
- Produce a final readiness report with remaining risks and maintenance needs.
- Make the marketability decision only from the validated finished program.

## Completion record

The implementation outcome is documented in the
[Curriculum Readiness Assessment](CURRICULUM-READINESS-ASSESSMENT.md) and the
[Teaching Artifact Readiness matrix](instructor/ARTIFACT-READINESS.md).

Completed:

- one continuing learner branch and one `starter-kit-v1` release model;
- learner `apps/` separated from `completed/apps/` reference implementations;
- fully developed ten-document packages for all eight modules;
- a five-day developer-only delivery guide, syllabus, lesson plans, decks, and
  recovery model;
- function-organized canonical skills and agents with generated Claude Code,
  Cursor, and Codex interpretations;
- an agent-queryable AI-program operating memory with ownership, evidence,
  freshness, conflict, and modernization rules;
- master and per-phase MindNode-compatible OPML maps;
- automated checks for structure, links, canonical projections, AI-program
  coverage, mind-map drift, documentation, root code, and reference builds.

Required for each client delivery:

- fill client decisions, owners, accounts, access, and policy constraints;
- refresh dated terrain and open dependency advisories;
- rehearse service-backed and provider-backed exercises in the client-approved
  environment;
- conduct the instructor timing rehearsal; and
- calibrate the maps in MindNode to the instructor's preferred teaching style.
