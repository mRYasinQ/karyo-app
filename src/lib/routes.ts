const ROUTES = {
  HOME: '/',

  AUTH: {
    REGISTER: '/register',
    LOGIN: '/login',
    RECOVER_PASSWORD: '/recover-password',
  },

  DASHBOARD: {
    MAIN: '/dashboard',
  },
} as const;

export default ROUTES;
