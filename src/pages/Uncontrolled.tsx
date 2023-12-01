import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useCustomRefs from '../lib/refs';
import { handleSubmitUncontrolled } from '../services/handleSubmitUncontrolled';
import { InputContainer } from '../components/inputContainers/uncontrolled/InputContainer';
import { ValidationErrors } from '../lib/types/interfaces';
import { GenderContainer } from '../components/inputContainers/uncontrolled/GenderContainer';
import { AcceptContainer } from '../components/inputContainers/uncontrolled/AcceptContainer';
import { CountryContainer } from '../components/inputContainers/uncontrolled/CountryContainer';
import { Header } from '../components/Header';

export function Uncontrolled() {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const dispatch = useDispatch();
  const refs = useCustomRefs();
  const navigate = useNavigate();
  const countries = useSelector((state) => state.countriesSlice);

  return (
    <>
      <Header />
      <div className="form-wrapper">
        <h1>Uncontrolled page</h1>
        <form
          onSubmit={(event) =>
            handleSubmitUncontrolled({
              event,
              refs,
              setValidationErrors,
              dispatch,
              navigate,
              countries,
            })
          }
          noValidate={true}
        >
          <InputContainer
            refs={refs.name}
            validationErrors={validationErrors.name}
            fieldName={'Name'}
            type="text"
          />
          <InputContainer
            refs={refs.age}
            validationErrors={validationErrors.age}
            fieldName={'Age'}
            type="number"
          />
          <InputContainer
            refs={refs.email}
            validationErrors={validationErrors.email}
            fieldName={'E-mail'}
            type="email"
          />
          <InputContainer
            refs={refs.password}
            validationErrors={validationErrors.password}
            fieldName={'Password'}
            type="password"
          />
          <InputContainer
            refs={refs.confirmPassword}
            validationErrors={validationErrors.confirmPassword}
            fieldName={'Confirm password:'}
            type="password"
          />
          <GenderContainer
            refs={refs}
            validationErrors={validationErrors.gender}
          />
          <AcceptContainer
            refs={refs}
            validationErrors={validationErrors.accept}
          />
          <InputContainer
            refs={refs.file}
            validationErrors={validationErrors.file}
            fieldName={'Upload picture'}
            type="file"
          />
          <CountryContainer
            refs={refs}
            validationErrors={validationErrors.country}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
