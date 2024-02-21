import bcrypt from "bcrypt";
import { sendError } from "h3";
import { getUserByUsername } from "~/server/db/user";
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt";
import { userTransformers } from "~/server/transformers/user";
import { createRefreshToken } from "~/server/db/refreshTokens";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { user_name, password } = body;

  if (!user_name || !password) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalids Params" })
    );
  }

  // Is the user is registered
  const user = await getUserByUsername(user_name);

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or password is invalid",
      })
    );
  }

  // Compare Password
  const doesThePasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesThePasswordMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or password is invalid",
      })
    );
  }

  // Generate Tokens ( Access and Refresh Tokens )
  const { accesToken, refreshToken } = generateTokens(user);

  // Save it inside db
  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  // Add http only cookie
  sendRefreshToken(event, refreshToken);

  return {
    acces_token: accesToken,
    user: userTransformers(user),
  };
});
