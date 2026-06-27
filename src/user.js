'use strict';
// Returns a display name for a user.
// Guards against users without a profile or name (e.g. accounts created before
// profiles existed). Previously this threw
// "TypeError: Cannot read properties of undefined (reading 'name')".
function displayName(user) {
  const name = user?.profile?.name;
  if (typeof name !== 'string' || name.length === 0) {
    return 'UNKNOWN';
  }
  return name.toUpperCase();
}
module.exports = { displayName };
