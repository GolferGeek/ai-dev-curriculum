# Teaching Mind Maps

This directory contains MindNode-compatible teaching maps and their
maintainable source. The maps summarize the finished curriculum; authoritative
detail remains in the phase packages and lesson plans.

## Deliverables

```text
docs/mind-maps/
  README.md
  source/
    program-map.json              # Curated source of truth
  ai-development-program.opml    # Complete master teaching map
  phases/
    phase-*.opml                  # One detailed map per module
```

Generate and verify:

```bash
npm run mindmaps:generate
npm run mindmaps:check
```

The generator validates the hierarchy and creates OPML 2.0 with notes that
MindNode can import.

## Map requirements

The master map provides the complete program story and navigation. Each phase
map is detailed enough to teach from and includes:

- Purpose and participant outcomes.
- Timing and transitions.
- Preparation before the lab.
- Concepts, demonstrations, and discussion prompts.
- Lab sequence and verification checkpoints.
- Common failures, misconceptions, and recovery guidance.
- After-lab discussion and follow-through.
- References to the authoritative documents and deliverables.

OPML is the portable generated format for MindNode. The JSON source and
curriculum repository—not an imported MindNode document—remain the content
source of truth until the instructor calibration workflow intentionally folds
MindNode edits back into the source.

## Instructor calibration workflow

1. Generate a representative map and preserve its OPML baseline.
2. Import the map into MindNode.
3. Have the instructor reorganize, rewrite, fold, annotate, and style it for
   the way they actually teach.
4. Export the revised hierarchy as OPML and export a PDF or SVG visual
   reference when styling and layout matter.
5. Compare the revised map with the baseline.
6. Encode the instructor's recurring choices as reusable map-writing,
   hierarchy, note-density, naming, and presentation conventions.
7. Regenerate the master map and remaining phase maps using those conventions.
8. Have the instructor spot-check the generated set before release.

OPML comparison captures structural and textual changes well. A PDF, SVG, or
MindNode export supplements it when changes involve placement, branch styling,
connections, images, tags, or other MindNode-specific presentation details.
