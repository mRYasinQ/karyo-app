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
    PROJECTS: {
      SHOW: (workspaceSlug: string, projectSlug: string) => {
        return `/dashboard/workspaces/${workspaceSlug}/projects/${projectSlug}`;
      },
    },
    INVITES: '/dashboard/invites',
    SESSIONS: '/dashboard/sessions',
  },
} as const;

export default ROUTES;
