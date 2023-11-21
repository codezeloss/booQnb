import bcrypt from "bcrypt";

export default async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}
