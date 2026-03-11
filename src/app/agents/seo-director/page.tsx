'use client';

import { useState } from 'react';
import { agents } from '@/data/agents';
import {
  Search,
  TrendingUp,
  Target,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
  BarChart3,
  MapPin,
  BookOpen,
  CheckSquare,
  Calendar,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const seoDirector = agents[0];

// Mock data for competitor analysis
const competitors = [
  { name: 'Manning & Napier', authority: 52, backlinks: 180, topKeywords: 24 },
  { name: 'Sage Rutty', authority: 48, backlinks: 145, topKeywords: 19 },
  { name: 'Buckingham Advisors', authority: 51, backlinks: 175, topKeywords: 22 },
  { name: 'Spectrem Group', authority: 46, backlinks: 130, topKeywords: 16 },
  { name: 'Vanguard Advisory', authority: 50, backlinks: 160, topKeywords: 21 },
];

// Mock keyword gap data
const keywordGapData = [
  { week: 'Week 1', dominated: 2, top3: 2, ranking: 8, inProgress: 15, notStarted: 173 },
  { week: 'Week 2', dominated: 3, top3: 3, ranking: 10, inProgress: 18, notStarted: 166 },
  { week: 'Week 3', dominated: 4, top3: 4, ranking: 12, inProgress: 22, notStarted: 158 },
  { week: 'Week 4', dominated: 5, top3: 5, ranking: 15, inProgress: 25, notStarted: 150 },
];

// Site architecture recommendations
const architectureRecs = [
  {
    title: 'Create Hub & Spoke Structure',
    description: 'Build a pillar page on "Wealth Management" with spokes to specific strategies',
    priority: 'critical',
    status: 'pending',
  },
  {
    title: 'Implement Topic Clusters',
    description: 'Link 15+ related articles to core pillar pages',
    priority: 'high',
    status: 'in_progress',
  },
  {
    title: 'Optimize URL Structure',
    description: 'Reorganize URLs for better semantic clarity and SEO',
    priority: 'high',
    status: 'pending',
  },
  {
    title: 'Add Breadcrumb Navigation',
    description: 'Implement breadcrumb schema for improved crawlability',
    priority: 'medium',
    status: 'pending',
  },
  {
    title: 'Create Service Hub Pages',
    description: 'Build gateway pages for each financial service',
    priority: 'high',
    status: 'in_progress',
  },
];

// Weekly tasks
const weeklyTasks = [
  { title: 'Update meta titles for 10 top service pages', completed: true },
  { title: 'Create new internal links from 5 articles', completed: true },
  { title: 'Audit competitor backlink profiles', completed: false },
  { title: 'Analyze top 10 ranking pages for on-page SEO', completed: false },
  { title: 'Submit 5 new pages for indexing', completed: true },
];

// Monthly tasks
const monthlyTasks = [
  { title: 'Complete full technical SEO audit', completed: false },
  { title: 'Publish competitor analysis report', completed: false },
  { title: 'Achieve 5 new Top 10 rankings', completed: false },
  { title: 'Redesign URL structure for suburb pages', completed: false },
  { title: 'Implement schema markup site-wide', completed: false },
];

// SEO Roadmap Timeline
const roadmapItems = [
  { month: 'March 2026', items: ['Competitor analysis complete', 'Site architecture audit', 'Content gap analysis'] },
  { month: 'April 2026', items: ['Implement hub & spoke structure', 'Create 3 pillar pages', 'Launch topic clusters'] },
  { month: 'May 2026', items: ['Start backlink outreach', 'Publish 10 new articles', 'Achieve 10+ top 10 rankings'] },
  { month: 'June 2026', items: ['Launch local SEO expansion', 'Complete 8 suburb pages', 'Reach 20+ top 10 rankings'] },
];

export default function SEODirectorPage() {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in_progress':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'scheduled':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-whitney-navy">SEO Strategy Director</h2>
          <p className="text-gray-600 mt-1">Lead strategist overseeing keyword research and ranking strategy</p>
        </div>
        <div
          className="w-20 h-20 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: seoDirector.bgColor }}
        >
          <Search size={40} style={{ color: seoDirector.color }} />
        </div>
      </div>

      {/* Agent Status and Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4">Agent Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Status</span>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                {seoDirector.status.charAt(0).toUpperCase() + seoDirector.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Role</span>
              <span className="text-sm font-medium text-whitney-navy">{seoDirector.role}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-700 font-medium">Description</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{seoDirector.description}</p>
          </div>
        </div>

        {/* Metrics Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4">Key Metrics</h3>
          <div className="space-y-3">
            {seoDirector.metrics.map((metric, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <span className="text-gray-700 text-sm">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-whitney-navy">{metric.value}</span>
                  {metric.change && (
                    <span className={`text-xs font-semibold ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keyword Gap Analysis Visualization */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <TrendingUp size={20} />
          Keyword Gap Analysis - 4-Week Progression
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={keywordGapData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="dominated" stroke="#16a34a" strokeWidth={2} />
            <Line type="monotone" dataKey="top3" stroke="#2563eb" strokeWidth={2} />
            <Line type="monotone" dataKey="ranking" stroke="#9333ea" strokeWidth={2} />
            <Line type="monotone" dataKey="inProgress" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Competitor Analysis */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <AlertCircle size={20} />
          Competitor Analysis - Rochester Market
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Competitor</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Domain Authority</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Backlinks</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Top 10 Keywords</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {competitors.map((comp, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-medium text-whitney-navy">{comp.name}</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-whitney-blue h-2 rounded-full"
                          style={{ width: `${(comp.authority / 60) * 100}%` }}
                        />
                      </div>
                      <span className="font-semibold text-whitney-navy">{comp.authority}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center font-semibold text-gray-700">{comp.backlinks}</td>
                  <td className="px-4 py-4 text-center font-semibold text-whitney-blue">{comp.topKeywords}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Site Architecture Recommendations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <BarChart3 size={20} />
          Site Architecture Recommendations
        </h3>
        <div className="space-y-3">
          {architectureRecs.map((rec, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => setExpandedTask(expandedTask === `arch-${idx}` ? null : `arch-${idx}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-whitney-navy">{rec.title}</h4>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(rec.priority)}`}>
                      {rec.priority}
                    </span>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        rec.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : rec.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {rec.status.replace('_', ' ')}
                    </span>
                  </div>
                  {expandedTask === `arch-${idx}` && (
                    <p className="text-gray-600 text-sm mt-2">{rec.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly and Monthly Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Tasks */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <Calendar size={20} />
            This Week's Tasks
          </h3>
          <div className="space-y-3">
            {weeklyTasks.map((task, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    task.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300'
                  }`}
                >
                  {task.completed && <CheckCircle2 size={16} className="text-white" />}
                </div>
                <span className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {task.title}
                </span>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-200 text-xs text-gray-600">
              {weeklyTasks.filter((t) => t.completed).length} of {weeklyTasks.length} completed
            </div>
          </div>
        </div>

        {/* Monthly Tasks */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <CheckSquare size={20} />
            March Monthly Goals
          </h3>
          <div className="space-y-3">
            {monthlyTasks.map((task, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    task.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300'
                  }`}
                >
                  {task.completed && <CheckCircle2 size={16} className="text-white" />}
                </div>
                <span className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {task.title}
                </span>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-200 text-xs text-gray-600">
              {monthlyTasks.filter((t) => t.completed).length} of {monthlyTasks.length} completed
            </div>
          </div>
        </div>
      </div>

      {/* SEO Roadmap */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <Zap size={20} />
          SEO Roadmap - Next 4 Months
        </h3>
        <div className="space-y-6">
          {roadmapItems.map((roadmap, idx) => (
            <div key={idx} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
              <h4 className="font-semibold text-whitney-blue mb-3">{roadmap.month}</h4>
              <ul className="space-y-2">
                {roadmap.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-whitney-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
