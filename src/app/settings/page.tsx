'use client';

import { useState } from 'react';
import { Settings, Key, Globe, Database, Bell, Zap, CheckCircle2, XCircle, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'pending';
  icon: string;
  category: string;
  apiKeyRequired: boolean;
  lastSync?: string;
  docsUrl: string;
}

const integrations: Integration[] = [
  {
    id: 'gsc',
    name: 'Google Search Console',
    description: 'Track keyword rankings, impressions, clicks, and indexing status',
    status: 'disconnected',
    icon: 'ð',
    category: 'Search',
    apiKeyRequired: true,
    docsUrl: 'https://developers.google.com/webmaster-tools/v1/how-tos/authorizing',
  },
  {
    id: 'ga4',
    name: 'Google Analytics 4',
    description: 'Website traffic, user behavior, and conversion tracking',
    status: 'disconnected',
    icon: 'ð',
    category: 'Analytics',
    apiKeyRequired: true,
    docsUrl: 'https://developers.google.com/analytics/devguides/reporting/data/v1',
  },
  {
    id: 'gbp',
    name: 'Google Business Profile',
    description: 'Local search visibility, reviews, posts, and map pack data',
    status: 'disconnected',
    icon: 'ð',
    category: 'Local',
    apiKeyRequired: true,
    docsUrl: 'https://developers.google.com/my-business/reference/rest',
  },
  {
    id: 'bing',
    name: 'Bing Webmaster Tools',
    description: 'Bing search rankings, impressions, and indexing',
    status: 'disconnected',
    icon: 'ð',
    category: 'Search',
    apiKeyRequired: true,
    docsUrl: 'https://www.bing.com/webmasters/help/getting-access-to-the-bing-webmaster-tools-api',
  },
  {
    id: 'semrush',
    name: 'SEMrush',
    description: 'Competitor analysis, keyword research, backlink data',
    status: 'disconnected',
    icon: 'ð¯',
    category: 'SEO Tools',
    apiKeyRequired: true,
    docsUrl: 'https://developer.semrush.com/api/',
  },
  {
    id: 'ahrefs',
    name: 'Ahrefs',
    description: 'Backlink analysis, domain authority, content gap analysis',
    status: 'disconnected',
    icon: 'ð',
    category: 'SEO Tools',
    apiKeyRequired: true,
    docsUrl: 'https://ahrefs.com/api',
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    description: 'Power content generation and AI search monitoring',
    status: 'disconnected',
    icon: 'ð¤',
    category: 'AI',
    apiKeyRequired: true,
    docsUrl: 'https://platform.openai.com/docs/api-reference',
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude API',
    description: 'Advanced content creation and analysis agents',
    status: 'disconnected',
    icon: 'ð§ ',
    category: 'AI',
    apiKeyRequired: true,
    docsUrl: 'https://docs.anthropic.com/en/api',
  },
  {
    id: 'perplexity',
    name: 'Perplexity API',
    description: 'Monitor AI search mentions and brand visibility',
    status: 'disconnected',
    icon: 'ð¡',
    category: 'AI',
    apiKeyRequired: true,
    docsUrl: 'https://docs.perplexity.ai/',
  },
  {
    id: 'wordpress',
    name: 'WordPress REST API',
    description: 'Auto-publish content to whitneyandcompany.com',
    status: 'disconnected',
    icon: 'ð',
    category: 'CMS',
    apiKeyRequired: true,
    docsUrl: 'https://developer.wordpress.org/rest-api/',
  },
];

