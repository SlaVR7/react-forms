import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useCustomRefs from '../lib/refs';
import { handleSubmitUncontrolled } from '../services/handleSubmitUncontrolled';
import { UncontrolledText } from '../components/inputContainers/uncontrolled/UncontrolledText';
import { ValidationErrors } from '../lib/types/interfaces';
import { Gender } from '../components/inputContainers/Gender';
import { Accept } from '../components/inputContainers/Accept';
import { UncontrolledCountry } from '../components/inputContainers/uncontrolled/UncontrolledCountry';
import { Header } from '../components/Header';
import { RootState } from '../redux/store';

export function Uncontrolled() {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const refs = useCustomRefs();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countriesSlice);

  return (
    <>
      <Header />
      <div className="form-wrapper">
        <h1>Uncontrolled page</h1>
        <form
          onSubmit={(event) => {
            handleSubmitUncontrolled({
              event,
              refs,
              setValidationErrors,
              dispatch,
              navigate,
              countries,
            });
            setIsSubmitted(true);
          }}
          noValidate={true}
        >
          <UncontrolledText
            refs={refs.name}
            validationErrors={validationErrors.name}
            fieldName={'Name'}
            type="text"
          />
          <UncontrolledText
            refs={refs.age}
            validationErrors={validationErrors.age}
            fieldName={'Age'}
            type="text"
          />
          <UncontrolledText
            refs={refs.email}
            validationErrors={validationErrors.email}
            fieldName={'Email'}
            type="email"
          />
          <UncontrolledText
            refs={refs.password}
            validationErrors={validationErrors.password}
            fieldName={'Password'}
            type="password"
            isSubmitted={isSubmitted}
          />
          <UncontrolledText
            refs={refs.confirmPassword}
            validationErrors={validationErrors.confirmPassword}
            fieldName={'Confirm password:'}
            type="password"
          />
          <Gender refs={refs} validationErrors={validationErrors.gender} />
          <Accept refs={refs} validationErrors={validationErrors.accept} />
          <UncontrolledText
            refs={refs.file}
            validationErrors={validationErrors.file}
            fieldName={'Upload picture'}
            type="file"
          />
          <UncontrolledCountry
            refs={refs}
            validationErrors={validationErrors.country}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
