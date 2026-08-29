import { resolveMx as resolveMxCallback } from 'node:dns';
import { promisify } from 'node:util';

const resolveMx = promisify(resolveMxCallback);
const EMAIL_API_URL = 'https://emailvalidation.abstractapi.com/v1/';
const PHONE_API_URL = 'https://phoneintelligence.abstractapi.com/v1/';
const REQUEST_TIMEOUT_MS = 7000;
const DNS_TIMEOUT_MS = 4000;

async function withTimeout(promise, timeoutMs) {
  let timeout;
  const timeoutPromise = new Promise((resolve, reject) => {
    timeout = setTimeout(() => {
      const error = new Error('Verification timed out.');
      error.code = 'ETIMEDOUT';
      reject(error);
    }, timeoutMs);
    timeout.unref?.();
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeout);
  }
}

async function requestVerification(url, params, fetchImpl) {
  const requestUrl = new URL(url);
  Object.entries(params).forEach(([key, value]) => requestUrl.searchParams.set(key, value));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  timeout.unref?.();

  try {
    const response = await fetchImpl(requestUrl, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`Verification provider returned ${response.status}.`);
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

export async function verifyEmailAddress(
  email,
  {
    apiKey = process.env.ABSTRACT_EMAIL_API_KEY,
    fetchImpl = globalThis.fetch,
    resolveMxImpl = resolveMx,
    dnsTimeoutMs = DNS_TIMEOUT_MS,
  } = {},
) {
  if (apiKey) {
    try {
      const result = await requestVerification(EMAIL_API_URL, {
        api_key: apiKey,
        email,
        auto_correct: 'false',
      }, fetchImpl);

      if (result.is_disposable_email?.value) {
        return { valid: false, message: 'Disposable email addresses are not accepted.', summary: 'Disposable email rejected' };
      }
      if (result.is_valid_format?.value === false || result.is_mx_found?.value === false) {
        return { valid: false, message: 'Enter an email address that can receive mail.', summary: 'Invalid format or mail domain' };
      }
      if (result.deliverability === 'UNDELIVERABLE') {
        const suggestion = result.autocorrect ? ` Did you mean ${result.autocorrect}?` : '';
        return { valid: false, message: `This email address appears undeliverable.${suggestion}`, summary: 'Undeliverable' };
      }

      return {
        valid: true,
        summary: result.deliverability === 'DELIVERABLE'
          ? 'Abstract API: deliverable'
          : 'Abstract API: deliverability unknown',
      };
    } catch {
      // A third-party outage should not discard a genuine enquiry; local checks already passed.
      return { valid: true, summary: 'Abstract API unavailable; syntax validation passed' };
    }
  }

  const domain = email.slice(email.lastIndexOf('@') + 1);
  try {
    const records = await withTimeout(resolveMxImpl(domain), dnsTimeoutMs);
    if (!Array.isArray(records) || records.length === 0) {
      return { valid: false, message: 'Enter an email address with a valid mail domain.', summary: 'No MX record' };
    }
    return { valid: true, summary: 'Syntax and MX domain verified' };
  } catch (error) {
    if (error?.code === 'ENOTFOUND' || error?.code === 'ENODATA') {
      return { valid: false, message: 'Enter an email address with a valid mail domain.', summary: 'Mail domain not found' };
    }
    return { valid: true, summary: 'MX lookup unavailable; syntax validation passed' };
  }
}

export async function verifyPhoneNumber(
  phone,
  {
    apiKey = process.env.ABSTRACT_PHONE_API_KEY,
    fetchImpl = globalThis.fetch,
  } = {},
) {
  if (!apiKey) return { valid: true, summary: 'libphonenumber-js metadata verified' };

  try {
    const result = await requestVerification(PHONE_API_URL, {
      api_key: apiKey,
      phone: `+91${phone}`,
    }, fetchImpl);
    const validation = result.phone_validation ?? {};

    if (validation.is_valid === false || validation.line_status === 'inactive') {
      return { valid: false, message: 'Enter a valid, active mobile number.', summary: 'Invalid or inactive line' };
    }

    return {
      valid: true,
      summary: validation.line_status
        ? `Abstract API: ${validation.line_status} line`
        : 'Abstract API: valid number',
    };
  } catch {
    return { valid: true, summary: 'Abstract API unavailable; libphonenumber-js validation passed' };
  }
}
