import { genSalt, hash } from "bcryptjs";

export async function hashStringWithBcrypt(str: string) {
   const salt = await genSalt(10);
   return await hash(str, salt);
}
