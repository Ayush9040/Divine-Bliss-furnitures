import parsePhoneNumber from 'libphonenumber-js/max';
import isEmail from 'validator/lib/isEmail.js';

export const COLLECTION_OPTIONS = [
  { value: 'sofas', label: 'Sofas' },
  { value: 'dining', label: 'Dining' },
  { value: 'curtains', label: 'Curtains' },
  { value: 'recliners', label: 'Recliners' },
  { value: 'mattress', label: 'Mattress' },
];

export const INITIAL_CONTACT_VALUES = Object.freeze({
  name: '',
  email: '',
  phone: '',
  collection: '',
  note: '',
});

const COLLECTION_VALUES = new Set(COLLECTION_OPTIONS.map(({ value }) => value));
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u;
const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/;

export function sanitizePhoneInput(value) {
  let digits = String(value ?? '').replace(/\D/g, '');

  // Make pasting a +91 number convenient while keeping the visible value local and numeric.
  if (digits.length > 10 && digits.startsWith('91')) digits = digits.slice(2);

  return digits.slice(0, 10);
}

export function normalizeContactValues(values = {}) {
  return {
    name: String(values.name ?? '').normalize('NFKC').trim().replace(/\s+/g, ' '),
    email: String(values.email ?? '').normalize('NFKC').trim().toLowerCase(),
    phone: String(values.phone ?? '').trim(),
    collection: String(values.collection ?? '').trim().toLowerCase(),
    note: String(values.note ?? '').normalize('NFKC').trim(),
  };
}

export function validateContactField(field, rawValue, { requireNote = false } = {}) {
  const value = typeof rawValue === 'string' ? rawValue.trim() : '';

  switch (field) {
    case 'name':
      if (!value) return 'Name is required.';
      if (value.length < 2) return 'Enter at least 2 characters.';
      if (value.length > 80) return 'Name must be 80 characters or fewer.';
      if (!NAME_PATTERN.test(value)) return 'Use letters, spaces, apostrophes, periods, or hyphens only.';
      return '';
    case 'email':
      if (!value) return 'Email is required.';
      if (value.length > 254 || !isEmail(value, { domain_specific_validation: true })) {
        return 'Enter a valid email address.';
      }
      return '';
    case 'phone': {
      if (!value) return 'Phone number is required.';
      if (!/^\d+$/.test(value)) return 'Use numbers only.';
      if (value.length !== 10) return 'Enter a 10-digit mobile number.';
      if (!INDIAN_MOBILE_PATTERN.test(value)) return 'Enter a valid Indian mobile number.';

      const parsedNumber = parsePhoneNumber(value, 'IN');
      if (!parsedNumber?.isValid() || parsedNumber.country !== 'IN') {
        return 'Enter a valid Indian mobile number.';
      }
      return '';
    }
    case 'collection':
      if (!value) return 'Please select a collection.';
      if (!COLLECTION_VALUES.has(value)) return 'Please select a valid collection.';
      return '';
    case 'note':
      if (!value && requireNote) return 'Please tell us how we can help.';
      if (value && value.length < 5) return 'Please enter at least 5 characters.';
      if (value.length > 1000) return 'Note must be 1,000 characters or fewer.';
      return '';
    default:
      return '';
  }
}

export function validateContactValues(values, { requireNote = false } = {}) {
  const normalized = normalizeContactValues(values);
  const fields = requireNote
    ? ['name', 'email', 'phone', 'collection', 'note']
    : ['name', 'email', 'phone', 'collection'];

  return fields.reduce((errors, field) => {
    const error = validateContactField(field, normalized[field], { requireNote });
    if (error) errors[field] = error;
    return errors;
  }, {});
}

export function getCollectionLabel(value) {
  return COLLECTION_OPTIONS.find((option) => option.value === value)?.label ?? '';
}