const agentConfigs = [
  { id: 1, name: 'SEO Strategy Director', enabled: true, schedule: 'Daily at 6:00 AM', autoRun: true },
  { id: 2, name: 'Content Authority Engine', enabled: true, schedule: 'Mon/Wed/Fri at 8:00 AM', autoRun: true },
  { id: 3, name: 'Local SEO & Maps Agent', enabled: true, schedule: 'Tue/Thu at 9:00 AM', autoRun: true },
  { id: 4, name: 'GEO / AI Search Agent', enabled: true, schedule: 'Daily at 7:00 AM', autoRun: false },
  { id: 5, name: 'Authority & Backlink Agent', enabled: true, schedule: 'Weekly on Monday', autoRun: false },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'integrations' | 'agents' | 'notifications' | 'general'>('integrations');
  const [agentStates, setAgentStates] = useState(agentConfigs);

  const toggleAgent = (id: number) => {
    setAgentStates(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  const toggleAutoRun = (id: number) => {
    setAgentStates(prev => prev.map(a => a.id === id ? { ...a, autoRun: !a.autoRun } : a));
  };

  const statusIcon = (status: string) => {
    if (status === 'connected') return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    if (status === 'pending') return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-gray-400" />;
  };

  const categories = [...new Set(integrations.map(i => i.category))];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="w-7 h-7" />
          System Settings
        </h1>
        <p className="text-gray-500 mt-1">Configure integrations, agent behavior, and system preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {(['integrations', 'agents', 'notifications', 'general'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition ${
              activeTab === tab ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-[#0a1628] to-[#1e3a5f] rounded-xl p-6 text-white">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Key className="w-5 h-5 text-[#c9a84c]" />
              API Integrations
            </h2>
            <p className="text-blue-200 mt-1 text-sm">
              Connect external services to power live data feeds into the dashboard. API keys are encrypted and stored securely as environment variables.
            </p>
            <div className="flex gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-400" /> {integrations.filter(i => i.status === 'connected').length} Connected</span>
              <span className="flex items-center gap-1"><AlertCircle className="w-4 h-4 text-yellow-400" /> {integrations.filter(i => i.status === 'pending').length} Pending</span>
              <span className="flex items-center gap-1"><XCircle className="w-4 h-4 text-gray-400" /> {integrations.filter(i => i.status === 'disconnected').length} Not Connected</span>
            </div>
          </div>

          {categories.map(category => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.filter(i => i.category === category).map(integration => (
                  <div key={integration.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{integration.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                          <p className="text-sm text-gray-500 mt-0.5">{integration.description}</p>
                        </div>
                      </div>
                      {statusIcon(integration.status)}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <a
                        href={integration.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        API Docs <ExternalLink className="w-3 h-3" />
                      </a>
                      <button className="px-4 py-1.5 bg-[#0a1628] text-white text-sm rounded-lg hover:bg-[#1e3a5f] transition flex items-center gap-1">
                        <Key className="w-3 h-3" />
                        {integration.status === 'connected' ? 'Reconfigure' : 'Connect'}
                      </button>
                    </div>
                    {integration.lastSync && (
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" /> Last synced: {integration.lastSync}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="font-semibold text-amber-800 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Environment Variables Setup
            </h3>
            <p className="text-sm text-amber-700 mt-2">
              Add your API keys as environment variables in Vercel for production deployment. Create a <code className="bg-amber-100 px-1 rounded">.env.local</code> file for local development:
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg mt-3 text-xs overflow-x-auto">
{`# Search & Analytics
GOOGLE_SEARCH_CONSOLE_KEY=your_key_here
GOOGLE_ANALYTICS_PROPERTY_ID=your_property_id
GOOGLE_BUSINESS_PROFILE_KEY=your_key_here
BING_WEBMASTER_API_KEY=your_key_here

# SEO Tools
SEMRUSH_API_KEY=your_key_here
AHREFS_API_KEY=your_key_here

# AI Services
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
PERPLEXITY_API_KEY=your_key_here

# CMS
WORDPRESS_API_URL=https://whitneyandcompany.com/wp-json
WORDPRESS_APPLICATION_PASSWORD=your_password_here`}
            </pre>
          </div>
        </div>
      )}

      {/* Agents Tab */}
      {activeTab === 'agents' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#c9a84c]" />
                Agent Configuration
              </h2>
              <p className="text-sm text-gray-500 mt-1">Enable/disable agents and configure their automation schedules</p>
            </div>
            <div className="divide-y divide-gray-100">
              {agentStates.map(agent => (
                <div key={agent.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleAgent(agent.id)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        agent.enabled ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        agent.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                    <div>
                      <h3 className="font-medium text-gray-900">Agent {agent.id}: {agent.name}</h3>
                      <p className="text-sm text-gray-500">Schedule: {agent.schedule}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={agent.autoRun}
                        onChange={() => toggleAutoRun(agent.id)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      Auto-run
                    </label>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      agent.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {agent.enabled ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Automation Loop Configuration</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Weekly Tasks (Auto)</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Generate new content (2-3 articles)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Monitor keyword rankings</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Improve internal linking</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Publish GBP posts</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Monitor AI search mentions</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Monthly Tasks (Auto)</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Conduct full SEO audit</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Acquire new backlinks</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Analyze competitors</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Update older content</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Generate performance report</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-[#c9a84c]" />
              Notification Preferences
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Ranking changes (Top 10 movements)', enabled: true },
                { label: 'New content published', enabled: true },
                { label: 'New backlinks acquired', enabled: true },
                { label: 'AI search mention detected', enabled: true },
                { label: 'New Google review received', enabled: true },
                { label: 'Weekly performance summary', enabled: true },
                { label: 'Monthly report ready', enabled: true },
                { label: 'Agent error alerts', enabled: true },
                { label: 'Competitor ranking changes', enabled: false },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-700">{pref.label}</span>
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer ${pref.enabled ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${pref.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Notification Channels</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-500">ceo@cx.wtf</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Slack</p>
                  <p className="text-sm text-gray-500">Not configured</p>
                </div>
                <button className="px-3 py-1 bg-[#0a1628] text-white text-xs rounded-lg hover:bg-[#1e3a5f] transition">Connect</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Webhook</p>
                  <p className="text-sm text-gray-500">Not configured</p>
                </div>
                <button className="px-3 py-1 bg-[#0a1628] text-white text-xs rounded-lg hover:bg-[#1e3a5f] transition">Configure</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* General Tab */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-[#c9a84c]" />
              Company Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" defaultValue="Whitney & Company" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input type="text" defaultValue="https://whitneyandcompany.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Location</label>
                <input type="text" defaultValue="Rochester, New York" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <input type="text" defaultValue="Wealth Management / Financial Advisory" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-[#c9a84c]" />
              System Information
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Framework</p>
                <p className="font-medium text-gray-900">Next.js 14 + React 18</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Hosting</p>
                <p className="font-medium text-gray-900">Vercel</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Agent Framework</p>
                <p className="font-medium text-gray-900">Compatible with CrewAI / LangGraph / Claude Agents</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Data Storage</p>
                <p className="font-medium text-gray-900">Vercel KV / PostgreSQL (when connected)</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Target Markets</h2>
            <div className="flex flex-wrap gap-2">
              {['Rochester NY', 'Pittsford', 'Brighton', 'Penfield', 'Victor', 'Webster', 'Fairport', 'Canandaigua', 'Irondequoit'].map(market => (
                <span key={market} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-200">
                  {market}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
