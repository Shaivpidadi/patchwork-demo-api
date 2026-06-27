'use strict';
// Regression test for Sentry finding sentry:live-1782586577600
// TypeError: Cannot read properties of undefined (reading 'name') in displayName(src/user.js)
// Legacy users predate profiles, so `user.profile` is undefined and `user.profile.name` throws.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { displayName } = require('../src/user');

test('does not throw for a legacy user with no profile', () => {
  // This is the exact shape that crashes in production (api/profile.js: { id }).
  assert.doesNotThrow(() => displayName({ id: 'legacy' }));
});

test('does not throw when the user is undefined', () => {
  assert.doesNotThrow(() => displayName(undefined));
});

test('does not throw when called with no arguments', () => {
  assert.doesNotThrow(() => displayName());
});

test('still returns the uppercased name for a normal user', () => {
  assert.equal(displayName({ profile: { name: 'ada' } }), 'ADA');
});
