export type ActionResult =
  | { ok: true; id: string; emailStatus: "sent" | "partial" | "skipped" }
  | {
      ok: false;
      code:
        | "validation"
        | "duplicate"
        | "rate_limit"
        | "not_configured"
        | "not_found"
        | "server";
      message: string;
      fieldErrors?: Record<string, string[]>;
    };
