import React, { useEffect, useState } from 'react';
import { filterCountries } from '../../../services/filterCountries';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { IRefsValidation } from '../../../lib/types/interfaces';

export function CountryContainer({ refs, validationErrors }: IRefsValidation) {
  const [inputValue, setInputValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(['']);
  const [isCountriesListOpen, setIsCountriesListOpen] = useState(false);
  const countries = useSelector((state: RootState) => state.countriesSlice);

  useEffect(() => {
    filterCountries({ countries, inputValue, setFilteredCountries });
  }, [inputValue]);

  return (
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
          ref={refs?.country}
          type="text"
          id="country"
          value={inputValue}
          onChange={(event) => {
            const inputValue = event.target.value;
            const inputValueCapitalize =
              inputValue.slice(0, 1).toUpperCase() + inputValue.slice(1);
            setInputValue(inputValueCapitalize);
            setIsCountriesListOpen(true);
          }}
          onClick={() => setIsCountriesListOpen(!isCountriesListOpen)}
        />
        {validationErrors && <div className="warning">{validationErrors}</div>}
      </div>
    </label>
  );
}
