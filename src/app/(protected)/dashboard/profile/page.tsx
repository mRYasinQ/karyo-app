import type { Metadata } from 'next';

import ProfileForm from './_components/profile-form';

export const metadata: Metadata = {
  title: 'نمایه',
};

export default function ProfilePage() {
  return (
    <div className="m-20 rounded-lg bg-white p-20">
      <ProfileForm />
    </div>
  );
}
