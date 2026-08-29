import { useState } from 'react';
import {
  INITIAL_CONTACT_VALUES,
  normalizeContactValues,
  sanitizePhoneInput,
  validateContactField,
  validateContactValues,
} from '../utils/contactValidation';

const IDLE_STATUS = Object.freeze({ type: 'idle', message: '' });

export default function useContactForm({ formId, requireNote = false, source }) {
  const [values, setValues] = useState({ ...INITIAL_CONTACT_VALUES });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(IDLE_STATUS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldValue = (field, nextValue) => {
    const value = field === 'phone' ? sanitizePhoneInput(nextValue) : nextValue;
    setValues((current) => ({ ...current, [field]: value }));

    if (touched[field]) {
      setErrors((current) => ({
        ...current,
        [field]: validateContactField(field, value, { requireNote }),
      }));
    }

    if (status.type !== 'idle') setStatus(IDLE_STATUS);
  };

  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.value);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({
      ...current,
      [name]: validateContactField(name, value, { requireNote }),
    }));
  };

  const focusFirstInvalidField = (fieldErrors) => {
    const firstInvalidField = Object.keys(fieldErrors)[0];
    if (!firstInvalidField) return;

    window.requestAnimationFrame(() => {
      const form = document.getElementById(formId);
      const field = form?.querySelector(`[data-field="${firstInvalidField}"]`)
        ?? form?.querySelector(`[name="${firstInvalidField}"]`);
      field?.focus();
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const normalizedValues = normalizeContactValues(values);
    const fieldErrors = validateContactValues(normalizedValues, { requireNote });
    const submittedFields = requireNote
      ? ['name', 'email', 'phone', 'collection', 'note']
      : ['name', 'email', 'phone', 'collection'];

    setValues((current) => ({ ...current, ...normalizedValues }));
    setTouched(Object.fromEntries(submittedFields.map((field) => [field, true])));
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      setStatus({ type: 'error', message: 'Please correct the highlighted fields.' });
      focusFirstInvalidField(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'pending', message: 'Verifying your details…' });

    try {
      const response = await fetch('/api/contact-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...normalizedValues, source }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (result.errors && typeof result.errors === 'object') {
          setErrors(result.errors);
          setTouched((current) => ({ ...current, ...Object.fromEntries(Object.keys(result.errors).map((field) => [field, true])) }));
          focusFirstInvalidField(result.errors);
        }
        throw new Error(result.message || 'We could not send your request. Please try again.');
      }

      setValues({ ...INITIAL_CONTACT_VALUES });
      setErrors({});
      setTouched({});
      setStatus({
        type: 'success',
        message: result.message || 'Thank you. Our team will call you shortly.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error
          ? error.message
          : 'We could not send your request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    status,
    isSubmitting,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
