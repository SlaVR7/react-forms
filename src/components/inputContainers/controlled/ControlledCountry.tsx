import React, { useEffect, useState } from 'react';
import { filterCountries } from '../../../services/filterCountries';
import { ICountriesContainer } from '../../../lib/types/interfaces';

export function ControlledCountry({
  errors,
  setValue,
  register,
  countries,
}: ICountriesContainer) {
  const [filteredCountries, setFilteredCountries] = useState(['']);
  const [isCountriesListOpen, setIsCountriesListOpen] = useState(false);
  const [countryValue, setCountryValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    filterCountries({ countries, inputValue, setFilteredCountries });
    if (inputValue === '') {
      setValue('country', inputValue, { shouldValidate: false });
    } else {
      setValue('country', inputValue, { shouldValidate: true });
    }
  }, [inputValue, countryValue]);

  return (
    <label htmlFor="country" className="countries-label">
      <div className="field-name">Country:</div>
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
        <div className={errors ? 'warning' : 'empty-warning'}>{errors}</div>
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
  );
}
