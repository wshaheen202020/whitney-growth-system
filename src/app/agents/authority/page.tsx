'use client';

import { useState } from 'react';
import { agents } from '@/data/agents';
import {
  Link as LinkIcon,
  CheckCircle2,
  TrendingUp,
  Target,
  FileText,
  Globe,
  Users,
  AlertCircle,
  BarChart3,
  ArrowUpRight,
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

const authorityAgent = agents[4];

// Backlink Profile Data
const backlinkTrend = [
  { month: 'Jan', total: 130, referringDomains: 58, organic: 320 },
  { month: 'Feb', total: 142, referringDomains: 62, organic: 480 },
  { month: 'Mar', total: 156, referringDomains: 67, organic: 720 },
];

// Directory Submission Tracker
const directorySubmissions = [
  { directory: 'Better Business Bureau', status: 'verified', submittedDate: '2026-01-15', authority: 'High' },
  { directory: 'Chamber of Commerce', status: 'verified', submittedDate: '2026-01-18', authority: 'High' },
  { directory: 'Yelp Business', status: 'verified', submittedDate: '2026-01-22', authority: 'High' },
  { directory: 'ZoomInfo', status: 'verified', submittedDate: '2026-02-01', authority: 'Medium' },
  { directory: 'Dun & Bradstreet', status: 'verified', submittedDate: '2026-02-05', authority: 'High' },
  { directory: 'Crunchbase', status: 'verified', submittedDate: '2026-02-10', authority: 'Medium' },
  { directory: 'Apollo.io', status: 'verified', submittedDate: '2026-02-15', authority: 'Medium' },
  { directory: 'Hunter.io', status: 'in_progress', submittedDate: '2026-03-01', authority: 'Medium' },
  { directory: 'Local.com', status: 'pending', submittedDate: null, authority: 'Medium' },
  { directory: 'InfoUSA', status: 'pending', submittedDate: null, authority: 'Medium' },
  { directory: 'Acxiom', status: 'pending', submittedDate: null, authority: 'Low' },
  { directory: 'GumTree', status: 'pending', submittedDate: null, authority: 'Low' },
];

// Outreach Pipeline
const outreachPipeline = [
  {
    prospect: 'Financial Industry Forum',
    type: 'Guest Post',
    authority: 45,
    status: 'outreach',
    estimatedLink: 'High',
  },
  {
    prospect: 'Wealth Management Magazine',
    type: 'Feature Article',
    authority: 52,
    status: 'negotiation',
    estimatedLink: 'Very High',
  },
  {
    prospect: 'Investment Strategy Blog',
    type: 'Resource Link',
    authority: 38,
    status: 'pitch_sent',
    estimatedLink: 'Medium',
  },
  {
    prospect: 'Financial News Daily',
    type: 'Expert Quote',
    authority: 48,
    status: 'outreach',
    estimatedLink: 'High',
  },
  {
    prospect: 'Portfolio Management Resource',
    type: 'Guide Link',
    authority: 42,
    status: 'outreach',
    estimatedLink: 'Medium',
  },
];

// Target Publications
const targetPublications = [
  {
    publication: 'Rochester Business Journal',
    category: 'Local Business',
    authority: 38,
    frequency: 'Weekly',
    contact: 'editorial@rbj.net',
    status: 'active',
  },
  {
    publication: 'Democrat & Chronicle',
    category: 'Major Publication',
    authority: 52,
    frequency: 'Daily',
    contact: 'business@rochesterchannel.com',
    status: 'contacted',
  },
  {
    publication: 'NAPFA (National Association)',
    category: 'Industry Directory',
    authority: 68,
    frequency: 'Ongoing',
    contact: 'member@napfa.org',
    status: 'listed',
  },
  {
    publication: 'Fee-Only Network',
    category: 'Industry Directory',
    authority: 42,
    frequency: 'Ongoing',
    contact: 'members@feeonly.org',
    status: 'listed',
  },
  {
    publication: 'SmartAsset',
    category: 'Financial Platform',
    authority: 58,
    frequency: 'Ongoing',
    contact: 'advisors@smartasset.com',
    status: 'listed',
  },
];

// Domain Authority Metrics
const daMetrics = [
  { label: 'Current Domain Authority', value: 34, change: '+2' },
  { label: 'Referring Domains', value: 67, change: '+4' },
  { label: 'Backlinks (Total)', value: 156, change: '+8' },
  { label: 'Trust Flow', value: 28, change: '+1' },
];

export default function AuthorityPage() {
  const [expandedPublication, setExpandedPublication] = useState<number | null>(null);

  const verifiedCount = directorySubmissions.filter((d) => d.status === 'verified').length;
  const pendingCount = directorySubmissions.filter((d) => d.status === 'pending').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'active':
      case 'listed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
      case 'negotiation':
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      case 'outreach':
      case 'pitch_sent':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAuthorityColor = (authority: string | number) => {
    if (typeof authority === 'string') {
      switch (authority) {
        case 'Very High':
          return 'bg-green-100 text-green-800';
        case 'High':
          return 'bg-blue-100 text-blue-800';
        case 'Medium':
          return 'bg-yellow-100 text-yellow-800';
        case 'Low':
          return 'bg-gray-100 text-gray-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
    if (authority >= 50) return 'text-green-600';
    if (authority >= 40) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-whitney-navy">Authority & Backlink Agent</h2>
          <p className="text-gray-600 mt-1">
            Building credibility through strategic backlinks, media mentions, and professional partnerships
          </p>
        </div>
        <div
          className="w-20 h-20 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: authorityAgent.bgColor }}
        >
          <LinkIcon size={40} style={{ color: authorityAgent.color }} />
        </div>
      </div>

      {/* Agent Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {authorityAgent.metrics.map((metric, idx) => (
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

      {/* Backlink Profile Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <LinkIcon size={20} />
          Backlink Profile Growth - 3-Month Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={backlinkTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="total"
              stroke="#dc2626"
              strokeWidth={2}
              name="Total Backlinks"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="referringDomains"
              stroke="#2563eb"
              strokeWidth={2}
              name="Referring Domains"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="organic"
              stroke="#16a34a"
              strokeWidth={2}
              name="Organic Sessions"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Directory Submission Tracker */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <Globe size={20} />
            Directory Submission Tracker ({verifiedCount}/{directorySubmissions.length} Verified)
          </h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {directorySubmissions.map((dir, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition border border-gray-100">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{dir.directory}</h4>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                        dir.authority === 'High'
                          ? 'bg-green-100 text-green-800'
                          : dir.authority === 'Medium'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {dir.authority}
                    </span>
                  </div>
                  {dir.submittedDate && (
                    <div className="text-xs text-gray-500 mt-1">{dir.submittedDate}</div>
                  )}
                </div>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(dir.status)}`}>
                  {dir.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-gray-600">Verified</div>
              <div className="text-2xl font-bold text-green-600">{verifiedCount}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Pending</div>
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            </div>
          </div>
        </div>

        {/* Outreach Pipeline */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <Users size={20} />
            Outreach Pipeline
          </h3>
          <div className="space-y-3">
            {outreachPipeline.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{item.prospect}</h4>
                    <p className="text-xs text-gray-600 mt-1">{item.type}</p>
                  </div>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(item.status)}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">DA:</span>
                    <span className={`font-semibold ${getAuthorityColor(item.authority)}`}>{item.authority}</span>
                  </div>
                  <span className="inline-block px-2 py-1 bg-whitney-blue/10 text-whitney-blue rounded text-xs font-semibold">
                    {item.estimatedLink}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Target Publications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
          <FileText size={20} />
          Target Publications & Directories
        </h3>
        <div className="space-y-3">
          {targetPublications.map((pub, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => setExpandedPublication(expandedPublication === idx ? null : idx)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{pub.publication}</h4>
                  <p className="text-xs text-gray-600 mt-1">{pub.category}</p>
                </div>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(pub.status)}`}>
                  {pub.status}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div>
                  <span className="text-xs text-gray-600">Authority</span>
                  <div className={`text-sm font-bold ${getAuthorityColor(pub.authority)}`}>{pub.authority}</div>
                </div>
                <div>
                  <span className="text-xs text-gray-600">Frequency</span>
                  <div className="text-sm font-semibold text-gray-900">{pub.frequency}</div>
                </div>
              </div>

              {expandedPublication === idx && (
                <div className="pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-600 mb-1">Contact</div>
                  <div className="text-xs font-semibold text-whitney-blue break-all">{pub.contact}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Domain Authority Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            Domain Authority Trend
          </h3>
          <div className="space-y-4">
            {daMetrics.map((metric, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                  <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                    <ArrowUpRight size={14} />
                    {metric.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-whitney-navy">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-whitney-navy mb-4">Next 30 Days Objectives</h3>
          <ul className="space-y-2">
            {authorityAgent.monthlyGoals.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                <CheckCircle2 size={18} className="text-whitney-gold flex-shrink-0 mt-0.5" />
                {goal}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-whitney-navy mb-4">Weekly Goals</h3>
        <ul className="space-y-2">
          {authorityAgent.weeklyGoals.map((goal, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
              <CheckCircle2 size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
              {goal}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
