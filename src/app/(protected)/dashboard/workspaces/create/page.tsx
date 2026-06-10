import type { Metadata } from 'next';

import CreateWorkspaceForm from '../_components/create-workspace-form';

export const metadata: Metadata = {
  title: 'ایجاد میزکار',
};

export default function CreateWorkspacePage() {
  return (
    <div className="m-20 rounded-lg bg-white p-20">
      <CreateWorkspaceForm />
    </div>
  );
}
