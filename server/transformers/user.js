export const userTransformers = (user) => {
  return {
    id: user.id,
    profile_image: user.profile_image,
    name: user.name,
    user_name: user.user_name,
    email: user.email,
  };
};
