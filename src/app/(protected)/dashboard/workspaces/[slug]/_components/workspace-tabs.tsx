'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import type { PrivateWorkspaceData } from '@/services/workpsace/types';

const WORKSPACE_TABS = [
  { id: 'projects', label: 'پروژه‌ها' },
  { id: 'members', label: 'اعضا' },
] as const;

type TabId = (typeof WORKSPACE_TABS)[number]['id'];

type WorkspaceTabsProps = PrivateWorkspaceData;

const WorkspaceTabs = ({}: WorkspaceTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabId>('projects');

  return (
    <div className="flex flex-col gap-16">
      <div className="flex gap-8 border-b border-gray-200 pb-4">
        {WORKSPACE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'text-subheading-04! -mb-6 cursor-pointer border-b-2 px-16 py-8 transition-colors duration-300',
              activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-8">
        {activeTab === 'projects' ? (
          <div className="text-body-md-400 text-gray-500">
            لیست پروژه‌ها به زودی...
          </div>
        ) : (
          <div className="text-body-md-400 text-gray-500">
            لیست اعضای میزکار به زودی...
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceTabs;
