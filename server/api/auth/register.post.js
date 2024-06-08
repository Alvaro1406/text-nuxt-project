import { sendError } from "h3";
import {
  createUser,
  getUserByUsername,
  getUserByPhoneNumber,
} from "~/server/db/user";
import { userTransformers } from "~/server/transformers/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const {
    profile_image,
    name,
    last_name,
    user_name,
    email,
    phone_code,
    phone_number,
    password,
    repeatPassword,
  } = body;

  // Validation so that no field is empty
  if (
    !name ||
    !last_name ||
    !user_name ||
    !email ||
    !phone_code ||
    !phone_number ||
    !password ||
    !repeatPassword
  ) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalids Params" })
    );
  }

  // Validation to know that the passwords do not match
  if (password != repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Passwords do not match" })
    );
  }

  // Validation that the user name already exists
  const userName = await getUserByUsername(user_name);
  if (userName) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username already exist",
      })
    );
  }

  // Validation that the phone number already exists
  const phoneNumber = await getUserByPhoneNumber(phone_number);
  if (phoneNumber) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "The phone number already exists",
      })
    );
  }

  const userData = {
    profile_image,
    name,
    last_name,
    user_name,
    email,
    phone_code,
    phone_number,
    password,
    repeatPassword,
  };

  const user = await createUser(userData);

  return {
    body: userTransformers(user),
  };
});
