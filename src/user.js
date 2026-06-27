'use strict';
// Returns a display name for a user.
// Profiles are optional (users created before profiles existed have none),
// so access nested fields defensively to avoid
// "TypeError: Cannot read properties of undefined (reading 'name')".
function displayName(user) {
  const name = user && user.profile && user.profile.name;
  return (name || 'Unknown').toUpperCase();
}
module.exports = { displayName };
