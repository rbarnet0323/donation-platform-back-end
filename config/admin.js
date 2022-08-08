module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '073f605e9cb4bb6d027a30974e990ad0'),
  },
});
