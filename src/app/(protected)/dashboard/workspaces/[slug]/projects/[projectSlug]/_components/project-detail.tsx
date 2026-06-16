'use client';

import { notFound, useParams } from 'next/navigation';

import PageLoader from '@/app/(protected)/dashboard/_components/page-loader';
import ProjectService from '@/services/projects';
import WorkspaceService from '@/services/workpsace';

import ProjectBoard from './project-board';
import ProjectHeader from './project-header';

import { useQuery } from '@tanstack/react-query';

type ProjectDetailParams = { slug: string; projectSlug: string };

const ProjectDetail = () => {
  const { slug, projectSlug } = useParams<ProjectDetailParams>();

  const { data: workspace, isLoading: isWorkspaceLoading } = useQuery({
    queryKey: ['workspace', slug],
    queryFn: () => WorkspaceService.getWorkspace(slug),
  });

  const { data: project, isLoading: isProjectLoading } = useQuery({
    queryKey: ['project', workspace?.id, projectSlug],
    queryFn: () => ProjectService.getProject(workspace!.id, projectSlug),
    enabled: Boolean(workspace?.id),
  });

  if (isWorkspaceLoading || isProjectLoading) {
    return <PageLoader className="min-h-400 rounded-lg bg-white" />;
  }

  if (!workspace || !project) return notFound();

  return (
    <div className="flex flex-col gap-24">
      <ProjectHeader {...project} />
      <ProjectBoard
        workspaceId={workspace.id}
        projectId={project.id}
        workspaceSlug={workspace.slug}
        workspaceRole={workspace.workspace_role}
      />
    </div>
  );
};

export default ProjectDetail;
