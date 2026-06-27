'use strict';
// Returns a display name for a user.
// Legacy users (created before profiles existed) may not have a `profile`,
// so we read the nested name defensively to avoid
// "TypeError: Cannot read properties of undefined (reading 'name')".
function displayName(user) {
  const name = user && user.profile && user.profile.name;
  const fallback = (user && user.id) || 'unknown';
  return String(name || fallback).toUpperCase();
}
module.exports = { displayName };
