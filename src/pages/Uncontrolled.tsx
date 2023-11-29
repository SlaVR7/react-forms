import React, { FormEvent, useEffect, useRef, useState } from 'react';
import {
  setAge,
  setName,
  setEmail,
  setGender,
  setFile,
  setPassword,
  setCountry,
  setAccept,
} from '../redux/reducers/uncontrolledSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { RootState } from '../redux/store';

export function Uncontrolled() {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [inputValue, setInputValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(['']);
  const [isCountriesListOpen, setIsCountriesListOpen] = useState(false);
  const countries = useSelector((state: RootState) => state.countriesSlice);
  const dispatch = useDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required()
      .matches(/^[А-ЯA-Z]/, 'First letter must be capitalize'),
    age: yup
      .number()
      .typeError('Enter you age!')
      .positive('Age must be a positive number!'),
    email: yup.string().required().email('Email is not valid!'),
    password: yup
      .string()
      .matches(
        /^(?=.*[а-яa-z])/,
        'Password must contains at least one lowercase letter'
      )
      .matches(
        /(?=.*[А-ЯA-Z])/,
        'Password must contains at least one uppercase letter'
      )
      .matches(/(?=.*\d)/, 'Password must contains at least one number')
      .matches(
        /(?=.*[@$!-=();№#"%*?&])/,
        'Password must contains at least one special character'
      )
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select a valid gender')
      .required('Gender is required'),
    accept: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions'),
    file: yup
      .mixed<File>()
      .required('File is required')
      .test(
        'fileFormat',
        'File must be a valid image (jpeg or png)',
        (value) => {
          if (!value) return true;

          const acceptedFormats = ['image/jpeg', 'image/png'];
          return acceptedFormats.includes(value.type);
        }
      )
      .test('fileSize', 'File size must be less than 500 KB', (value) => {
        if (!value) return true;

        const maxSizeInBytes = 500 * 1024;
        return value.size <= maxSizeInBytes;
      }),
    country: yup.string().required(),
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const file = fileRef.current?.files?.[0];
    let selectedGender;
    if (maleRef.current?.checked) {
      selectedGender = maleRef.current.value;
    } else if (femaleRef.current?.checked) {
      selectedGender = femaleRef.current.value;
    } else {
      selectedGender = '';
    }

    const reader = new FileReader();

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: selectedGender,
      accept: acceptRef.current?.checked,
      file: file,
      country: countryRef.current?.value,
    };

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setValidationErrors({});
        dispatch(setName(formData.name));
        dispatch(setAge(formData.age));
        dispatch(setEmail(formData.email));
        dispatch(setPassword(formData.password));
        dispatch(setGender(formData.gender));
        dispatch(setAccept('true'));
        dispatch(setCountry(formData.country));
        navigate('/');
      })
      .catch((e: yup.ValidationError) => {
        const errors: Record<string, string> = {};
        e.inner.forEach((error) => {
          errors[error.path!] = error.message;
        });
        setValidationErrors(errors);
        console.error(e.errors);
      });

    reader.onload = (event) => {
      const base64Image = event.target?.result;
      dispatch(setFile(base64Image));
    };

    if (file) reader.readAsDataURL(file);
  }

  function filterCountries() {
    const result = countries.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCountries(result);
  }
  useEffect(() => filterCountries(), [inputValue]);

  return (
    <div className="uncontrolled-wrapper">
      <h1>Uncontrolled page</h1>
      <form onSubmit={handleSubmit} noValidate={true}>
        <label>
          <div>Name:</div>
          <div>
            <input ref={nameRef} />
            {validationErrors.name && (
              <div className="warning">{validationErrors.name}</div>
            )}
          </div>
        </label>
        <label>
          <div>Age:</div>
          <div>
            <input ref={ageRef} type="number" />
            {validationErrors.age && (
              <div className="warning">{validationErrors.age}</div>
            )}
          </div>
        </label>
        <label>
          <div>E-mail:</div>
          <div>
            <input ref={emailRef} type="email" />
            {validationErrors.email && (
              <div className="warning">{validationErrors.email}</div>
            )}
          </div>
        </label>
        <label>
          <div>Password:</div>
          <div>
            <input ref={passwordRef} type="password" />
            {validationErrors.password && (
              <div className="warning">{validationErrors.password}</div>
            )}
          </div>
        </label>
        <label>
          <div>Confirm password:</div>
          <div>
            <input ref={confirmPasswordRef} type="password" />
            {validationErrors.confirmPassword && (
              <div className="warning">{validationErrors.confirmPassword}</div>
            )}
          </div>
        </label>
        <div className="gender-container">
          <div>Gender: </div>
          <div>
            <div>
              <input
                ref={maleRef}
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
                ref={femaleRef}
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
          {validationErrors.gender && (
            <div className="warning">{validationErrors.gender}</div>
          )}
        </div>
        <div className="accept-container">
          <div>
            <input ref={acceptRef} type="checkbox" name="accept" id="accept" />
            <label className="inline-label" htmlFor="accept">
              accept T&C
            </label>
          </div>
          {validationErrors.accept && (
            <div className="warning">{validationErrors.accept}</div>
          )}
        </div>
        <div className="file-container">
          <label>Upload picture</label>
          <div>
            <input ref={fileRef} type="file" />
            {validationErrors.file && (
              <div className="warning">{validationErrors.file}</div>
            )}
          </div>
        </div>
        <label htmlFor="country" className="countries-label">
          <div>Country:</div>
          <div>
            {isCountriesListOpen && (
              <div
                onClick={(event) => {
                  const clickedElement = event.target as HTMLDivElement;
                  setInputValue(clickedElement.textContent || '');
                }}
                className="countries-container"
              >
                {filteredCountries.map((country) => {
                  return (
                    <div className="country" key={country}>
                      {country}
                    </div>
                  );
                })}
              </div>
            )}
            <input
              ref={countryRef}
              type="text"
              id="country"
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
                setIsCountriesListOpen(true);
              }}
              onClick={() => setIsCountriesListOpen(!isCountriesListOpen)}
            />
            {validationErrors.country && (
              <div className="warning">{validationErrors.country}</div>
            )}
          </div>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
