import React, { useState } from 'react';
import { IInputContainer } from '../../../lib/types/interfaces';

export function UncontrolledText({
  refs,
  validationErrors,
  fieldName,
  type,
  isSubmitted,
}: IInputContainer) {
  const [inputValue, setInputValue] = useState('');

  let passwordStrength: string | undefined;
  if (validationErrors) {
    passwordStrength = 'Password is weak';
  } else if (!validationErrors && inputValue !== '') {
    passwordStrength = 'Password is strength';
  }
  return (
    <label>
      <div className="field-name">{fieldName}:</div>
      <div>
        <div className={validationErrors ? 'warning' : 'empty-warning'}>
          {validationErrors}
        </div>
        {fieldName === 'Password' && (
          <div className={isSubmitted ? 'warning black' : 'empty-warning'}>
            {passwordStrength}
          </div>
        )}
        <input
          ref={refs}
          type={type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </label>
  );
}
