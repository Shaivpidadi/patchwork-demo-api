'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { displayName } = require('../src/user');

test('returns uppercased name for a normal user', () => {
  assert.equal(displayName({ profile: { name: 'ada' } }), 'ADA');
});

test('REGRESSION: no throw when the profile is missing', () => {
  assert.equal(displayName({}), 'UNKNOWN');
  assert.equal(displayName(undefined), 'UNKNOWN');
});
