import React from 'react';
import { IRefsValidation } from '../../../lib/types/interfaces';

export function AcceptContainer({ refs, validationErrors }: IRefsValidation) {
  return (
    <div className="accept-container">
      <div>
        <input ref={refs?.accept} type="checkbox" name="accept" id="accept" />
        <label className="inline-label" htmlFor="accept">
          accept T&C
        </label>
      </div>
      {validationErrors && <div className="warning">{validationErrors}</div>}
    </div>
  );
}
