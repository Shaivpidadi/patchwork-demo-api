'use strict';
// Returns a display name for a user.
// Legacy users created before profiles existed are plain objects with no
// `profile`, so guard the whole access chain to avoid
// "TypeError: Cannot read properties of undefined (reading 'name')".
function displayName(user) {
  const name = user?.profile?.name;
  return typeof name === 'string' ? name.toUpperCase() : 'UNKNOWN';
}
module.exports = { displayName };
