'use strict';
// Returns a display name for a user. Profiles may be missing for users created
// before profiles existed, so guard the access instead of assuming it exists.
function displayName(user) {
  const name = user && user.profile && user.profile.name;
  return name ? name.toUpperCase() : 'UNKNOWN';
}
module.exports = { displayName };
