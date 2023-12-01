import React from 'react';
import { IControlledInputContainer } from '../../../lib/types/interfaces';
import { ValidFieldNames } from '../../../lib/types/types';

export function ControlledInput({
  fieldName,
  register,
  errors,
  type,
}: IControlledInputContainer) {
  let registerParams = fieldName.toLowerCase() as ValidFieldNames;
  if (fieldName === 'Confirm password') {
    registerParams = 'confirmPassword';
  }

  return (
    <label>
      <div>{fieldName}:</div>
      <div>
        {errors && <div className="warning">{errors}</div>}
        <input type={type} {...register(registerParams)} />
      </div>
    </label>
  );
}
