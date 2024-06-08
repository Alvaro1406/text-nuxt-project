export const userTransformers = (user) => {
  return {
    id: user.id,
    profile_image: user.profile_image,
    name: user.name,
    last_name: user.last_name,
    user_name: user.user_name,
    email: user.email,
    phone_code: user.phone_code,
    phone_number: user.phone_number,
  };
};
