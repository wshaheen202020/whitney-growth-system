'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Activity,
  Zap,
} from 'lucide-react';
import { agents, contentCalendar } from '@/data/agents';

// Mock ranking trend data - showing positions improving over 12 weeks
const rankingTrendData = [
  { week: 'Week 1', 'Financial Advisor Rochester': 45, 'Wealth Management NY': 38, 'Financial Planning Rochester': 52, 'Investment Advisor': 41, 'Tax Planning Services': 28 },
  { week: 'Week 2', 'Financial Advisor Rochester': 42, 'Wealth Management NY': 35, 'Financial Planning Rochester': 49, 'Investment Advisor': 39, 'Tax Planning Services': 26 },
  { week: 'Week 3', 'Financial Advisor Rochester': 38, 'Wealth Management NY': 32, 'Financial Planning Rochester': 45, 'Investment Advisor': 36, 'Tax Planning Services': 23 },
  { week: 'Week 4', 'Financial Advisor Rochester': 35, 'Wealth Management NY': 29, 'Financial Planning Rochester': 41, 'Investment Advisor': 32, 'Tax Planning Services': 20 },
  { week: 'Week 5', 'Financial Advisor Rochester': 31, 'Wealth Management NY': 26, 'Financial Planning Rochester': 37, 'Investment Advisor': 28, 'Tax Planning Services': 17 },
  { week: 'Week 6', 'Financial Advisor Rochester': 27, 'Wealth Management NY': 23, 'Financial Planning Rochester': 33, 'Investment Advisor': 25, 'Tax Planning Services': 15 },
  { week: 'Week 7', 'Financial Advisor Rochester': 24, 'Wealth Management NY': 20, 'Financial Planning Rochester': 29, 'Investment Advisor': 22, 'Tax Planning Services': 12 },
  { week: 'Week 8', 'Financial Advisor Rochester': 20, 'Wealth Management NY': 18, 'Financial Planning Rochester': 25, 'Investment Advisor': 19, 'Tax Planning Services': 10 },
  { week: 'Week 9', 'Financial Advisor Rochester': 17, 'Wealth Management NY': 15, 'Financial Planning Rochester': 21, 'Investment Advisor': 16, 'Tax Planning Services': 8 },
  { week: 'Week 10', 'Financial Advisor Rochester': 14, 'Wealth Management NY': 12, 'Financial Planning Rochester': 17, 'Investment Advisor': 13, 'Tax Planning Services': 6 },
  { week: 'Week 11', 'Financial Advisor Rochester': 11, 'Wealth Management NY': 10, 'Financial Planning Rochester': 14, 'Investment Advisor': 10, 'Tax Planning Services': 5 },
  { week: 'Week 12', 'Financial Advisor Rochester': 8, 'Wealth Management NY': 7, 'Financial Planning Rochester': 11, 'Investment Advisor': 8, 'Tax Planning Services': 4 },
];

// KPI card component
function KPICard({
  title,
  value,
  change,
  icon: Icon,
  bgColor,
}: {
  title: string;
  value: string | number;
  change?: string;
  icon: any;
  bgColor: string;
}) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-whitney-navy mt-2">{value}</p>
          {change && (
            <p className="text-sm text-green-600 font-semibold mt-2">{change}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className="text-whitney-gold" size={24} />
        </div>
      </div>
    </div>
  );
}

