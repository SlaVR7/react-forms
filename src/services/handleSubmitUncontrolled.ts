import { validationSchema } from './validationSchema';
import {
  setAccept,
  setAge,
  setCountry,
  setEmail,
  setFile,
  setGender,
  setName,
  setPassword,
} from '../redux/reducers/cardsSlice';
import * as yup from 'yup';
import { HandleSubmit } from '../lib/types/types';

export function handleSubmitUncontrolled({
  event,
  refs,
  setValidationErrors,
  dispatch,
  navigate,
  countries,
}: HandleSubmit) {
  event.preventDefault();
  const file = refs.file.current?.files?.[0];
  let selectedGender;
  if (refs.male.current?.checked) {
    selectedGender = refs.male.current.value;
  } else if (refs.female.current?.checked) {
    selectedGender = refs.female.current.value;
  } else {
    selectedGender = '';
  }

  const reader = new FileReader();

  const formData = {
    name: refs.name.current?.value,
    age: refs.age.current?.value,
    email: refs.email.current?.value,
    password: refs.password.current?.value,
    confirmPassword: refs.confirmPassword.current?.value,
    gender: selectedGender,
    accept: refs.accept.current?.checked,
    file: file,
    country: refs.country.current?.value,
  };

  validationSchema(countries)
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
    });

  reader.onload = (event) => {
    const base64Image = event.target?.result;
    dispatch(setFile(base64Image));
  };

  if (file) reader.readAsDataURL(file);
}
