export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.admin) {
    return next();
  }
  return res.redirect("/admin"); // if not logged in
};
