import api from '@/lib/api';
import { buildFormData } from '@/lib/utils';

import type { ProfileResponse, UpdateProfilePayload } from './types';

const ProfileService = {
  getProfile: async () => {
    const response = await api.get<ProfileResponse>('/profile');
    return response.data.data;
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    const hasFile = payload.avatar instanceof File;

    if (hasFile) {
      const formData = buildFormData(payload);

      const response = await api.patch<BaseApiResponse>('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }

    const response = await api.patch<BaseApiResponse>('/profile', payload);
    return response.data;
  },
};

export default ProfileService;