// Agent status card component
function AgentStatusCard({ agent }: { agent: typeof agents[0] }) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    idle: 'bg-gray-100 text-gray-800',
  };

  const statusIcons = {
    active: <CheckCircle size={16} />,
    processing: <Zap size={16} />,
    idle: <AlertCircle size={16} />,
  };

  // Get primary metric
  const primaryMetric = agent.metrics[0];

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-whitney-navy">{agent.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{agent.role}</p>
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
            statusColors[agent.status]
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              agent.status === 'active'
                ? 'bg-green-500 agent-active'
                : agent.status === 'processing'
                  ? 'bg-yellow-500'
                  : 'bg-gray-400'
            }`}
          />
          {statusIcons[agent.status]}
          <span className="capitalize">{agent.status}</span>
        </div>
      </div>

      {/* Primary Metric */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{primaryMetric.label}</span>
          <div className="text-right">
            <p className="text-xl font-bold text-whitney-navy">
              {primaryMetric.value}
            </p>
            {primaryMetric.change && (
              <p className="text-xs text-green-600 font-semibold">
                {primaryMetric.change}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Current Task */}
      {agent.recentTasks[0] && (
        <div className="border-t pt-3">
          <p className="text-xs text-gray-500 font-semibold mb-2">Current Task</p>
          <p className="text-sm text-gray-700">{agent.recentTasks[0].title}</p>
          <div
            className={`text-xs font-semibold mt-2 inline-block px-2 py-1 rounded ${
              agent.recentTasks[0].status === 'in_progress'
                ? 'bg-blue-100 text-blue-800'
                : agent.recentTasks[0].status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
            }`}
          >
            {agent.recentTasks[0].status.replace('_', ' ').toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [expandedAgent, setExpandedAgent] = useState<number | null>(null);

  // Calculate active agents
  const activeAgents = agents.filter((a) => a.status === 'active').length;
  const processingAgents = agents.filter((a) => a.status === 'processing').length;

  // Calculate content pipeline totals
  const totalArticles = contentCalendar.reduce(
    (sum, week) => sum + week.articles.length,
    0
  );
  const inProgressArticles = contentCalendar
    .filter((week) => week.status === 'in_progress')
    .reduce((sum, week) => sum + week.articles.length, 0);

  return (
    <div className="space-y-8">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard
          title="Total Keywords"
          value="200"
          change="+12 this month"
          icon={TrendingUp}
          bgColor="bg-blue-100"
        />
        <KPICard
          title="Top 10 Rankings"
          value="18"
          change="+3 new"
          icon={TrendingUp}
          bgColor="bg-green-100"
        />
        <KPICard
          title="Articles Published"
          value="47"
          change="+3 this month"
          icon={TrendingUp}
          bgColor="bg-purple-100"
        />
        <KPICard
          title="Domain Authority"
          value="34"
          change="+2 points"
          icon={TrendingUp}
          bgColor="bg-orange-100"
        />
        <KPICard
          title="AI Mentions"
          value="12"
          change="+4 new"
          icon={Zap}
          bgColor="bg-indigo-100"
        />
        <KPICard
          title="Google Reviews"
          value="78"
          change="+5 new"
          icon={TrendingUp}
          bgColor="bg-red-100"
        />
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-green-600" size={24} />
            <h3 className="font-semibold text-whitney-navy">System Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Agents</span>
              <span className="font-bold text-whitney-navy">{activeAgents}/5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Processing</span>
              <span className="font-bold text-whitney-navy text-yellow-600">
                {processingAgents}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Idle</span>
              <span className="font-bold text-whitney-navy">
                {5 - activeAgents - processingAgents}
              </span>
            </div>
            <div className="pt-3 border-t">
              <p className="text-xs text-green-600 font-semibold">
                â All systems operational
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-whitney-gold" size={24} />
            <h3 className="font-semibold text-whitney-navy">Automation Cycle</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-2">Weekly Tasks</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-whitney-gold h-2 rounded-full"
                  style={{ width: '75%' }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">15/20 completed</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Monthly Goals</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-whitney-gold h-2 rounded-full"
                  style={{ width: '45%' }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">9/20 completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-blue-600" size={24} />
            <h3 className="font-semibold text-whitney-navy">Content Pipeline</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Articles</span>
              <span className="font-bold text-whitney-navy">{totalArticles}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">In Progress</span>
              <span className="font-bold text-blue-600">{inProgressArticles}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Scheduled</span>
              <span className="font-bold text-whitney-navy">
                {totalArticles - inProgressArticles}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ranking Trend Chart */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-whitney-navy mb-6">
          Keyword Ranking Trends (12 Weeks)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={rankingTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="week"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              reversed={true}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="Financial Advisor Rochester"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Wealth Management NY"
              stroke="#16a34a"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Financial Planning Rochester"
              stroke="#ea580c"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Investment Advisor"
              stroke="#9333ea"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Tax Planning Services"
              stroke="#dc2626"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-4">
          Note: Lower positions indicate better rankings (closer to position 1)
        </p>
      </div>

      {/* Agent Status Cards */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-whitney-navy">Agent Status</h2>
          <span className="text-sm text-gray-500">
            {activeAgents} Active â¢ {processingAgents} Processing
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <AgentStatusCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>

      {/* Content Calendar Preview */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-whitney-navy mb-6">
          Content Pipeline - Next 8 Weeks
        </h2>
        <div className="space-y-3">
          {contentCalendar.map((week, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="min-w-fit">
                <p className="font-semibold text-whitney-navy text-sm">
                  {week.week}
                </p>
                <p
                  className={`text-xs font-semibold mt-1 px-2 py-1 rounded inline-block ${
                    week.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800'
                      : week.status === 'scheduled'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {week.status.toUpperCase().replace('_', ' ')}
                </p>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {week.articles.map((article, i) => (
                    <span
                      key={i}
                      className="text-sm text-gray-700 bg-white border border-gray-300 rounded px-3 py-1 whitespace-nowrap"
                    >
                      {article}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-gradient-to-r from-whitney-navy to-whitney-blue rounded-lg p-6 text-white shadow-lg">
        <h2 className="text-lg font-bold mb-4">This Week's Priorities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-whitney-gold font-semibold mb-3">
              SEO Strategy Director
            </p>
            <ul className="text-sm space-y-2 text-gray-100">
              <li>â¢ Quarterly keyword gap analysis (In Progress)</li>
              <li>â¢ Site architecture optimization plan</li>
              <li>â¢ Internal linking audit</li>
            </ul>
          </div>
          <div>
            <p className="text-whitney-gold font-semibold mb-3">
              Content Authority Engine
            </p>
            <ul className="text-sm space-y-2 text-gray-100">
              <li>
                â¢ 'Retirement Strategies for HNW 2026' (In Progress)
              </li>
              <li>â¢ 'Financial Advisor in Rochester' guide</li>
              <li>â¢ Tax Planning Guide 2026 update</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
