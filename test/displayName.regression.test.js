'use strict';
// Regression test for Sentry finding sentry:live-1782586975190
// TypeError: Cannot read properties of undefined (reading 'name')
// in displayName(src/user.js)
//
// Root cause: displayName() assumes `user.profile` always exists and reads
// `user.profile.name`. For users without a profile (or null/undefined input)
// this throws the production TypeError. These tests pin the graceful behavior.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { displayName } = require('../src/user');

test('does not throw when profile is missing', () => {
  assert.doesNotThrow(() => displayName({}));
});

test('returns a string for a user with no profile', () => {
  assert.equal(typeof displayName({}), 'string');
});

test('does not throw for undefined or null input', () => {
  assert.doesNotThrow(() => displayName(undefined));
  assert.doesNotThrow(() => displayName(null));
});

test('does not throw when profile exists but name is missing', () => {
  assert.doesNotThrow(() => displayName({ profile: {} }));
});
