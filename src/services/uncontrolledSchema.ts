import * as yup from 'yup';

export const uncontrolledSchema = (countries: string[]) =>
  yup.object({
    name: yup
      .string()
      .matches(/^[А-ЯA-Z]/, 'first letter must be capitalize')
      .required(),
    age: yup
      .string()
      .matches(/^[1-9]\d*$/, 'age must be a positive')
      .matches(/^-?\d+$/, 'age must be a number')
      .required(),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        'email is not valid'
      )
      .required(),
    password: yup
      .string()
      .matches(
        /^(?=.*[а-яa-z])/,
        'password must contains at least one lowercase letter'
      )
      .matches(
        /(?=.*[А-ЯA-Z])/,
        'password must contains at least one uppercase letter'
      )
      .matches(/(?=.*\d)/, 'password must contains at least one number')
      .matches(
        /(?=.*[@$!();-=№#"%*?&])/,
        'password must contains at least one special character'
      )
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'passwords must match')
      .required('confirm password is required'),
    gender: yup.string().required('gender is required'),
    accept: yup
      .boolean()
      .oneOf([true], 'you must accept the terms and conditions'),
    file: yup
      .mixed<File>()
      .required('file is required')
      .test('fileSize', 'file size must be less than 500 KB', (value) => {
        if (!value) return true;

        const maxSizeInBytes = 500 * 1024;
        return value.size <= maxSizeInBytes;
      })
      .test(
        'fileFormat',
        'file must be a valid image (jpeg or png)',
        (value) => {
          if (!value) return true;

          const acceptedFormats = ['image/jpeg', 'image/png'];
          return acceptedFormats.includes(value.type);
        }
      ),
    country: yup
      .string()
      .required()
      .oneOf(countries, 'this country does not exist'),
  });
