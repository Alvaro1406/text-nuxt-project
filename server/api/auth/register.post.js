import { sendError } from "h3";
import { createUser } from "~/server/db/user";
import { userTransformers } from "~/server/transformers/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { profile_image, name, user_name, email, password, repeatPassword } =
    body;

  if (!name || !user_name || !email || !password || !repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalids Params" })
    );
  }

  if (password != repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Passwords do not match" })
    );
  }

  const userData = {
    profile_image,
    name,
    user_name,
    email,
    password,
    repeatPassword,
  };

  const user = await createUser(userData);

  return {
    body: userTransformers(user),
  };
});
