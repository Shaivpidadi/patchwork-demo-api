'use strict';
// Returns a display name for a user. BUG: assumes user.profile always exists,
// so it throws "TypeError: Cannot read properties of undefined (reading 'name')"
// for users created before profiles existed -> shows up in Sentry.
function displayName(user) {
  return user.profile.name.toUpperCase();
}
module.exports = { displayName };
