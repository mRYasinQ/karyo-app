import type { Metadata } from 'next';

import ProjectDetail from './_components/project-detail';

export const metadata: Metadata = {
  title: 'پروژه',
};

export default function ProjectPage() {
  return (
    <div className="m-20">
      <ProjectDetail />
    </div>
  );
}
