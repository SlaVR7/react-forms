import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { validationSchema } from '../services/validationSchema';
import { ControlledInput } from '../components/inputContainers/controlled/ControlledInput';
import { defaultInputsValues } from '../lib/defaultInputsValues';
import { useDispatch, useSelector } from 'react-redux';
import { filterCountries } from '../services/filterCountries';
import { handleSubmitControlled } from '../services/handleSubmitControlled';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';

export function Controlled() {
  const countries = useSelector((state) => state.countriesSlice);
  const [inputValue, setInputValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(['']);
  const [isCountriesListOpen, setIsCountriesListOpen] = useState(false);
  const [countryValue, setCountryValue] = useState('');
  const [file, setFile] = useState();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema(countries)),
    defaultValues: defaultInputsValues,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    filterCountries({ countries, inputValue, setFilteredCountries });
    if (inputValue === '') {
      setValue('country', inputValue, { shouldValidate: false });
    } else {
      setValue('country', inputValue, { shouldValidate: true });
    }
  }, [inputValue, countryValue]);

  useEffect(() => {
    if (file) {
      setValue('file', file, { shouldValidate: true });
    } else {
      setValue('file', file, { shouldValidate: false });
    }
  }, [file]);

  function onSubmit(data) {
    handleSubmitControlled(data, dispatch, navigate, file);
  }

  return (
    <>
      <Header />
      <div className="form-wrapper">
        <h1>Controlled page</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            fieldName="Name"
            register={register}
            errors={errors.name?.message}
            type="text"
          />
          <ControlledInput
            fieldName="Age"
            register={register}
            errors={errors.age?.message}
            type="number"
          />
          <ControlledInput
            fieldName="Email"
            register={register}
            errors={errors.email?.message}
            type="email"
          />
          <ControlledInput
            fieldName="Password"
            register={register}
            errors={errors.password?.message}
            type="password"
          />
          <ControlledInput
            fieldName="Confirm password"
            register={register}
            errors={errors.confirmPassword?.message}
            type="password"
          />
          {/*<GenderContainer validationErrors={errors.gender?.message} />*/}
          <div className="gender-container">
            <div>Gender: </div>
            <div>
              {errors && (
                <div className="warning">{errors.gender?.message}</div>
              )}
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onClick={() => setValue('gender', 'male')}
                />
                <label className="inline-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onClick={() => setValue('gender', 'female')}
                />
                <label className="inline-label" htmlFor="female">
                  Female
                </label>
              </div>
            </div>
          </div>
          {/*<AcceptContainer*/}
          {/*  validationErrors={errors.accept?.message}*/}
          {/*  setValue={setValue}*/}
          {/*/>*/}
          <div className="accept-container">
            <div>
              {errors && (
                <div className="warning">{errors.accept?.message}</div>
              )}
              <input
                {...register('accept')}
                type="checkbox"
                name="accept"
                id="accept"
                onChange={() =>
                  setValue('accept', !watch('accept'), { shouldValidate: true })
                }
              />
              <label className="inline-label" htmlFor="accept">
                accept T&C
              </label>
            </div>
          </div>
          <label>
            <div>Upload picture:</div>
            <div>
              {errors.file && (
                <div className="warning">{errors.file?.message}</div>
              )}
              <input
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
          </label>
          {/*<CountryContainer*/}
          {/*  validationErrors={errors.country?.message}*/}
          {/*  setValue={setValue}*/}
          {/*  register={register}*/}
          {/*/>*/}
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
              {errors && (
                <div className="warning">{errors.country?.message}</div>
              )}
              <input
                type="text"
                id="country"
                value={inputValue}
                {...register('country')}
                onChange={(event) => {
                  const inputValue = event.target.value;
                  const inputValueCapitalize =
                    inputValue.slice(0, 1).toUpperCase() + inputValue.slice(1);
                  setCountryValue(event.target.value);
                  setInputValue(inputValueCapitalize);
                  setIsCountriesListOpen(true);
                }}
                onClick={() => setIsCountriesListOpen(!isCountriesListOpen)}
              />
            </div>
          </label>
          <button
            type="submit"
            disabled={!isDirty || !isValid} //Object.keys(errors).length > 0
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
