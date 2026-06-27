'use strict';
// Returns a display name for a user. Guards against missing user/profile/name
// (e.g. legacy users created before profiles existed) so it never throws
// "TypeError: Cannot read properties of undefined (reading 'name')".
function displayName(user) {
  const name = user && user.profile && user.profile.name;
  if (!name) {
    return 'UNKNOWN';
  }
  return name.toUpperCase();
}
module.exports = { displayName };
