'use strict';
// Returns a display name for a user. Users created before profiles existed may
// have no `profile` (and the API may pass an undefined user), so we navigate
// defensively and fall back to a stable placeholder instead of throwing
// "TypeError: Cannot read properties of undefined (reading 'name')".
function displayName(user) {
  const name = user && user.profile && user.profile.name;
  if (!name) {
    return 'Anonymous';
  }
  return String(name).toUpperCase();
}
module.exports = { displayName };
