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
import { IHandleSubmitControlled } from '../lib/types/interfaces';

export function handleSubmitControlled({
  data,
  dispatch,
  navigate,
  file,
}: IHandleSubmitControlled) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const base64Image = event.target?.result;
    dispatch(setFile(base64Image));
  };

  if (file) reader.readAsDataURL(file);
  dispatch(setName(data.name));
  dispatch(setAge(data.age));
  dispatch(setEmail(data.email));
  dispatch(setPassword(data.password));
  dispatch(setGender(data.gender));
  dispatch(setAccept('true'));
  dispatch(setCountry(data.country));
  navigate('/');
}
