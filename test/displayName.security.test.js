'use strict';
// Regression test for Sentry finding sentry:live-1782586953423
// "TypeError: Cannot read properties of undefined (reading 'name')" in displayName(src/user.js)
// Reproduces the crash for users that have no `profile` (created before profiles existed),
// and for a fully undefined user object.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { displayName } = require('../src/user');

test('does not throw for a user without a profile', () => {
  assert.doesNotThrow(() => displayName({ id: 1 }));
  assert.equal(typeof displayName({ id: 1 }), 'string');
});

test('does not throw for an undefined user', () => {
  assert.doesNotThrow(() => displayName(undefined));
  assert.equal(typeof displayName(undefined), 'string');
});

test('still uppercases a present name', () => {
  assert.equal(displayName({ profile: { name: 'ada' } }), 'ADA');
});
