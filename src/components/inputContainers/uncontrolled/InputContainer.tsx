import React, { useState } from 'react';
import { IInputContainer } from '../../../lib/types/interfaces';

export function InputContainer({
  refs,
  validationErrors,
  fieldName,
  type = 'text',
  isSubmitted,
}: IInputContainer) {
  const [inputValue, setInputValue] = useState('');
  return (
    <label>
      <div>{fieldName}:</div>
      <div>
        {validationErrors && <div className="warning">{validationErrors}</div>}
        {validationErrors && fieldName === 'Password' && isSubmitted && (
          <div>Password is weak</div>
        )}
        {!validationErrors && fieldName === 'Password' && isSubmitted && (
          <div>Password is strength</div>
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
