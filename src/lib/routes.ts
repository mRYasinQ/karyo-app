const ROUTES = {
  HOME: '/',

  AUTH: {
    REGISTER: '/register',
    LOGIN: '/login',
    RECOVER_PASSWORD: '/recover-password',
  },

  DASHBOARD: {
    MAIN: '/dashboard',
    PROFILE: '/dashboard/profile',
    WORKSPACES: '/dashboard/workspaces',
    INVITES: '/dashboard/invites',
  },
} as const;

export default ROUTES;
