import { useState, useCallback } from 'react';

interface ValidationRules {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
}

interface FieldConfig {
  [key: string]: ValidationRules;
}

interface FormData {
  [key: string]: string;
}

interface FieldErrors {
  [key: string]: string;
}

export const useFormValidation = (initialData: FormData, config: FieldConfig) => {
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = useCallback((name: string, value: string): string => {
    const rules = config[name];
    if (!rules) return '';

    if (rules.required && !value.trim()) {
      return 'Este campo é obrigatório';
    }

    if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Email inválido';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Mínimo de ${rules.minLength} caracteres`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Máximo de ${rules.maxLength} caracteres`;
    }

    return '';
  }, [config]);

  const handleChange = useCallback((name: string, value: string) => {
    setData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, data[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [data, validateField]);

  const validateAll = useCallback((): boolean => {
    const newErrors: FieldErrors = {};
    let isValid = true;

    Object.keys(config).forEach(name => {
      const error = validateField(name, data[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(config).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  }, [config, data, validateField]);

  const reset = useCallback(() => {
    setData(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  return {
    data,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0 && Object.keys(touched).length > 0,
  };
};