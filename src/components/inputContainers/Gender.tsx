import { IRefsValidation } from '../../lib/types/interfaces';

export function Gender({
  refs,
  validationErrors,
  register,
  setValue,
}: IRefsValidation) {
  return (
    <div className="gender-container">
      <div className="field-name">Gender: </div>
      <div className="gender-right">
        <div className={validationErrors ? 'warning' : 'empty-warning'}>
          {validationErrors}
        </div>
        <label htmlFor="male" className="gender-label">
          <input
            {...(register && register('gender'))}
            ref={refs?.male}
            className="gender-input"
            type="radio"
            id="male"
            name="gender"
            value="male"
            onClick={() => {
              if (setValue)
                setValue('gender', 'male', { shouldValidate: true });
            }}
          />
          <div>Male</div>
        </label>
        <label htmlFor="female" className="gender-label">
          <input
            {...(register && register('gender'))}
            ref={refs?.female}
            className="gender-input"
            type="radio"
            id="female"
            name="gender"
            value="female"
            onClick={() => {
              if (setValue)
                setValue('gender', 'female', { shouldValidate: true });
            }}
          />
          <div>Female</div>
        </label>
      </div>
    </div>
  );
}
