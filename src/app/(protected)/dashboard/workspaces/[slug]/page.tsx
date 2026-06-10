import type { Metadata } from 'next';

import WorkspaceDetail from './_components/workspace-detail';

export const metadata: Metadata = {
  title: 'میزکار',
};

export default function WorkspacePage() {
  return (
    <div className="m-20 flex flex-col gap-24">
      <WorkspaceDetail />
    </div>
  );
}
