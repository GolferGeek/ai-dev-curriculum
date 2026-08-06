"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return <div className="page"><div className="error-page"><span className="eyebrow">Program reader error</span><h1>The organizational record could not be loaded.</h1><p>{error.message}</p><button className="primary-button" onClick={reset}>Try again</button></div></div>;
}
