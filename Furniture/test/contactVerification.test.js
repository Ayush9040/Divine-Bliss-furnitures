import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyEmailAddress, verifyPhoneNumber } from '../server/services/contactVerification.js';

test('MX verification accepts a mail domain with records', async () => {
  const result = await verifyEmailAddress('asha@example.com', {
    apiKey: '',
    resolveMxImpl: async () => [{ exchange: 'mail.example.com', priority: 10 }],
  });
  assert.equal(result.valid, true);
  assert.match(result.summary, /MX/);
});

test('MX verification rejects a missing mail domain', async () => {
  const error = Object.assign(new Error('not found'), { code: 'ENOTFOUND' });
  const result = await verifyEmailAddress('asha@missing.example', {
    apiKey: '',
    resolveMxImpl: async () => { throw error; },
  });
  assert.equal(result.valid, false);
  assert.match(result.message, /valid mail domain/);
});

test('MX lookup timeout falls back without trapping a genuine enquiry', async () => {
  const result = await verifyEmailAddress('asha@example.com', {
    apiKey: '',
    resolveMxImpl: async () => new Promise(() => undefined),
    dnsTimeoutMs: 5,
  });
  assert.equal(result.valid, true);
  assert.match(result.summary, /unavailable/);
});

test('email provider rejects disposable and undeliverable addresses', async () => {
  const disposable = await verifyEmailAddress('name@example.com', {
    apiKey: 'test-key',
    fetchImpl: async () => ({
      ok: true,
      json: async () => ({ is_disposable_email: { value: true } }),
    }),
  });
  assert.equal(disposable.valid, false);

  const undeliverable = await verifyEmailAddress('name@example.com', {
    apiKey: 'test-key',
    fetchImpl: async () => ({
      ok: true,
      json: async () => ({ deliverability: 'UNDELIVERABLE', autocorrect: 'name@gmail.com' }),
    }),
  });
  assert.equal(undeliverable.valid, false);
  assert.match(undeliverable.message, /Did you mean/);
});

test('phone provider rejects an inactive line', async () => {
  const result = await verifyPhoneNumber('9876543210', {
    apiKey: 'test-key',
    fetchImpl: async () => ({
      ok: true,
      json: async () => ({ phone_validation: { is_valid: true, line_status: 'inactive' } }),
    }),
  });
  assert.equal(result.valid, false);
  assert.match(result.message, /active mobile/);
});

test('third-party outages fall back to successful local validation', async () => {
  const result = await verifyPhoneNumber('9876543210', {
    apiKey: 'test-key',
    fetchImpl: async () => { throw new Error('offline'); },
  });
  assert.equal(result.valid, true);
  assert.match(result.summary, /unavailable/);
});
