import { IRefsValidation } from '../../../lib/types/interfaces';

export function GenderContainer({ refs, validationErrors }: IRefsValidation) {
  return (
    <div className="gender-container">
      <div>Gender: </div>
      <div>
        <div>
          <input
            ref={refs?.male}
            type="radio"
            id="male"
            name="gender"
            value="male"
          />
          <label className="inline-label" htmlFor="male">
            Male
          </label>
        </div>
        <div>
          <input
            ref={refs?.female}
            type="radio"
            id="female"
            name="gender"
            value="female"
          />
          <label className="inline-label" htmlFor="female">
            Female
          </label>
        </div>
      </div>
      {validationErrors && <div className="warning">{validationErrors}</div>}
    </div>
  );
}
