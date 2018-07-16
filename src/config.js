/* eslint-disable import/prefer-default-export */
import { homepage } from '../package.json';

export const basename = process.env.NODE_ENV === 'production' ? `/${homepage.split('/').slice(3).join('/')}` : '';
