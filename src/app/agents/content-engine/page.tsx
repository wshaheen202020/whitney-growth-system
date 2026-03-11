'use client';

import { useState } from 'react';
import { agents, contentCalendar } from '@/data/agents';
import {
  FileText,
  TrendingUp,
  Clock,
  Zap,
  BookOpen,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  FileStack,
  PieChart as PieChartIcon,
  Calendar,
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
} from 'recharts';

const contentEngine = agents[1];

// Content performance data
const contentPerformance = [
  { week: 'Week 1', articles: 2, avgWordCount: 2100, sessions: 450, ranking: 8 },
  { week: 'Week 2', articles: 3, avgWordCount: 2400, sessions: 620, ranking: 12 },
  { week: 'Week 3', articles: 3, avgWordCount: 2550, sessions: 890, ranking: 15 },
  { week: 'Week 4', articles: 2, avgWordCount: 2650, sessions: 1150, ranking: 18 },
];

// Article pipeline
const articlePipeline = [
  {
    title: 'Retirement Strategies for High Net Worth 2026',
    wordCount: 2800,
    status: 'in_progress',
    estimatedCompletion: '2026-03-12',
    cluster: 'Retirement Planning',
  },
  {
    title: 'How to Choose a Financial Advisor in Rochester',
    wordCount: 2400,
    status: 'pending',
    estimatedCompletion: '2026-03-14',
    cluster: 'Financial Planning',
  },
  {
    title: 'Tax Planning Guide 2025 ‚Üí 2026 Edition',
    wordCount: 3200,
    status: 'pending',
    estimatedCompletion: '2026-03-16',
    cluster: 'Tax Strategies',
  },
  {
    title: 'Roth Conversion Strategies for Retirees',
    wordCount: 2600,
    status: 'scheduled',
    estimatedCompletion: '2026-03-19',
    cluster: 'Tax Strategies',
  },
  {
    title: 'Estate Planning Checklist for High Net Worth',
    wordCount: 2500,
    status: 'scheduled',
    estimatedCompletion: '2026-03-25',
    cluster: 'Estate Planning',
  },
  {
    title: 'Social Security Optimization Strategies',
    wordCount: 2300,
    status: 'scheduled',
    estimatedCompletion: '2026-04-02',
    cluster: 'Retirement Planning',
  },
];

// Top performing articles
const topArticles = [
  {
    title: 'Investment Strategy for $2M+ Net Worth Individuals',
    traffic: 2345,
    avgPosition: 4.2,
    reads: 1200,
    shares: 89,
    conversions: 12,
  },
  {
    title: 'Fee-Only Financial Planning Benefits Explained',
    traffic: 1876,
    avgPosition: 6.1,
    reads: 987,
    shares: 65,
    conversions: 9,
  },
  {
    title: 'Tax Efficient Investing for High Income Earners',
    traffic: 1543,
    avgPosition: 7.3,
    reads: 832,
    shares: 54,
    conversions: 7,
  },
  {
    title: 'Wealth Management Rochester: Your Complete Guide',
    traffic: 1234,
    avgPosition: 5.8,
    reads: 654,
    shares: 42,
    conversions: 6,
  },
  {
    title: 'Concentrated Stock Position Management Guide',
    traffic: 987,
    avgPosition: 9.2,
    reads: 521,
    shares: 38,
    conversions: 5,
  },
];

// Topic clusters
const topicClusters = [
  { name: 'Retirement Planning', articles: 12, status: 'in_progress', coverage: 75 },
  { name: 'Tax Strategies', articles: 10, status: 'in_progress', coverage: 70 },
  { name: 'Estate Planning', articles: 8, status: 'pending', coverage: 50 },
  { name: 'Investment Strategy', articles: 9, status: 'in_progress', coverage: 80 },
  { name: 'Financial Planning', articles: 8, status: 'in_progress', coverage: 65 },
];

// Content generation queue
const contentQueue = [
  { title: 'Medicare Planning for High Net Worth Clients', priority: 'critical', type: 'Blog Article' },
  { title: 'Business Succession Planning Guide', priority: 'high', type: 'Pillar Page' },
  { title: 'Concentrated Stock Management FAQ', priority: 'high', type: 'FAQ Page' },
  { title: 'Trust Planning for Multi-Generational Wealth', priority: 'medium', type: 'Blog Article' },
  { title: 'Executive Compensation Planning', priority: 'medium', type: 'Blog Article' },
];

