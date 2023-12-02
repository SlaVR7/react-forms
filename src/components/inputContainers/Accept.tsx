import React from 'react';
import { IRefsValidation } from '../../lib/types/interfaces';

export function Accept({
  refs,
  validationErrors,
  register,
  setValue,
  watch,
}: IRefsValidation) {
  return (
    <div className="accept-container">
      <div className={validationErrors ? 'warning' : 'empty-warning'}>
        {validationErrors}
      </div>
      <label className="accept-label" htmlFor="accept">
        <div className="field-name">Accept T&C:</div>
        <input
          {...(register && register('accept'))}
          ref={refs?.accept}
          className="accept-input"
          type="checkbox"
          name="accept"
          id="accept"
          onClick={() => {
            if (setValue && watch)
              setValue('accept', !watch('accept'), { shouldValidate: true });
          }}
        />
      </label>
    </div>
  );
}
