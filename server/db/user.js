import { prisma } from ".";
import bcrypt from "bcrypt";

export const createUser = (userData) => {
  const finalUserData = {
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
  };

  return prisma.user.create({
    data: finalUserData,
  });
};

export const getUserByUsername = (user_name) => {
  return prisma.user.findUnique({
    where: { user_name },
  });
};
