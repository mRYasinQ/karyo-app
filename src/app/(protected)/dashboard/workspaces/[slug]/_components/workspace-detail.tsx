'use client';

import { notFound, useParams } from 'next/navigation';

import WorkspaceService from '@/services/workpsace';

import PageLoader from '../../../_components/page-loader';
import WorkspaceHeader from './workspace-header';
import WorkspaceTabs from './workspace-tabs';

import { useQuery } from '@tanstack/react-query';

type WorkspaceDetailParams = { slug: string };

const WorkspaceDetail = () => {
  const { slug } = useParams<WorkspaceDetailParams>();

  const { data: workspace, isLoading } = useQuery({
    queryKey: ['workspace', slug],
    queryFn: () => WorkspaceService.getWorkspace(slug),
  });

  if (isLoading) return <PageLoader />;
  if (!workspace) return notFound();

  return (
    <>
      <WorkspaceHeader {...workspace} />
      <WorkspaceTabs {...workspace} />
    </>
  );
};

export default WorkspaceDetail;
