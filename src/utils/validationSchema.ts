import * as Yup from 'yup';
import countries from '@/data/countries.json';

const validationSchema = Yup.object({
  name: Yup.string().matches(/^[a-zA-Z\s]+$/, 'Invalid').required('Empty'),
  country: Yup.string().oneOf(countries, 'Invalid').required('Empty'),
  email: Yup.string().email('Invalid').required('Empty'),
  phone: Yup.string().matches(/^\+\d+$/, 'Invalid').required('Empty'),
});

export default validationSchema;
