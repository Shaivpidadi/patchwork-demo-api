'use strict';
// Returns a display name for a user.
// Hardened against missing data: older users may have no `profile` (and some
// callers pass null/undefined), which previously threw
// "TypeError: Cannot read properties of undefined (reading 'name')".
function displayName(user) {
  const name = user && user.profile && user.profile.name;
  if (typeof name !== 'string' || name.length === 0) {
    return 'UNKNOWN';
  }
  return name.toUpperCase();
}
module.exports = { displayName };
