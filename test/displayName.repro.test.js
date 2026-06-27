'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { displayName } = require('../src/user');

// Reproduces Sentry issue live-1782588797795:
// "TypeError: Cannot read properties of undefined (reading 'name')"
// thrown by displayName() when a user has no profile.
test('does not throw and falls back when user has no profile', () => {
  assert.doesNotThrow(() => displayName({}));
  assert.equal(displayName({}), 'UNKNOWN');
});

test('does not throw and falls back when user is undefined', () => {
  assert.doesNotThrow(() => displayName(undefined));
  assert.equal(displayName(undefined), 'UNKNOWN');
});

test('does not throw and falls back when profile has no name', () => {
  assert.doesNotThrow(() => displayName({ profile: {} }));
  assert.equal(displayName({ profile: {} }), 'UNKNOWN');
});

test('still returns the uppercased name for a valid user', () => {
  assert.equal(displayName({ profile: { name: 'ada' } }), 'ADA');
});
