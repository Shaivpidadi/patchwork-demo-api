'use strict';
// Returns a display name for a user. Profiles are optional (users created before
// profiles existed have none), so guard every hop instead of assuming the shape.
// Fixes: "TypeError: Cannot read properties of undefined (reading 'name')" (Sentry).
function displayName(user) {
  const name = user && user.profile && user.profile.name;
  return name ? name.toUpperCase() : 'UNKNOWN';
}
module.exports = { displayName };
