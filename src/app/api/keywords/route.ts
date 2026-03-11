import { NextResponse } from 'next/server';
import { keywordDominationMap }from '@/data/keywords';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const priority = searchParams.get('priority');
  const status = searchParams.get('status');
  const agent = searchParams.get('agent');


  let filtered = [...keywordDominationMap];


  if (category) filtered = filtered.filter(k => k.category === category);
  if (priority) filtered = filtered.filter(k => k.priority === priority);
  if (status) filtered = filtered.filter(k => k.status === status);
  if (agent) filtered = filtered.filter(k => k.assignedAgent === agent);


  const stats = {
    total: keywordDominationMap.length,
    dominated: keywordDominationMap.filter(k => k.status === 'dominated').length,
    top3: keywordDominationMap.filter(k => k.status === 'top_3').length,
    ranking: keywordDominationMap.filter(k => k.status === 'ranking').length,
    inProgress: keywordDominationMap.filter(k => k.status === 'in_progress').length,
    notStarted: keywordDominationMap.filter(k => k.status === 'not_started').length,
    totalSearchVolume: keywordDominationMap.reduce((sum, k) => sum + k.searchVolume, 0),
    avgDifficulty: Math.round(keywordDominationMap.reduce((sum, k) => sum + k.difficulty, 0) / keywordDominationMap.length),
  };


  return NextResponse.json({
    success: true,
    stats,
    keywords: filtered,
    count: filtered.length,
    timestamp: new Date().toISOString(),
  });
}

