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
    WORKSPACES: {
      MAIN: '/dashboard/workspaces',
      SHOW: (slug: string) => `/dashboard/workspaces/${slug}`,
      CREATE: '/dashboard/workspaces/create',
    },
    INVITES: '/dashboard/invites',
  },
} as const;

export default ROUTES;
