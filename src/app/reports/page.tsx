'use client';

import { useState } from 'react';
import {
  FileBarChart,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Users,
  MessageCircle,
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
  FunnelChart,
  Funnel,
  Cell,
} from 'recharts';

// Monthly performance data
const monthlyPerformance = {
  march: {
    organicSessions: 3250,
    organic_change: '+18%',
    keywords_top_10: 25,
    keywords_change: '+3',
    domain_authority: 34,
    da_change: '+2',
    backlinks: 156,
    backlinks_change: '+8',
  },
  february: {
    organicSessions: 2750,
    keywords_top_10: 22,
    domain_authority: 32,
    backlinks: 148,
  },
};

// Ranking trends
const rankingTrends = [
  { week: 'Mar 1-7', top10: 18, top3: 4, position1: 1 },
  { week: 'Mar 8-14', top10: 20, top3: 4, position1: 2 },
  { week: 'Mar 15-21', top10: 22, top3: 5, position1: 2 },
  { week: 'Mar 22-28', top10: 25, top3: 5, position1: 2 },
];

// Traffic trends
const trafficTrends = [
  { week: 'Mar 1-7', organic: 620, direct: 280, referral: 145 },
  { week: 'Mar 8-14', organic: 780, direct: 310, referral: 165 },
  { week: 'Mar 15-21', organic: 950, direct: 340, referral: 185 },
  { week: 'Mar 22-28', organic: 1200, direct: 380, referral: 210 },
];

// AI mention trends
const aiMentionTrends = [
  { week: 'Week 1', mentions: 2 },
  { week: 'Week 2', mentions: 4 },
  { week: 'Week 3', mentions: 8 },
  { week: 'Week 4', mentions: 12 },
];

// Lead conversion funnel
const conversionFunnel = [
  { name: 'Website Visitors', value: 3250 },
  { name: 'Service Page Views', value: 1840 },
  { name: 'Contact Form Clicks', value: 450 },
  { name: 'Contact Form Submissions', value: 125 },
  { name: 'Lead Follow-ups', value: 95 },
  { name: 'Qualified Leads', value: 28 },
];

// Key achievements this month
const achievements = [
  { title: '3 New Top 10 Rankings', description: 'Added 3 keywords to top 10 positions', impact: 'High' },
  { title: '1 New Dominated Keyword', description: 'Wealth Management Rochester now #1', impact: 'Critical' },
  { title: '18% Traffic Increase', description: 'Organic sessions up from 2.75K to 3.25K', impact: 'High' },
  { title: '8 New Backlinks', description: 'From high-authority financial publications', impact: 'Medium' },
  { title: '2 DA Points Gained', description: 'Domain Authority increased to 34', impact: 'Medium' },
];

const FUNNEL_COLORS = ['#0a1628', '#1e3a5f', '#2563eb', '#3b82f6', '#60a5fa', '#c9a84c'];

