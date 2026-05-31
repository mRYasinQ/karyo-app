import type { Metadata } from 'next';

import Workspaces from './_components/workspaces';

export const metadata: Metadata = {
  title: 'میزکارهای من',
};

export default function WorkspacesPage() {
  return (
    <div className="m-20">
      <Workspaces />
    </div>
  );
}
