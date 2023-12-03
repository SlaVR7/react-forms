import { FilterCountries } from '../lib/types/types';

export function filterCountries({
  countries,
  inputValue,
  setFilteredCountries,
}: FilterCountries) {
  const result = countries.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );
  setFilteredCountries(result);
}
