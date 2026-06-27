'use strict';
// Reproduces sentry:prodtest-2 — TypeError in displayName(src/user.js).
// displayName assumes user.profile always exists, so users without a profile
// crash with "TypeError: Cannot read properties of undefined (reading 'name')".
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { displayName } = require('../src/user');

test('does not throw when user has no profile (sentry:prodtest-2)', () => {
  assert.doesNotThrow(() => displayName({ id: 1 }));
});

test('returns a safe fallback when user has no profile name', () => {
  // After the fix, a missing profile/name should yield a benign string,
  // never a thrown TypeError.
  const result = displayName({ id: 1 });
  assert.equal(typeof result, 'string');
});
