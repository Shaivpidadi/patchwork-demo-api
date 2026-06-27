// Demo endpoint that exercises the seeded bug live.
//   /api/profile?id=ada     -> healthy (user has a profile)
//   /api/profile?id=legacy  -> CRASHES (legacy user has no profile) -> the runtime error we demo
//
// On crash: report to REAL Sentry (authentic — shows in your Sentry project) AND fast-notify
// Patchwork's /sentry rail directly so there's no dead air waiting on Sentry's own webhook.
const Sentry = require("@sentry/node");
const { displayName } = require("../src/user");

if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 0 });
}

module.exports = async (req, res) => {
  const id = (req.query && req.query.id) || "ada";
  // A "legacy" user predates profiles -> { } with no .profile -> triggers the null-deref.
  const user = id === "legacy" ? { id } : { id, profile: { name: id } };
  try {
    res.status(200).json({ id, name: displayName(user) });
  } catch (err) {
    // 1) real Sentry (authentic record)
    if (process.env.SENTRY_DSN) {
      Sentry.captureException(err);
      await Sentry.flush(2000).catch(() => {});
    }
    // 2) fast-notify Patchwork's Sentry rail (instant, no dead air)
    const base = process.env.PATCHWORK_URL;
    if (base) {
      fetch(base.replace(/\/$/, "") + "/sentry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "created",
          data: {
            issue: {
              id: "live-" + Date.now(),
              title: err.name + ": " + err.message,
              culprit: "displayName(src/user.js)",
              level: "error",
              metadata: { type: err.name, value: err.message },
            },
          },
        }),
      }).catch(() => {});
    }
    res.status(500).json({ error: err.name + ": " + err.message, note: "Reported to Sentry + Patchwork. Watch the fleet dashboard." });
  }
};
