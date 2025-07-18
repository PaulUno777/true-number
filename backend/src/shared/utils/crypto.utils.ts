import * as bcrypt from 'bcrypt';
import { compare, genSalt, hash } from 'bcrypt';

export const hashData = async (data: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  return await hash(data, salt);
};

export const verifyHash = async (
  hash: string,
  plain: string,
): Promise<boolean> => {
  return await compare(plain, hash);
};
