'use strict';
// Regression test for sentry:live-1782586400823
// TypeError: Cannot read properties of undefined (reading 'name')
// in displayName(src/user.js) when a user has no profile.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { displayName } = require('../src/user');

test('does not throw when the user has no profile', () => {
  assert.doesNotThrow(() => displayName({}));
});

test('does not throw when the user is undefined', () => {
  assert.doesNotThrow(() => displayName(undefined));
});

test('does not throw when the user is null', () => {
  assert.doesNotThrow(() => displayName(null));
});
