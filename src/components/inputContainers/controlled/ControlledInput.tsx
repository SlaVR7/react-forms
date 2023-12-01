import React, { ChangeEvent, useState } from 'react';
import { IControlledInputContainer } from '../../../lib/types/interfaces';
import { ValidFieldNames } from '../../../lib/types/types';

export function ControlledInput({
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

  return (
    <label>
      <div>{fieldName}:</div>
      <div>
        {errors && <div className="warning">{errors}</div>}
        {fieldName === 'Password' && errors && <div>Password is weak</div>}
        {fieldName === 'Password' && !errors && inputValue !== '' && (
          <div> Password is strength</div>
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
