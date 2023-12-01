import { useRef } from 'react';
import { Refs } from './types/interfaces';

const useCustomRefs = (): Refs => {
  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const male = useRef<HTMLInputElement>(null);
  const female = useRef<HTMLInputElement>(null);
  const accept = useRef<HTMLInputElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLInputElement>(null);

  return {
    name,
    age,
    email,
    password,
    confirmPassword,
    male,
    female,
    accept,
    file,
    country,
  };
};

export default useCustomRefs;
