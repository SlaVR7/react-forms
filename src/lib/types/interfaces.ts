import { RefObject } from 'react';
import { UseFormRegister } from 'react-hook-form';

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
}

export interface IControlledInputContainer {
  fieldName: string;
  register: UseFormRegister<ValidationErrors>;
  errors: string | undefined;
  type: string;
}

export interface IRefsValidation {
  refs?: Refs;
  validationErrors: string | undefined;
  setValue?: () => void;
  register?: UseFormRegister<ValidationErrors>;
}

export interface IInitialState {
  name: string[];
  age: string[];
  email: string[];
  password: string[];
  gender: string[];
  accept: string[];
  file: string[];
  country: string[];
}
