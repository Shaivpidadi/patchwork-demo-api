'use strict';
// Regression test for Sentry finding sentry:live-1782589361675
// "TypeError: Cannot read properties of undefined (reading 'name')" in displayName(src/user.js).
// A user created before profiles existed has no `profile`, so `user.profile.name` threw.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { displayName } = require('../src/user');

test('does not throw and falls back when user.profile is undefined', () => {
  assert.doesNotThrow(() => displayName({ id: 1 }));
  assert.equal(displayName({ id: 1 }), 'UNKNOWN');
});

test('does not throw and falls back when user itself is undefined', () => {
  assert.doesNotThrow(() => displayName(undefined));
  assert.equal(displayName(undefined), 'UNKNOWN');
});

test('does not throw and falls back when profile.name is missing', () => {
  assert.equal(displayName({ profile: {} }), 'UNKNOWN');
});

test('still uppercases a normal user name', () => {
  assert.equal(displayName({ profile: { name: 'ada' } }), 'ADA');
});
