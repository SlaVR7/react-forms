import * as yup from 'yup';

export const validationSchema = (countries: string[]) =>
  yup.object({
    name: yup
      .string()
      .required()
      .matches(/^[А-ЯA-Z]/, 'First letter must be capitalize'),
    age: yup
      .number()
      .typeError('Enter you age!')
      .positive('Age must be a positive number!'),
    email: yup
      .string()
      .required()
      .email('Email is not valid!')
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        'Email is not valid!'
      ),
    password: yup
      .string()
      .matches(
        /^(?=.*[а-яa-z])/,
        'Password must contains at least one lowercase letter'
      )
      .matches(
        /(?=.*[А-ЯA-Z])/,
        'Password must contains at least one uppercase letter'
      )
      .matches(/(?=.*\d)/, 'Password must contains at least one number')
      .matches(
        /(?=.*[@$!();-=№#"%*?&])/,
        'Password must contains at least one special character'
      )
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select a valid gender')
      .required('Gender is required'),
    accept: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions'),
    file: yup
      .mixed<File>()
      .required('File is required')
      .test(
        'fileFormat',
        'File must be a valid image (jpeg or png)',
        (value) => {
          if (!value) return true;

          const acceptedFormats = ['image/jpeg', 'image/png'];
          return acceptedFormats.includes(value.type);
        }
      )
      .test('fileSize', 'File size must be less than 500 KB', (value) => {
        if (!value) return true;

        const maxSizeInBytes = 500 * 1024;
        return value.size <= maxSizeInBytes;
      }),
    country: yup
      .string()
      .required()
      .oneOf(countries, 'this country does not exist'),
  });
