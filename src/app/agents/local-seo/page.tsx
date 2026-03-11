'use client';

import { useState } from 'react';
import { agents } from '@/data/agents';
import {
  MapPin,
  CheckCircle2,
  Clock,
  Star,
  TrendingUp,
  AlertCircle,
  Globe,
  Users,
  Target,
  FileCheck,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const localSeoAgent = agents[2];

// GBP Optimization Checklist
const gbpChecklist = [
  { item: 'Verify/Claim Business Profile', completed: true },
  { item: 'Complete Business Information', completed: true },
  { item: 'Add High-Quality Photos', completed: true },
  { item: 'Write Compelling Business Description', completed: true },
  { item: 'Add Service Areas', completed: false },
  { item: 'Setup Google Posts Schedule', completed: true },
  { item: 'Enable Q&A Responses', completed: true },
  { item: 'Add Products & Services', completed: false },
  { item: 'Link GMB to Website', completed: true },
  { item: 'Setup Review Response System', completed: true },
];

// Suburb Landing Pages
const suburbPages = [
  { suburb: 'Rochester', status: 'completed', lastUpdated: '2026-03-08', traffic: 234, conversions: 8 },
  { suburb: 'Pittsford', status: 'in_progress', lastUpdated: '2026-03-09', traffic: 45, conversions: 2 },
  { suburb: 'Brighton', status: 'pending', lastUpdated: null, traffic: 0, conversions: 0 },
  { suburb: 'Penfield', status: 'pending', lastUpdated: null, traffic: 0, conversions: 0 },
  { suburb: 'Victor', status: 'pending', lastUpdated: null, traffic: 0, conversions: 0 },
  { suburb: 'Webster', status: 'pending', lastUpdated: null, traffic: 0, conversions: 0 },
  { suburb: 'Fairport', status: 'pending', lastUpdated: null, traffic: 0, conversions: 0 },
  { suburb: 'Canandaigua', status: 'pending', lastUpdated: null, traffic: 0, conversions: 0 },
  { suburb: 'Irondequoit', status: 'pending', lastUpdated: null, traffic: 0, conversions: 0 },
];

// Review Acquisition Progress
const reviewProgress = [
  { week: 'Week 1', target: 70, current: 62, acquired: 8 },
  { week: 'Week 2', target: 75, current: 68, acquired: 6 },
  { week: 'Week 3', target: 80, current: 74, acquired: 6 },
  { week: 'Week 4', target: 85, current: 78, acquired: 4 },
];

// NAP Consistency
const napStatus = [
  { directory: 'Google My Business', consistent: true, lastChecked: '2026-03-10' },
  { directory: 'Apple Maps', consistent: true, lastChecked: '2026-03-10' },
  { directory: 'Yelp', consistent: false, lastChecked: '2026-03-08' },
  { directory: 'Better Business Bureau', consistent: true, lastChecked: '2026-03-09' },
  { directory: 'Chambers Directory', consistent: true, lastChecked: '2026-03-07' },
  { directory: 'Local.com', consistent: false, lastChecked: '2026-03-06' },
  { directory: 'ZoomInfo', consistent: true, lastChecked: '2026-03-10' },
  { directory: 'Dun & Bradstreet', consistent: true, lastChecked: '2026-03-05' },
];

// Local Citations
const citationData = [
  { source: 'Financial Service Directories', count: 12, quality: 'High' },
  { source: 'Local Business Directories', count: 18, quality: 'High' },
  { source: 'Industry Directories', count: 8, quality: 'Very High' },
  { source: 'General Business Listings', count: 4, quality: 'Medium' },
];

// Map Pack Rankings
const mapPackRankings = [
  { keyword: 'Financial Advisor Rochester NY', position: 2, status: 'top_3', traffic: 189 },
  { keyword: 'Wealth Management Rochester', position: 1, status: 'dominated', traffic: 256 },
  { keyword: 'Financial Planner Pittsford NY', position: 4, status: 'ranking', traffic: 67 },
  { keyword: 'Investment Advisor Rochester', position: 3, status: 'top_3', traffic: 145 },
  { keyword: 'Fee Only Financial Advisor', position: 6, status: 'ranking', traffic: 89 },
  { keyword: 'Wealth Management Penfield', status: 'not_started', traffic: 0 },
];

export default function LocalSEOPage() {
  const [expandedSuburb, setExpandedSuburb] = useState<number | null>(null);

  const completedGBP = gbpChecklist.filter((c) => c.completed).length;
  const completedSuburbs = suburbPages.filter((s) => s.status === 'completed').length;
  const inProgressSuburbs = suburbPages.filter((s) => s.status === 'in_progress').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'dominated':
        return 'bg-green-100 text-green-800';
      case 'top_3':
        return 'bg-blue-100 text-blue-800';
      case 'ranking':
        return 'bg-purple-100 text-purple-800';
      case 'not_started':
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
          <h2 className="text-3xl font-bold text-whitney-navy">Local SEO & Maps Agent</h2>
          <p className="text-gray-600 mt-1">
            Dominating Google Maps and local search across Rochester and affluent suburbs
          </p>
        </div>
        <div
          className="w-20 h-20 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: localSeoAgent.bgColor }}
        >
          <MapPin size={40} style={{ color: localSeoAgent.color }} />
        </div>
      </div>

      {/* Agent Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {localSeoAgent.metrics.map((metric, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600 font-medium">{metric.label}</div>
            <div className="text-2xl font-bold text-whitney-navy mt-2">{metric.value}</div>
            {metric.change && (
              <div className={`text-xs mt-1 font-semibold ${metric.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GBP Optimization Checklist */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <FileCheck size={20} />
            GBP Optimization
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {gbpChecklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    item.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300'
                  }`}
                >
                  {item.completed && <CheckCircle2 size={16} className="text-white" />}
                </div>
                <span className={`text-sm ${item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {item.item}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${(completedGBP / gbpChecklist.length) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-600 mt-2">
              {completedGBP} of {gbpChecklist.length} completed
            </div>
          </div>
        </div>

        {/* Review Acquisition Progress */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <Star size={20} />
            Review Acquisition Progress
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={reviewProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="target" fill="#c9a84c" name="Target" />
              <Bar dataKey="current" fill="#1e3a5f" name="Current" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="text-sm text-gray-600">Current Reviews</div>
              <div className="text-3xl font-bold text-whitney-navy mt-1">78</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-sm text-gray-600">Target</div>
              <div className="text-3xl font-bold text-green-600 mt-1">100+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Suburb Landing Page Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <MapPin size={20} />
          Suburb Landing Pages ({completedSuburbs}/{suburbPages.length} Completed)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suburbPages.map((suburb, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => setExpandedSuburb(expandedSuburb === idx ? null : idx)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{suburb.suburb}</h4>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(suburb.status)}`}>
                  {suburb.status}
                </span>
              </div>
              {expandedSuburb === idx && suburb.status === 'completed' && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-semibold text-gray-900">{suburb.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Traffic:</span>
                    <span className="font-semibold text-blue-600">{suburb.traffic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conversions:</span>
                    <span className="font-semibold text-green-600">{suburb.conversions}</span>
                  </div>
                </div>
              )}
              {expandedSuburb === idx && suburb.status === 'in_progress' && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-semibold text-gray-900">{suburb.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Est. Completion:</span>
                    <span className="font-semibold text-gray-900">This week</span>
                  </div>
                </div>
              )}
              {suburb.status === 'completed' && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full w-full" />
                  </div>
                  <div className="text-xs text-gray-600 mt-2">100% Complete</div>
                </div>
              )}
              {suburb.status === 'in_progress' && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full w-3/4" />
                  </div>
                  <div className="text-xs text-gray-600 mt-2">75% Complete</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NAP Consistency Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <Globe size={20} />
            NAP Consistency Status
          </h3>
          <div className="space-y-3">
            {napStatus.map((nap, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition border border-gray-100">
                <div className="flex items-center gap-3">
                  {nap.consistent ? (
                    <CheckCircle2 size={18} className="text-green-600" />
                  ) : (
                    <AlertCircle size={18} className="text-yellow-600" />
                  )}
                  <span className="font-medium text-gray-900 text-sm">{nap.directory}</span>
                </div>
                <span className="text-xs text-gray-500">{nap.lastChecked}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Local Citations */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <Users size={20} />
            Local Citation Tracker
          </h3>
          <div className="space-y-4">
            {citationData.map((citation, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{citation.source}</h4>
                  <span className="text-sm font-bold text-whitney-blue">{citation.count}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Quality</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      citation.quality === 'Very High'
                        ? 'bg-green-100 text-green-800'
                        : citation.quality === 'High'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {citation.quality}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-whitney-navy">Total Citations: </span>
              {citationData.reduce((sum, c) => sum + c.count, 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Map Pack Rankings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <Target size={20} />
          Map Pack Rankings
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Keyword</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Position</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Monthly Traffic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mapPackRankings.map((ranking, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-medium text-gray-900">{ranking.keyword}</td>
                  <td className="px-4 py-4 text-center font-semibold text-whitney-blue">
                    {ranking.position ? `#${ranking.position}` : '‚Äî'}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(ranking.status)}`}>
                      {ranking.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center font-semibold text-gray-700">{ranking.traffic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly and Monthly Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4">Weekly Goals</h3>
          <ul className="space-y-2">
            {localSeoAgent.weeklyGoals.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                <CheckCircle2 size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                {goal}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4">Monthly Goals</h3>
          <ul className="space-y-2">
            {localSeoAgent.monthlyGoals.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                <CheckCircle2 size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                {goal}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
