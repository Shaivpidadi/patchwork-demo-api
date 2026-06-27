'use strict';
// Reproduction for Sentry finding sentry:live-1782586974968 (signature e0dfcdc420e1f3ef)
// "TypeError: Cannot read properties of undefined (reading 'name')" in displayName(src/user.js).
// A "legacy" user predates profiles -> { id } with no .profile -> null-deref crash.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { displayName } = require('../src/user');

test('displayName does not throw for a legacy user with no profile', () => {
  // Before the fix this throws: TypeError: Cannot read properties of undefined (reading 'name')
  assert.doesNotThrow(() => displayName({ id: 'legacy' }));
});

test('displayName returns a string for a legacy user with no profile', () => {
  const result = displayName({ id: 'legacy' });
  assert.equal(typeof result, 'string');
});
