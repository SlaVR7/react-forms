import React, { ChangeEvent, useState } from 'react';
import { IControlledInputContainer } from '../../../lib/types/interfaces';
import { ValidFieldNames } from '../../../lib/types/types';

export function ControlledText({
  fieldName,
  register,
  errors,
  type,
  setValue,
}: IControlledInputContainer) {
  const [inputValue, setInputValue] = useState('');
  let registerParams = fieldName.toLowerCase() as ValidFieldNames;
  if (fieldName === 'Confirm password') {
    registerParams = 'confirmPassword';
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setValue(registerParams, value, { shouldValidate: true });
  };

  let passwordStrength: string | undefined;
  if (errors) {
    passwordStrength = 'Password is weak';
  } else if (!errors && inputValue !== '') {
    passwordStrength = 'Password is strength';
  }

  return (
    <label>
      <div className="field-name">{fieldName}:</div>
      <div>
        <div className="warning">{errors}</div>
        {fieldName === 'Password' && (
          <div className="password-strength">{passwordStrength}</div>
        )}
        <input
          type={type}
          {...register(registerParams)}
          value={inputValue}
          onChange={handleChange}
        />
      </div>
    </label>
  );
}
