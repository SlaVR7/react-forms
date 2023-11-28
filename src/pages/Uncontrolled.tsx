import { FormEvent, useRef } from 'react';
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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { number, object, string } from 'yup';

export function Uncontrolled() {
  const dispatch = useDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const validationSchema = object({
    name: string()
      .required()
      .matches(/^[А-ЯA-Z]/, 'First letter must be capitalize'),
    age: number()
      .typeError('Please, enter you age!')
      .positive('Age must be a positive number!'),
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      gender: genderRef.current?.value,
      accept: acceptRef.current?.checked,
      file: 'fileRef.current?.value',
      country: countryRef.current?.value,
    };

    validationSchema
      .validate(formData, { abortEarly: false })
      .then((data) => {
        console.log(data);
        dispatch(setName(formData.name));
        dispatch(setAge(formData.age));
        dispatch(setEmail(formData.email));
        dispatch(setPassword(formData.password));
        dispatch(setGender(formData.gender));
        dispatch(setAccept(formData.accept));
        dispatch(setFile(formData.file));
        dispatch(setCountry(formData.country));
        navigate('/');
      })
      .catch((e) => console.error(e.errors));
  }

  return (
    <div className="uncontrolled-wrapper">
      <h1>Uncontrolled page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <div>Name:</div>
          <input ref={nameRef} />
        </label>
        <label>
          Age:
          <input
            ref={ageRef}
            type="number"
            onChange={(e) => console.log(e.target.value)}
          />
        </label>
        <label>
          E-mail:
          <input ref={emailRef} type="email" />
        </label>
        <label>
          Password:
          <input ref={passwordRef} type="password" />
        </label>
        <label>
          Confirm password:
          <input ref={passwordRef} type="password" />
        </label>
        <div className="gender-container">
          <div>Gender: </div>
          <div>
            <input
              ref={genderRef}
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
            <input type="radio" id="female" name="gender" value="female" />
            <label className="inline-label" htmlFor="female">
              Female
            </label>
          </div>
        </div>
        <div className="accept-container">
          <input ref={acceptRef} type="checkbox" name="accept" />
          <label className="inline-label" htmlFor="accept">
            accept T&C
          </label>
        </div>
        <div className="file-container">
          <label htmlFor="">Upload picture</label>
          <input ref={fileRef} type="file" />
        </div>
        <label>
          Country:
          <input ref={countryRef} type="text" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
