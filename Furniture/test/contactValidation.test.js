import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizePhoneInput,
  validateContactField,
  validateContactValues,
} from '../src/utils/contactValidation.js';

const validRequest = {
  name: 'Asha Rao',
  email: 'asha.rao@gmail.com',
  phone: '9876543210',
  collection: 'sofas',
  note: 'I would like help choosing a sofa.',
};

test('accepts a complete contact-page request', () => {
  assert.deepEqual(validateContactValues(validRequest, { requireNote: true }), {});
});

test('returns an error for every empty contact-page field', () => {
  assert.deepEqual(validateContactValues({}, { requireNote: true }), {
    name: 'Name is required.',
    email: 'Email is required.',
    phone: 'Phone number is required.',
    collection: 'Please select a collection.',
    note: 'Please tell us how we can help.',
  });
});

test('strips non-numeric phone input, supports pasted +91 numbers, and limits length', () => {
  assert.equal(sanitizePhoneInput('98ab76-543210999'), '9876543210');
  assert.equal(sanitizePhoneInput('+91 98765 43210'), '9876543210');
});

test('rejects impossible Indian mobile numbers', () => {
  assert.equal(validateContactField('phone', '1234567890'), 'Enter a valid Indian mobile number.');
  assert.equal(validateContactField('phone', '98765'), 'Enter a 10-digit mobile number.');
  assert.equal(validateContactField('phone', '98765abcde'), 'Use numbers only.');
});

test('uses Gmail-aware and general email validation rules', () => {
  assert.equal(validateContactField('email', 'asha@gmail.com'), 'Enter a valid email address.');
  assert.equal(validateContactField('email', 'asha.rao@gmail.com'), '');
  assert.equal(validateContactField('email', 'designer@divinebliss.example'), '');
});

test('rejects names with digits and unexpected collection values', () => {
  assert.match(validateContactField('name', 'Asha123'), /letters/);
  assert.equal(validateContactField('collection', 'beds'), 'Please select a valid collection.');
});
