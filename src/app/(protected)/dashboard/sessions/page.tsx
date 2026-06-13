import type { Metadata } from 'next';

import Sessions from './_components/sessions';

export const metadata: Metadata = {
  title: 'دستگاه‌های من',
};

export default function SessionsPage() {
  return (
    <div className="m-20">
      <Sessions />
    </div>
  );
}
