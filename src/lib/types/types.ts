import React, { FormEvent } from 'react';
import { Refs } from './interfaces';
import { Dispatch } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

export type FilterCountries = {
  countries: string[];
  inputValue: string;
  setFilteredCountries: React.Dispatch<React.SetStateAction<string[]>>;
};

export type HandleSubmit = {
  event: FormEvent;
  refs: Refs;
  setValidationErrors: React.Dispatch<Record<string, string>>;
  dispatch: Dispatch;
  navigate: NavigateFunction;
  countries: string[];
};

export type FileInput = {
  new (
    fileBits: BlobPart[],
    fileName: string,
    options?: FilePropertyBag | undefined
  ): File;
  prototype: File;
};

export type ValidFieldNames =
  | 'name'
  | 'age'
  | 'email'
  | 'password'
  | 'gender'
  | 'accept'
  | 'file'
  | 'country'
  | 'confirmPassword';
