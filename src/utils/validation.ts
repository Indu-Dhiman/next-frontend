import * as Yup from 'yup';

export interface AuthFormValues {
  username?: string;
  email: string;
  password: string;
  role?: string;
}

export const validationSchema = (formType: 'login' | 'signup') => {
  return Yup.object().shape({
    username: formType === 'signup'
      ? Yup.string().required('Username is required.') 
      : Yup.string(),
    email: Yup.string()
      .email('Invalid email format.')
      .required('Email is required.'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters.')
      .required('Password is required.'),
    role: formType === 'signup'
      ? Yup.string().oneOf(['user', 'admin'], 'Invalid role selected.')
      : Yup.string().notRequired(),
  });
};

export type ValidationSchemaType = ReturnType<typeof validationSchema>;
