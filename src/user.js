'use strict';
// Returns a display name for a user. Guards against users without a profile
// (e.g. accounts created before profiles existed) and null/undefined input,
// which previously caused "TypeError: Cannot read properties of undefined
// (reading 'name')" reported via Sentry.
function displayName(user) {
  const name = user && user.profile && user.profile.name;
  return (name || 'Anonymous').toUpperCase();
}
module.exports = { displayName };
