# patchwork-demo-api

Demo API with a runtime null-deref in `displayName` (TypeError when `user.profile` is missing). Reported via Sentry; Patchwork reproduces and fixes it.
