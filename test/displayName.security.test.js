'use strict';
// Regression test for Sentry finding sentry:prodtest-1
// TypeError: Cannot read properties of undefined (reading 'name')
// in displayName(src/user.js)
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { displayName } = require('../src/user');

test('does not throw when the user object is undefined', () => {
  assert.doesNotThrow(() => displayName(undefined));
});

test('does not throw when the user has no profile', () => {
  assert.doesNotThrow(() => displayName({}));
});

test('does not throw when the profile has no name', () => {
  assert.doesNotThrow(() => displayName({ profile: {} }));
});

test('still uppercases a present name', () => {
  assert.equal(displayName({ profile: { name: 'ada' } }), 'ADA');
});
