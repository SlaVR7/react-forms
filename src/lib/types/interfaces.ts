import React, { RefObject } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Dispatch } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

export interface Refs {
  name: RefObject<HTMLInputElement>;
  age: RefObject<HTMLInputElement>;
  email: RefObject<HTMLInputElement>;
  password: RefObject<HTMLInputElement>;
  confirmPassword: RefObject<HTMLInputElement>;
  male: RefObject<HTMLInputElement>;
  female: RefObject<HTMLInputElement>;
  accept: RefObject<HTMLInputElement>;
  file: RefObject<HTMLInputElement>;
  country: RefObject<HTMLInputElement>;
}

export interface ValidationErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  male?: string;
  female?: string;
  accept?: string;
  gender?: string;
  file?: string;
  country?: string;
}

export interface IInputContainer {
  refs?: RefObject<HTMLInputElement>;
  validationErrors: string | undefined;
  fieldName: string;
  type: string;
  isSubmitted?: boolean;
}

export interface IControlledInputContainer {
  fieldName: string;
  register: UseFormRegister<IResolver>;
  errors: string | undefined;
  type: string;
  setValue: UseFormSetValue<IResolver>;
}

export interface IRefsValidation {
  refs?: Refs;
  validationErrors: string | undefined;
  setValue?: UseFormSetValue<IResolver>;
  register?: UseFormRegister<IResolver>;
  watch?: UseFormWatch<IResolver>;
}

export interface IInitialState {
  name: string[];
  age: number[];
  email: string[];
  password: string[];
  gender: string[];
  accept: string[];
  file: string[];
  country: string[];
}

export interface IHandleSubmitControlled {
  data: IResolver;
  dispatch: Dispatch;
  navigate: NavigateFunction;
  file: File | undefined;
}

export interface IResolver {
  age?: number | undefined;
  accept?: boolean;
  name: string;
  email: string;
  password: string;
  gender: NonNullable<'male' | 'female' | undefined>;
  file: File;
  country: string;
  confirmPassword: string;
}

export interface IFileContainer {
  errors: string | undefined;
  setValue: UseFormSetValue<IResolver>;
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export interface ICountriesContainer {
  errors: string | undefined;
  setValue: UseFormSetValue<IResolver>;
  register: UseFormRegister<IResolver>;
  countries: string[];
}
