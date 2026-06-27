'use strict';
// Returns a display name for a user. Guards against users without a profile
// (e.g. accounts created before profiles existed), which previously threw
// "TypeError: Cannot read properties of undefined (reading 'name')" -> Sentry.
function displayName(user) {
  const name = user && user.profile && user.profile.name;
  return (name ? String(name) : 'Unknown').toUpperCase();
}
module.exports = { displayName };
