"use client";

import Link from "next/link";
import { useState } from "react";
import type { AdvisorAnswer } from "@/src/lib/types";

const QUESTIONS = [
  "How is our governance?",
  "What are we lacking?",
  "What's changing?",
  "What's missing?",
  "What's old?",
  "What's wrong?",
  "How is our AI culture?",
  "Which program profile is active?",
];

export function AdvisorPanel() {
  const [question, setQuestion] = useState(QUESTIONS[0]);
  const [answer, setAnswer] = useState<AdvisorAnswer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function ask(nextQuestion = question) {
    setQuestion(nextQuestion);
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: nextQuestion }),
      });
      if (!response.ok) throw new Error("The program advisor could not complete the query.");
      setAnswer(await response.json());
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The query failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="advisor-layout">
      <section className="advisor-console">
        <div className="advisor-intro">
          <div className="agent-orb">AI</div>
          <div>
            <span className="eyebrow">Bounded program advisor</span>
            <h2>Ask the organizational record.</h2>
            <p>Answers are assembled from repository evidence, not private chat memory.</p>
          </div>
        </div>

        <div className="suggested-questions">
          {QUESTIONS.map((item) => (
            <button key={item} onClick={() => void ask(item)} type="button">{item}</button>
          ))}
        </div>

        <form
          className="ask-form"
          onSubmit={(event) => {
            event.preventDefault();
            void ask();
          }}
        >
          <label htmlFor="program-question">Question</label>
          <div>
            <input
              id="program-question"
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about a policy, risk, control, or gap…"
              value={question}
            />
            <button disabled={loading || question.trim().length < 3} type="submit">
              {loading ? "Reading…" : "Ask"}
            </button>
          </div>
        </form>
        {error ? <div className="error-banner">{error}</div> : null}
      </section>

      <section className="answer-panel" aria-live="polite">
        {!answer ? (
          <div className="answer-placeholder">
            <span>01</span>
            <h3>Start with a program health question.</h3>
            <p>The answer will show its scope, authority, freshness, uncertainty, and next action.</p>
          </div>
        ) : (
          <>
            <div className="answer-kicker"><span /> Evidence-grounded answer</div>
            <h2>{answer.headline}</h2>
            <p className="answer-lead">{answer.answer}</p>
            <dl className="answer-contract">
              <div><dt>Scope</dt><dd>{answer.scope}</dd></div>
              <div><dt>Owner</dt><dd>{answer.owner}</dd></div>
              <div><dt>Freshness</dt><dd>{answer.freshness}</dd></div>
              <div><dt>Uncertainty</dt><dd>{answer.uncertainty}</dd></div>
              <div className="next-action"><dt>Next action</dt><dd>{answer.nextAction}</dd></div>
            </dl>
            <div className="citation-block">
              <h3>Governing sources</h3>
              {answer.citations.length > 0 ? answer.citations.map((item, index) => (
                <Link href={item.route} key={item.sourcePath}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span><strong>{item.label}</strong><small>{item.sourcePath}</small></span>
                </Link>
              )) : <p>No governing source was found.</p>}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
