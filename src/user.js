'use strict';
// Returns a display name for a user.
// Users created before profiles existed have no `profile`, so we must not assume
// `user.profile.name` exists. Previously this threw
// "TypeError: Cannot read properties of undefined (reading 'name')" (seen in Sentry).
// We now resolve the name defensively and fall back to a stable placeholder.
function displayName(user) {
  const name = user?.profile?.name;
  if (typeof name !== 'string' || name.length === 0) {
    return 'UNKNOWN';
  }
  return name.toUpperCase();
}
module.exports = { displayName };