export default function ContentEnginePage() {
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const totalPlannedWords = articlePipeline.reduce((sum, article) => sum + article.wordCount, 0);
  const avgWordCount = Math.round(totalPlannedWords / articlePipeline.length);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-whitney-navy">Content Authority Engine</h2>
          <p className="text-gray-600 mt-1">
            Producing 2-3 authoritative long-form articles weekly targeting high-net-worth readers
          </p>
        </div>
        <div
          className="w-20 h-20 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: contentEngine.bgColor }}
        >
          <FileText size={40} style={{ color: contentEngine.color }} />
        </div>
      </div>

      {/* Agent Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {contentEngine.metrics.map((metric, idx) => (
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

      {/* Content Performance Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <TrendingUp size={20} />
          Content Performance - Last 4 Weeks
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={contentPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="sessions" stroke="#2563eb" strokeWidth={2} name="Organic Sessions" />
            <Line yAxisId="right" type="monotone" dataKey="ranking" stroke="#f59e0b" strokeWidth={2} name="Avg Position" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Content Calendar */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <Calendar size={20} />
          Content Calendar - Next 8 Weeks
        </h3>
        <div className="space-y-3">
          {contentCalendar.map((week, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-whitney-navy">{week.week}</h4>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    week.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800'
                      : week.status === 'scheduled'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {week.status.replace('_', ' ')}
                </span>
              </div>
              <ul className="space-y-2">
                {week.articles.map((article, articleIdx) => (
                  <li key={articleIdx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-whitney-gold mt-1.5 flex-shrink-0" />
                    {article}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Article Pipeline */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <FileStack size={20} />
            Article Pipeline ({articlePipeline.length} articles)
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {articlePipeline.map((article, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                onClick={() => setExpandedArticle(expandedArticle === idx ? null : idx)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">{article.title}</h4>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(article.status)}`}>
                        {article.status}
                      </span>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-semibold">
                        {article.wordCount} words
                      </span>
                      <span className="inline-block px-2 py-1 bg-whitney-blue/10 text-whitney-blue rounded text-xs font-semibold">
                        {article.cluster}
                      </span>
                    </div>
                    {expandedArticle === idx && (
                      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
                        <div>Est. Completion: {article.estimatedCompletion}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Total Words Planned:</span>
              <span className="font-semibold text-whitney-navy">{totalPlannedWords.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Avg Words per Article:</span>
              <span className="font-semibold text-whitney-navy">{avgWordCount}</span>
            </div>
          </div>
        </div>

        {/* Topic Cluster Visualization */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <PieChartIcon size={20} />
            Topic Cluster Status
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {topicClusters.map((cluster, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{cluster.name}</h4>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      cluster.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {cluster.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-whitney-blue h-2 rounded-full transition-all"
                    style={{ width: `${cluster.coverage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{cluster.articles} articles</span>
                  <span>{cluster.coverage}% coverage</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Generation Queue */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <Clock size={20} />
          Content Generation Queue
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Content Title</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Type</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contentQueue.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-medium text-gray-900">{item.title}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block px-2 py-1 bg-whitney-blue/10 text-whitney-blue rounded text-xs font-semibold">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performing Articles */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <BarChart3 size={20} />
          Top Performing Articles
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Article Title</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Traffic</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Avg Position</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Reads</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Conversions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topArticles.map((article, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-medium text-whitney-navy max-w-xs truncate">
                    {article.title}
                  </td>
                  <td className="px-4 py-4 text-center font-semibold text-blue-600">
                    {article.traffic.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-center font-semibold text-gray-700">{article.avgPosition}</td>
                  <td className="px-4 py-4 text-center font-semibold text-gray-700">
                    {article.reads.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-center font-semibold text-green-600">{article.conversions}</td>
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
            {contentEngine.weeklyGoals.map((goal, idx) => (
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
            {contentEngine.monthlyGoals.map((goal, idx) => (
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
