import { compareSync } from "bcrypt-ts";
import db from "./db"

type User = {
  email: string,
  name: string,
  password?: string,
  id: number
}

export async function findUserByCredentials(
  email: string,
  password: string,
): Promise<User | null> {
  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user)
    return null;

  const isPasswordValid = compareSync(password, user.password);

  if (isPasswordValid)
    return {
      email: user.email,
      name: user.name,
      id: user.id
    };

  return null;
};