'use strict';
// Regression test for Sentry finding sentry:live-1782587911471
// "TypeError: Cannot read properties of undefined (reading 'name')" in displayName(src/user.js)
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { displayName } = require('../src/user');

test('does not crash for a user with no profile (legacy user)', () => {
  // Reproduces the production crash: user exists but profile is undefined.
  assert.doesNotThrow(() => displayName({}));
});

test('does not crash for undefined input', () => {
  assert.doesNotThrow(() => displayName(undefined));
});

test('still uppercases a normal user name', () => {
  assert.equal(displayName({ profile: { name: 'ada' } }), 'ADA');
});
