'use client';

import './globals.css';
import { useState } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Search,
  FileText,
  MapPin,
  Zap,
  Link as LinkIcon,
  KeySquare,
  FileBarChart,
  Settings,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'seo', label: 'SEO Strategy', icon: Search },
    { id: 'content', label: 'Content Engine', icon: FileText },
    { id: 'local', label: 'Local SEO', icon: MapPin },
    { id: 'ai', label: 'GEO/AI Search', icon: Zap },
    { id: 'authority', label: 'Authority & Links', icon: LinkIcon },
    { id: 'keywords', label: 'Keywords', icon: KeySquare },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <html lang="en">
      <head>
        <title>Whitney & Company - Growth Command Center</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-50">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`bg-whitney-navy text-white transition-all duration-300 flex flex-col ${
              sidebarOpen ? 'w-64' : 'w-20'
            }`}
          >
            {/* Logo Section */}
            <div className="p-6 border-b border-whitney-blue flex items-center justify-between">
              {sidebarOpen && (
                <div className="flex-1">
                  <div className="text-whitney-gold font-bold text-sm leading-tight">
                    W&C
                  </div>
                  <div className="text-xs text-gray-300 mt-1">
                    Growth Command Center
                  </div>
                </div>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1 hover:bg-whitney-blue rounded transition-colors"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-whitney-blue text-whitney-gold'
                        : 'text-gray-300 hover:bg-whitney-blue/50'
                    }`}
                    title={!sidebarOpen ? item.label : ''}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    {sidebarOpen && (
                      <>
                        <span className="flex-1 text-left text-sm font-medium">
                          {item.label}
                        </span>
                        {/* Active Status Indicator */}
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isActive
                              ? 'bg-green-400 agent-active'
                              : 'bg-gray-500'
                          }`}
                        />
                      </>
                    )}
                    {!sidebarOpen && isActive && (
                      <div className="absolute right-2 w-2 h-2 rounded-full bg-green-400 agent-active" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Footer Section */}
            <div className="p-4 border-t border-whitney-blue">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-400 agent-active" />
                {sidebarOpen && <span>System Active</span>}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto">
            {/* Top Header */}
            <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
              <div className="px-8 py-4 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-whitney-navy">
                    Growth Command Center
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Whitney & Company Digital Growth Dashboard
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-whitney-navy">
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Status: All Systems Active</p>
                </div>
              </div>
            </div>

            {/* Page Content */}
            <div className="p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
