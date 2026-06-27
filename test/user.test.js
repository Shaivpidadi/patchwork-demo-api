'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { displayName } = require('../src/user');
test('returns uppercased name for a normal user', () => {
  assert.equal(displayName({ profile: { name: 'ada' } }), 'ADA');
});
