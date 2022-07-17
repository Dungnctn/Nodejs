import bcrypt from 'bcrypt';
import { PASSWORD_LENGTH } from '../constants/constants';

export const hashPassword = (password) => {
    return bcrypt.hashSync(password, PASSWORD_LENGTH);
}

export const comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}