import { useState, useCallback } from "react";

interface ValidationResult {
  isValid: boolean;
  message: string;
}

interface ValidationRules {
  [key: string]: (value: string) => ValidationResult;
}

interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = (validationRules: ValidationRules) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = useCallback(
    (field: string, value: string) => {
      if (validationRules[field]) {
        const result = validationRules[field](value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: result.isValid ? "" : result.message,
        }));
      }
    },
    [validationRules]
  );

  const validateForm = useCallback(
    (formValues: { [key: string]: string }) => {
      let valid = true;
      const newErrors: FormErrors = {};

      for (const field in formValues) {
        if (validationRules[field]) {
          const result = validationRules[field](formValues[field]);
          if (!result.isValid) {
            valid = false;
            newErrors[field] = result.message;
          }
        }
      }

      setErrors(newErrors);
      return valid;
    },
    [validationRules]
  );

  return {
    errors,
    validateField,
    validateForm,
  };
};
