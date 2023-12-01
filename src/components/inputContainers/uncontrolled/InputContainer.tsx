import React from 'react';
import { IInputContainer } from '../../../lib/types/interfaces';

export function InputContainer({
  refs,
  validationErrors,
  fieldName,
  type = 'text',
}: IInputContainer) {
  return (
    <label>
      <div>{fieldName}:</div>
      <div>
        <input ref={refs} type={type} />
        {validationErrors && <div className="warning">{validationErrors}</div>}
      </div>
    </label>
  );
}
