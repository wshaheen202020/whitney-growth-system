'use client';

import { useState } from 'react';
import { agents } from '@/data/agents';
import {
  Zap,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Code,
  HelpCircle,
  FileStack,
  Target,
  BarChart3,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts';

const geoSearchAgent = agents[3];

// AI Platform Monitoring
const aiPlatforms = [
  {
    name: 'ChatGPT',
    mentions: 8,
    status: 'active',
    lastMention: '2026-03-09',
    trend: '+2',
    targetQueries: ['wealth management Rochester', 'financial advisor services'],
  },
  {
    name: 'Perplexity',
    mentions: 5,
    status: 'active',
    lastMention: '2026-03-08',
    trend: '+1',
    targetQueries: ['investment management', 'financial planning'],
  },
  {
    name: 'Gemini',
    mentions: 3,
    status: 'monitoring',
    lastMention: '2026-03-07',
    trend: '+1',
    targetQueries: ['wealth management strategies', 'financial advisor selection'],
  },
  {
    name: 'Voice Search',
    mentions: 2,
    status: 'monitoring',
    lastMention: '2026-03-05',
    trend: '+0',
    targetQueries: ['find wealth manager near me'],
  },
];

// Structured Data Implementation
const structuredDataStatus = [
  { type: 'Organization Schema', pages: 1, status: 'complete', dateAdded: '2026-02-15' },
  { type: 'LocalBusiness Schema', pages: 1, status: 'complete', dateAdded: '2026-02-20' },
  { type: 'FAQPage Schema', pages: 3, status: 'in_progress', dateAdded: '2026-03-01' },
  { type: 'BreadcrumbList Schema', pages: 8, status: 'in_progress', dateAdded: '2026-03-05' },
  { type: 'Service Schema', pages: 5, status: 'pending', dateAdded: null },
  { type: 'Article Schema', pages: 12, status: 'pending', dateAdded: null },
];

// FAQ Content Tracker
const faqTracker = [
  { title: 'Financial Advisor FAQ Hub', questions: 24, status: 'in_progress', completion: 85 },
  { title: 'Wealth Management FAQ', questions: 18, status: 'in_progress', completion: 70 },
  { title: 'Investment Strategy FAQ', questions: 15, status: 'pending', completion: 40 },
  { title: 'Tax Planning FAQ', questions: 20, status: 'pending', completion: 30 },
  { title: 'Retirement Planning FAQ', questions: 22, status: 'pending', completion: 25 },
];

// Question-Answer Library
const qaLibrary = [
  { question: 'What should I look for in a financial advisor?', answers: 3, engagement: 245 },
  { question: 'How much does wealth management cost?', answers: 2, engagement: 189 },
  { question: 'What is the difference between a fee-only advisor and commission-based?', answers: 4, engagement: 267 },
  { question: 'How can I optimize my portfolio for taxes?', answers: 3, engagement: 145 },
  { question: 'What is the best age to start financial planning?', answers: 2, engagement: 98 },
  { question: 'How should I invest $2 million?', answers: 2, engagement: 156 },
];

// AI Mention Trends
const mentionTrends = [
  { week: 'Week 1', chatgpt: 2, perplexity: 1, gemini: 0, voice: 0 },
  { week: 'Week 2', chatgpt: 3, perplexity: 1, gemini: 1, voice: 0 },
  { week: 'Week 3', chatgpt: 5, perplexity: 3, gemini: 1, voice: 1 },
  { week: 'Week 4', chatgpt: 8, perplexity: 5, gemini: 3, voice: 2 },
];

export default function GeoSearchPage() {
  const [expandedPlatform, setExpandedPlatform] = useState<number | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const completeStructuredData = structuredDataStatus.filter((s) => s.status === 'complete').length;
  const totalPages = structuredDataStatus.reduce((sum, s) => sum + s.pages, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
      case 'monitoring':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-whitney-navy">GEO / AI Search Agent</h2>
          <p className="text-gray-600 mt-1">
            Ensuring Whitney & Company appears in AI-generated answers across all major platforms
          </p>
        </div>
        <div
          className="w-20 h-20 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: geoSearchAgent.bgColor }}
        >
          <Zap size={40} style={{ color: geoSearchAgent.color }} />
        </div>
      </div>

      {/* Agent Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {geoSearchAgent.metrics.map((metric, idx) => (
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

      {/* AI Mention Trends Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <TrendingUp size={20} />
          AI Mention Trends - 4-Week Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mentionTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="chatgpt" stroke="#00d084" strokeWidth={2} name="ChatGPT" />
            <Line type="monotone" dataKey="perplexity" stroke="#2563eb" strokeWidth={2} name="Perplexity" />
            <Line type="monotone" dataKey="gemini" stroke="#f59e0b" strokeWidth={2} name="Gemini" />
            <Line type="monotone" dataKey="voice" stroke="#9333ea" strokeWidth={2} name="Voice" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Platform Monitoring */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <MessageSquare size={20} />
          AI Platform Monitoring
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiPlatforms.map((platform, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => setExpandedPlatform(expandedPlatform === idx ? null : idx)}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-whitney-navy">{platform.name}</h4>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(platform.status)}`}>
                  {platform.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-xs text-gray-600">Current Mentions</div>
                  <div className="text-2xl font-bold text-whitney-blue mt-1">{platform.mentions}</div>
                </div>
                <div className={`p-3 rounded ${platform.trend.startsWith('+') ? 'bg-green-50' : 'bg-gray-50'}`}>
                  <div className="text-xs text-gray-600">Trend</div>
                  <div className={`text-xl font-bold mt-1 ${platform.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {platform.trend}
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-600 mb-3">Last Mention: {platform.lastMention}</div>

              {expandedPlatform === idx && (
                <div className="pt-3 border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-700 mb-2">Target Queries:</div>
                  <ul className="space-y-1">
                    {platform.targetQueries.map((query, qIdx) => (
                      <li key={qIdx} className="text-xs text-gray-600 flex items-start gap-2">
                        <span className="mt-1">‚Ä¢</span>
                        {query}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Structured Data Implementation */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <Code size={20} />
            Structured Data Implementation
          </h3>
          <div className="space-y-3">
            {structuredDataStatus.map((schema, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{schema.type}</h4>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(schema.status)}`}>
                    {schema.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{schema.pages} pages</span>
                  {schema.dateAdded && (
                    <span className="text-xs text-gray-500">{schema.dateAdded}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Complete:</span>
              <span className="font-semibold text-whitney-navy">{completeStructuredData}/{structuredDataStatus.length}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-600">Total Pages:</span>
              <span className="font-semibold text-whitney-navy">{totalPages}</span>
            </div>
          </div>
        </div>

        {/* FAQ Content Tracker */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <HelpCircle size={20} />
            FAQ Content Tracker
          </h3>
          <div className="space-y-3">
            {faqTracker.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{faq.title}</h4>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(faq.status)}`}>
                    {faq.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-whitney-blue h-2 rounded-full transition-all"
                    style={{ width: `${faq.completion}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{faq.questions} questions</span>
                  <span>{faq.completion}% complete</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Question-Answer Library */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <FileStack size={20} />
          Question-Answer Content Library
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Question</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Answers</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {qaLibrary.map((qa, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-medium text-gray-900">{qa.question}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                      {qa.answers}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center font-semibold text-gray-700">{qa.engagement}</td>
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
            {geoSearchAgent.weeklyGoals.map((goal, idx) => (
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
            {geoSearchAgent.monthlyGoals.map((goal, idx) => (
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
