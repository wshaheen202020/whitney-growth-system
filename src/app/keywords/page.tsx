'use client';

import { useState, useMemo } from 'react';
import { keywordDominationMap, Keyword } from '@/data/keywords';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Filter,
  TrendingUp,
  Target,
  Zap,
  CheckCircle,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

type SortKey = 'keyword' | 'searchVolume' | 'difficulty' | 'currentRank' | 'priority';
type SortOrder = 'asc' | 'desc';

export default function KeywordsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('keyword');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Get unique filter options
  const categories = useMemo(
    () => Array.from(new Set(keywordDominationMap.map((k) => k.category))),
    []
  );
  const priorities = useMemo(
    () => Array.from(new Set(keywordDominationMap.map((k) => k.priority))),
    []
  );
  const statuses = useMemo(
    () => Array.from(new Set(keywordDominationMap.map((k) => k.status))),
    []
  );
  const agents = useMemo(
    () => Array.from(new Set(keywordDominationMap.map((k) => k.assignedAgent))),
    []
  );

  // Filter and sort keywords
  const filteredKeywords = useMemo(() => {
    let filtered = keywordDominationMap.filter((k) => {
      const matchesSearch =
        k.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        k.targetPage.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || k.category === selectedCategory;
      const matchesPriority = selectedPriority === 'all' || k.priority === selectedPriority;
      const matchesStatus = selectedStatus === 'all' || k.status === selectedStatus;
      const matchesAgent = selectedAgent === 'all' || k.assignedAgent === selectedAgent;

      return (
        matchesSearch && matchesCategory && matchesPriority && matchesStatus && matchesAgent
      );
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal: string | number = 0;
      let bVal: string | number = 0;

      switch (sortKey) {
        case 'keyword':
          aVal = a.keyword;
          bVal = b.keyword;
          break;
        case 'searchVolume':
          aVal = a.searchVolume;
          bVal = b.searchVolume;
          break;
        case 'difficulty':
          aVal = a.difficulty;
          bVal = b.difficulty;
          break;
        case 'currentRank':
          aVal = a.currentRank || 999;
          bVal = b.currentRank || 999;
          break;
        case 'priority':
          const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
          aVal = priorityOrder[a.priority];
          bVal = priorityOrder[b.priority];
          break;
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedPriority, selectedStatus, selectedAgent, sortKey, sortOrder]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const total = keywordDominationMap.length;
    const dominated = keywordDominationMap.filter((k) => k.status === 'dominated').length;
    const top3 = keywordDominationMap.filter((k) => k.status === 'top_3').length;
    const ranking = keywordDominationMap.filter((k) => k.status === 'ranking').length;
    const inProgress = keywordDominationMap.filter((k) => k.status === 'in_progress').length;
    const notStarted = keywordDominationMap.filter((k) => k.status === 'not_started').length;

    return { total, dominated, top3, ranking, inProgress, notStarted };
  }, []);

  // Chart data for category distribution
  const chartData = useMemo(() => {
    const categoryMap: Record<string, number> = {};
    keywordDominationMap.forEach((k) => {
      categoryMap[k.category] = (categoryMap[k.category] || 0) + 1;
    });
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  }, []);

  const CHART_COLORS = [
    '#0a1628',
    '#1e3a5f',
    '#c9a84c',
    '#2563eb',
    '#16a34a',
    '#ea580c',
    '#9333ea',
    '#dc2626',
  ];

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'bg-green-100 text-green-800';
    if (difficulty < 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusColor = (status: Keyword['status']) => {
    switch (status) {
      case 'dominated':
        return 'bg-green-100 text-green-800';
      case 'top_3':
        return 'bg-blue-100 text-blue-800';
      case 'ranking':
        return 'bg-purple-100 text-purple-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'not_started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Keyword['status']) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-whitney-navy">Keyword Domination Map</h2>
          <p className="text-gray-600 mt-1">Track and manage all 200+ target keywords across categories</p>
        </div>
        <TrendingUp className="text-whitney-gold" size={40} />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 font-medium">Total Keywords</div>
          <div className="text-2xl font-bold text-whitney-navy mt-2">{stats.total}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 font-medium">Dominated</div>
          <div className="text-2xl font-bold text-green-600 mt-2">{stats.dominated}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 font-medium">Top 3</div>
          <div className="text-2xl font-bold text-blue-600 mt-2">{stats.top3}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 font-medium">Ranking</div>
          <div className="text-2xl font-bold text-purple-600 mt-2">{stats.ranking}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 font-medium">In Progress</div>
          <div className="text-2xl font-bold text-yellow-600 mt-2">{stats.inProgress}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 font-medium">Not Started</div>
          <div className="text-2xl font-bold text-gray-600 mt-2">{stats.notStarted}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left: Filters and Table */}
        <div className="col-span-2 space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-whitney-navy" />
              <h3 className="font-semibold text-whitney-navy">Filters</h3>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search keywords or target pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whitney-blue focus:border-transparent"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whitney-blue focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whitney-blue focus:border-transparent"
                >
                  <option value="all">All Priorities</option>
                  {priorities.map((pri) => (
                    <option key={pri} value={pri}>
                      {pri.charAt(0).toUpperCase() + pri.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whitney-blue focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {getStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned Agent
                </label>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whitney-blue focus:border-transparent"
                >
                  <option value="all">All Agents</option>
                  {agents.map((agent) => (
                    <option key={agent} value={agent}>
                      {agent}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Keywords Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-whitney-navy text-white">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      <button
                        onClick={() => handleSort('keyword')}
                        className="flex items-center gap-2 hover:text-whitney-gold transition"
                      >
                        Keyword
                        {sortKey === 'keyword' &&
                          (sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">Category</th>
                    <th className="px-6 py-3 text-center font-semibold">
                      <button
                        onClick={() => handleSort('searchVolume')}
                        className="flex items-center justify-center gap-2 hover:text-whitney-gold transition w-full"
                      >
                        Volume
                        {sortKey === 'searchVolume' &&
                          (sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-center font-semibold">
                      <button
                        onClick={() => handleSort('difficulty')}
                        className="flex items-center justify-center gap-2 hover:text-whitney-gold transition w-full"
                      >
                        Difficulty
                        {sortKey === 'difficulty' &&
                          (sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-center font-semibold">Current Rank</th>
                    <th className="px-6 py-3 text-center font-semibold">Target</th>
                    <th className="px-6 py-3 text-center font-semibold">Status</th>
                    <th className="px-6 py-3 text-left font-semibold">Agent</th>
                    <th className="px-6 py-3 text-center font-semibold">
                      <button
                        onClick={() => handleSort('priority')}
                        className="flex items-center justify-center gap-2 hover:text-whitney-gold transition w-full"
                      >
                        Priority
                        {sortKey === 'priority' &&
                          (sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredKeywords.map((keyword) => (
                    <tr key={keyword.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-whitney-navy">{keyword.keyword}</td>
                      <td className="px-6 py-4 text-gray-600 text-xs">{keyword.category}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{keyword.searchVolume}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(keyword.difficulty)}`}>
                          {keyword.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-whitney-blue">
                        {keyword.currentRank ? `#${keyword.currentRank}` : 'â'}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-whitney-gold">
                        #{keyword.targetRank}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(keyword.status)}`}>
                          {getStatusLabel(keyword.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{keyword.assignedAgent}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          keyword.priority === 'critical'
                            ? 'bg-red-100 text-red-800'
                            : keyword.priority === 'high'
                            ? 'bg-orange-100 text-orange-800'
                            : keyword.priority === 'medium'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {keyword.priority.charAt(0).toUpperCase() + keyword.priority.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600 border-t border-gray-200">
              Showing {filteredKeywords.length} of {keywordDominationMap.length} keywords
            </div>
          </div>
        </div>

        {/* Right: Distribution Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit">
          <h3 className="font-semibold text-whitney-navy mb-4 flex items-center gap-2">
            <Target size={20} />
            Keyword Distribution by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-2 max-h-48 overflow-y-auto">
            {chartData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                  />
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-semibold text-whitney-navy">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
