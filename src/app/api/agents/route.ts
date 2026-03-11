import { NextResponse } from 'next/server';
import { agents } from '@/data/agents';

export async function GET() {
  return NextResponse.json({
    success: true,
    agents: agents.map(a => ({
      id: a.id,
      name: a.name,
      role: a.role,
      status: a.status,
      metrics: a.metrics,
      recentTasks: a.recentTasks,
    })),
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { agentId, action } = body;
  return NextResponse.json({
    success: true,
    message: `Agent ${agentId} action '${action}' queued successfully`,
    agentId,
    action,
    timestamp: new Date().toISOString(),
  });
}
