import api from '@/lib/api';

import type { ProfileResponse } from './types';

const ProfileService = {
  getProfile: async () => {
    const response = await api.get<ProfileResponse>('/profile');
    return response.data.data;
  },
};

export default ProfileService;
