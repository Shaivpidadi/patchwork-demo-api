'use strict';
// Repro + regression test for sentry:live-1782589060440
// TypeError: Cannot read properties of undefined (reading 'name') in displayName(src/user.js)
// A user created before profiles existed has no `profile`, so `user.profile.name`
// previously dereferenced `undefined`. These tests fail against the buggy code and
// pass after the defensive guard is added.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { displayName } = require('../src/user');

test('does not throw for a user without a profile', () => {
  assert.doesNotThrow(() => displayName({ id: 1 }));
  assert.equal(displayName({ id: 1 }), 'Unknown');
});

test('does not throw for undefined/null user', () => {
  assert.doesNotThrow(() => displayName(undefined));
  assert.doesNotThrow(() => displayName(null));
  assert.equal(displayName(undefined), 'Unknown');
});

test('still returns the uppercased name for a well-formed user', () => {
  assert.equal(displayName({ profile: { name: 'ada' } }), 'ADA');
});
