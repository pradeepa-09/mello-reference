interface AsyncPageStateProps {
  kind: "loading" | "empty" | "error";
  message?: string;
  onRetry?: () => void;
}

export function AsyncPageState({ kind, message, onRetry }: AsyncPageStateProps) {
  const title = kind === "loading" ? "Preparing Mello…" : kind === "empty" ? "Nothing to show yet." : "Mello could not load this page.";
  return (
    <main className="async-page-state" aria-live="polite" aria-busy={kind === "loading"}>
      <div>
        <span aria-hidden="true" />
        <h1>{title}</h1>
        {message && <p>{message}</p>}
        {kind === "error" && onRetry && <button type="button" className="button" onClick={onRetry}>Try again</button>}
      </div>
    </main>
  );
}
