import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { comparePasswords, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { generateJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
  const isFirstAcccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAcccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'User created' });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValidUser =
    user && (await comparePasswords(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

  const token = generateJWT({ userId: user._id, role: user.role });
  const oneDayInMs = 24 * 60 * 60 * 1000;

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + oneDayInMs),
  });
  res.status(StatusCodes.OK).json({ msg: 'User logged in' });
};

export const logoutUser = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'User Logged Out' });
};
