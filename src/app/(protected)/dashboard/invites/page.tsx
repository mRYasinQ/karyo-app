import type { Metadata } from 'next';

import Invites from './_components/invites';

export const metadata: Metadata = {
  title: 'دعوت‌های من',
};

export default function InvitesPage() {
  return (
    <div className="m-20">
      <Invites />
    </div>
  );
}
