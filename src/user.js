'use strict';
// Returns a display name for a user.
// Some users (created before profiles existed) have no `profile`, so we must
// not assume `user.profile.name` exists. Guard the whole access path and fall
// back to a stable label instead of throwing
// "TypeError: Cannot read properties of undefined (reading 'name')".
function displayName(user) {
  const name = user?.profile?.name;
  if (typeof name !== 'string' || name.length === 0) {
    return 'Unknown';
  }
  return name.toUpperCase();
}
module.exports = { displayName };
