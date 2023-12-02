import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { validationSchema } from '../services/validationSchema';
import { ControlledText } from '../components/inputContainers/controlled/ControlledText';
import { defaultInputsValues } from '../lib/defaultInputsValues';
import { useDispatch, useSelector } from 'react-redux';
import { handleSubmitControlled } from '../services/handleSubmitControlled';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { RootState } from '../redux/store';
import { IResolver } from '../lib/types/interfaces';
import { Gender } from '../components/inputContainers/Gender';
import { Accept } from '../components/inputContainers/Accept';
import { ControlledFile } from '../components/inputContainers/controlled/ControlledFile';
import { ControlledCountry } from '../components/inputContainers/controlled/ControlledCountry';

export function Controlled() {
  const countries = useSelector((state: RootState) => state.countriesSlice);

  const [file, setFile] = useState<File>();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IResolver>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema(countries)),
    defaultValues: defaultInputsValues,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IResolver> = (data) => {
    handleSubmitControlled({ data, dispatch, navigate, file });
  };

  return (
    <>
      <Header />
      <div className="form-wrapper">
        <h1>Controlled page</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledText
            fieldName="Name"
            register={register}
            errors={errors.name?.message}
            type="text"
            setValue={setValue}
          />
          <ControlledText
            fieldName="Age"
            register={register}
            errors={errors.age?.message}
            type="number"
            setValue={setValue}
          />
          <ControlledText
            fieldName="Email"
            register={register}
            errors={errors.email?.message}
            type="email"
            setValue={setValue}
          />
          <ControlledText
            fieldName="Password"
            register={register}
            errors={errors.password?.message}
            type="password"
            setValue={setValue}
          />
          <ControlledText
            fieldName="Confirm password"
            register={register}
            errors={errors.confirmPassword?.message}
            type="password"
            setValue={setValue}
          />
          <Gender
            validationErrors={errors.gender?.message}
            register={register}
            setValue={setValue}
          />
          <Accept
            validationErrors={errors.accept?.message}
            register={register}
            setValue={setValue}
            watch={watch}
          />
          <ControlledFile
            errors={errors.file?.message}
            setValue={setValue}
            file={file}
            setFile={setFile}
          />
          <ControlledCountry
            errors={errors.country?.message}
            setValue={setValue}
            register={register}
            countries={countries}
          />
          <button type="submit" disabled={!isDirty || !isValid}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
