import React from 'react';
import clsx from 'clsx';
import { Settings, Activity } from 'lucide-react';
import { useRefunds } from '../../context/RefundContext';

export default function TopTabs({ activeTab, onTabChange }) {
    const { data } = useRefunds();
    const tabs = [
        { id: 'config', label: 'Policy' },
        { id: 'activity', label: 'Refund Activity' },
    ];

    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-sm">
            {/* Tab Switcher */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={clsx(
                                "py-1.5 px-3 rounded-md text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                                isActive
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-gray-900">{data.currentUser.name}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">{data.currentUser.role}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-xs font-bold text-primary">
                    {data.currentUser.initials}
                </div>
            </div>
        </div>
    );
}
