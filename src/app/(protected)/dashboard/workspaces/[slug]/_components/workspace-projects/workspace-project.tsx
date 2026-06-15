'use client';

import Link from 'next/link';

import Icon from '@/components/common/icon';
import ROUTES from '@/lib/routes';
import type { ProjectData } from '@/services/projects/types';

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return '';

  return new Date(dateStr).toLocaleDateString('fa-IR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

type ProjectCardProps = ProjectData & {
  workspaceSlug: string;
};

const WorkspaceProject = ({
  name,
  slug,
  description,
  is_archived,
  start_date,
  end_date,
  workspaceSlug,
}: ProjectCardProps) => {
  return (
    <Link
      href={ROUTES.DASHBOARD.PROJECTS.SHOW(workspaceSlug, slug)}
      className="hover:border-primary-300 flex h-160 w-full flex-col justify-between rounded-xl border border-gray-100 bg-white p-16 transition-all duration-300 hover:shadow-sm"
    >
      <div className="flex flex-col gap-12">
        <div className="flex items-start justify-between gap-8">
          <div className="flex items-center gap-12">
            <div className="bg-primary-50 text-primary-600 flex size-40 shrink-0 items-center justify-center rounded-lg">
              <Icon
                name="icon-[basil--clipboard-outline]"
                className="size-24"
              />
            </div>
            <div className="flex items-center gap-8">
              <h3 className="text-body-md-500 line-clamp-1 text-gray-900">
                {name}
              </h3>
              {is_archived ? (
                <span className="shrink-0 rounded-full bg-gray-100 px-8 py-2 text-[11px] font-medium text-gray-600">
                  بایگانی شده
                </span>
              ) : (
                <span className="shrink-0 rounded-full bg-gray-100 px-8 py-2 text-[11px] font-medium text-gray-600">
                  بایگانی نشده
                </span>
              )}
            </div>
          </div>
        </div>

        {description && (
          <p className="text-body-sm-400 line-clamp-2 text-gray-500">
            {description}
          </p>
        )}
      </div>

      {(start_date || end_date) && (
        <div className="mt-auto flex items-center gap-6 border-t border-gray-50 pt-12 text-gray-400">
          <Icon name="icon-[basil--calendar-outline]" className="size-16" />
          <span className="text-caption-02" dir="rtl">
            {start_date ? formatDate(start_date) : '---'} تا{' '}
            {end_date ? formatDate(end_date) : '---'}
          </span>
        </div>
      )}
    </Link>
  );
};

export default WorkspaceProject;