export default function ReportsPage() {
  const [reportPeriod, setReportPeriod] = useState('march');

  const data = monthlyPerformance[reportPeriod as keyof typeof monthlyPerformance];

  const renderFunnelShape = () => {
    return conversionFunnel.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]} />
    ));
  };

  const conversionRate = ((conversionFunnel[5].value / conversionFunnel[0].value) * 100).toFixed(2);
  const formSubmissionRate = ((conversionFunnel[4].value / conversionFunnel[3].value) * 100).toFixed(2);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-whitney-navy">Performance Reports</h2>
          <p className="text-gray-600 mt-1">Monthly analytics and growth metrics for Whitney & Company</p>
        </div>
        <FileBarChart size={40} className="text-whitney-gold" />
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
        <Calendar size={20} className="text-whitney-navy" />
        <select
          value={reportPeriod}
          onChange={(e) => setReportPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whitney-blue focus:border-transparent font-medium"
        >
          <option value="march">March 2026 Report</option>
          <option value="february">February 2026 Report</option>
        </select>
        <button className="ml-auto px-4 py-2 bg-whitney-blue text-white rounded-lg hover:bg-whitney-navy transition font-medium flex items-center gap-2">
          <Download size={18} />
          Download Report
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Organic Sessions</p>
              <p className="text-3xl font-bold text-whitney-navy mt-2">{data.organicSessions.toLocaleString()}</p>
              <p className={`text-xs mt-2 font-semibold ${data.organic_change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {data.organic_change} vs last month
              </p>
            </div>
            <TrendingUp className="text-blue-600" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Top 10 Rankings</p>
              <p className="text-3xl font-bold text-whitney-navy mt-2">{data.keywords_top_10}</p>
              <p className={`text-xs mt-2 font-semibold ${data.keywords_change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {data.keywords_change} vs last month
              </p>
            </div>
            <Target className="text-green-600" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Domain Authority</p>
              <p className="text-3xl font-bold text-whitney-navy mt-2">{data.domain_authority}</p>
              <p className={`text-xs mt-2 font-semibold ${data.da_change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {data.da_change} vs last month
              </p>
            </div>
            <BarChart3 className="text-purple-600" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Backlinks</p>
              <p className="text-3xl font-bold text-whitney-navy mt-2">{data.backlinks}</p>
              <p className={`text-xs mt-2 font-semibold ${data.backlinks_change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {data.backlinks_change} vs last month
              </p>
            </div>
            <TrendingUp className="text-amber-600" size={40} />
          </div>
        </div>
      </div>

      {/* Ranking Trends */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <TrendingUp size={20} />
          Ranking Trends - March 2026
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={rankingTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="top10" stroke="#16a34a" strokeWidth={2} name="Top 10" />
            <Line type="monotone" dataKey="top3" stroke="#2563eb" strokeWidth={2} name="Top 3" />
            <Line type="monotone" dataKey="position1" stroke="#c9a84c" strokeWidth={2} name="Position #1" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Traffic Trends */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <Users size={20} />
          Traffic Trends - March 2026
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trafficTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="organic" fill="#1e3a5f" name="Organic" />
            <Bar dataKey="direct" fill="#2563eb" name="Direct" />
            <Bar dataKey="referral" fill="#c9a84c" name="Referral" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AI Mention Trends */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <MessageCircle size={20} />
          AI Mention Trends - March 2026
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={aiMentionTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="mentions" fill="#9333ea" name="AI Mentions" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Conversion Funnel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <Target size={20} />
            Lead Conversion Funnel - March 2026
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart>
              <Tooltip />
              <Funnel
                dataKey="value"
                data={conversionFunnel}
                isAnimationActive
              >
                {renderFunnelShape()}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Conversion Rate</div>
              <div className="text-2xl font-bold text-whitney-navy mt-1">{conversionRate}%</div>
            </div>
            <div>
              <div className="text-gray-600">Form Submission Rate</div>
              <div className="text-2xl font-bold text-whitney-blue mt-1">{formSubmissionRate}%</div>
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4">Key Achievements - March 2026</h3>
          <div className="space-y-3">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className={`border-l-4 pl-4 py-3 rounded-r-lg ${
                  achievement.impact === 'Critical'
                    ? 'border-red-500 bg-red-50'
                    : achievement.impact === 'High'
                    ? 'border-green-500 bg-green-50'
                    : 'border-blue-500 bg-blue-50'
                }`}
              >
                <h4 className="font-semibold text-gray-900 text-sm">{achievement.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison vs Previous Month */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4">Month-over-Month Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-whitney-navy text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Metric</th>
                <th className="px-4 py-3 text-center font-semibold">February 2026</th>
                <th className="px-4 py-3 text-center font-semibold">March 2026</th>
                <th className="px-4 py-3 text-center font-semibold">Change</th>
                <th className="px-4 py-3 text-center font-semibold">% Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition">
                <td className="px-4 py-4 font-medium text-gray-900">Organic Sessions</td>
                <td className="px-4 py-4 text-center text-gray-700">2,750</td>
                <td className="px-4 py-4 text-center text-gray-700">3,250</td>
                <td className="px-4 py-4 text-center font-semibold text-green-600">+500</td>
                <td className="px-4 py-4 text-center font-semibold text-green-600">+18.2%</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="px-4 py-4 font-medium text-gray-900">Top 10 Keywords</td>
                <td className="px-4 py-4 text-center text-gray-700">22</td>
                <td className="px-4 py-4 text-center text-gray-700">25</td>
                <td className="px-4 py-4 text-center font-semibold text-green-600">+3</td>
                <td className="px-4 py-4 text-center font-semibold text-green-600">+13.6%</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="px-4 py-4 font-medium text-gray-900">Domain Authority</td>
                <td className="px-4 py-4 text-center text-gray-700">32</td>
                <td className="px-4 py-4 text-center text-gray-700">34</td>
                <td className="px-4 py-4 text-center font-semibold text-green-600">+2</td>
                <td className="px-4 py-4 text-center font-semibold text-green-600">+6.3%</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="px-4 py-4 font-medium text-gray-900">Total Backlinks</td>
                <td className="px-4 py-4 text-center text-gray-700">148</td>
                <td className="px-4 py-4 text-center text-gray-700">156</td>
                <td className="px-4 py-4 text-center font-semibold text-green-600">+8</td>
                <td className="px-4 py-4 text-center font-semibold text-green-600">+5.4%</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="px-4 py-4 font-medium text-gray-900">Qualified Leads</td>
                <td className="px-4 py-4 text-center text-gray-700">18</td>
                <td className="px-4 py-4 text-center text-gray-700">28</td>
                <td className="px-4 py-4 text-center font-semibold text-green-600">+10</td>
                <td className="px-4 py-4 text-center font-semibold text-green-600">+55.6%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Next Month Objectives */}
      <div className="bg-whitney-blue/5 rounded-lg border border-whitney-blue p-6">
        <h3 className="font-semibold text-whitney-navy mb-4">April 2026 Objectives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">SEO Goals</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1">â¢</span>
                Achieve 30 Top 10 keyword rankings
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">â¢</span>
                Launch 3 new suburb landing pages
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">â¢</span>
                Increase DA to 36 points
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Content Goals</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1">â¢</span>
                Publish 12 new long-form articles
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">â¢</span>
                Create 2 new pillar pages
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">â¢</span>
                Reach 4,000+ organic sessions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
