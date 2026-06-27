'use strict';
// Regression test for Sentry finding sentry:live-1782587948724
// TypeError: Cannot read properties of undefined (reading 'name')
// culprit: displayName(src/user.js)
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { displayName } = require('../src/user');

test('does not throw for a user without a profile (the Sentry crash)', () => {
  // user exists but user.profile is undefined -> "reading 'name'" of undefined
  assert.doesNotThrow(() => displayName({}));
});

test('does not throw for undefined / null user', () => {
  assert.doesNotThrow(() => displayName(undefined));
  assert.doesNotThrow(() => displayName(null));
});

test('still uppercases the name for a normal user', () => {
  assert.equal(displayName({ profile: { name: 'ada' } }), 'ADA');
});
