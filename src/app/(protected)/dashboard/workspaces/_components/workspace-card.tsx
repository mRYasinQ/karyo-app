'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { WorkspaceData } from '@/services/workpsace/types';

type WorkspaceCardProps = WorkspaceData;

const WorkspaceCard = ({ slug, logo, name }: WorkspaceCardProps) => {
  const placeholderLetter = name.charAt(0);

  return (
    <Link
      href={`/dashboard/workspaces/${slug}`}
      className="group relative mt-28 flex flex-col items-center gap-12 rounded-2xl bg-white p-20 pt-40 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="absolute -top-28 left-1/2 flex size-56 -translate-x-1/2 items-center justify-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
        {logo ? (
          <Image
            src={logo}
            alt={name}
            width={48}
            height={48}
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          <div className="bg-primary-50 text-primary-600 flex h-full w-full items-center justify-center rounded-xl">
            <span className="text-body-lg-500 font-bold">
              {placeholderLetter}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 text-center">
        <h3 className="text-body-lg-500 group-hover:text-primary-600 text-gray-900 transition-colors">
          {name}
        </h3>
        <span className="text-body-sm-400 text-gray-500" dir="ltr">
          @{slug}
        </span>
      </div>
    </Link>
  );
};

export default WorkspaceCard;
