import { NextResponse } from 'next/server';

// Integration endpoints for connecting external services
// Each integration can be configured with API keys stored in Vercel environment variables

interface IntegrationConfig {
  id: string;
  name: string;
  envVars: string[];
  endpoints: { method: string; path: string; description: string }[];
}

const availableIntegrations: IntegrationConfig[] = [
  {
    id: 'google-search-console',
    name: 'Google Search Console',
    envVars: ['GOOGLE_SEARCH_CONSOLE_KEY', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
    endpoints: [
      { method: 'GET', path: '/api/integrations/gsc/rankings', description: 'Fetch keyword rankings' },
      { method: 'GET', path: '/api/integrations/gsc/impressions', description: 'Fetch search impressions' },
      { method: 'GET', path: '/api/integrations/gsc/clicks', description: 'Fetch click data' },
    ],
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics 4',
    envVars: ['GA4_PROPERTY_ID', 'GA4_SERVICE_ACCOUNT_KEY'],
    endpoints: [
      { method: 'GET', path: '/api/integrations/ga4/traffic', description: 'Fetch traffic data' },
      { method: 'GET', path: '/api/integrations/ga4/conversions', description: 'Fetch conversion data' },
      { method: 'GET', path: '/api/integrations/ga4/engagement', description: 'Fetch engagement metrics' },
    ],
  },
  {
    id: 'google-business-profile',
    name: 'Google Business Profile',
    envVars: ['GBP_ACCESS_TOKEN'],
    endpoints: [
      { method: 'GET', path: '/api/integrations/gbp/insights', description: 'Fetch GBP insights' },
      { method: 'GET', path: '/api/integrations/gbp/reviews', description: 'Fetch reviews' },
      { method: 'POST', path: '/api/integrations/gbp/posts', description: 'Create GBP post' },
    ],
  },
  {
    id: 'semrush',
    name: 'SEMrush',
    envVars: ['SEMRUSH_API_KEY'],
    endpoints: [
      { method: 'GET', path: '/api/integrations/semrush/rankings', description: 'Fetch organic rankings' },
      { method: 'GET', path: '/api/integrations/semrush/competitors', description: 'Competitor analysis' },
      { method: 'GET', path: '/api/integrations/semrush/backlinks', description: 'Backlink data' },
    ],
  },
  {
    id: 'ahrefs',
    name: 'Ahrefs',
    envVars: ['AHREFS_API_KEY'],
    endpoints: [
      { method: 'GET', path: '/api/integrations/ahrefs/backlinks', description: 'Backlink profile' },
      { method: 'GET', path: '/api/integrations/ahrefs/domain-rating', description: 'Domain rating' },
      { method: 'GET', path: '/api/integrations/ahrefs/content-gap', description: 'Content gap analysis' },
    ],
  },
];

export async function GET() {
  // Check which integrations have API keys configured
  const integrationStatus = availableIntegrations.map(integration => ({
    ...integration,
    configured: integration.envVars.every(envVar => !!process.env[envVar]),
    missingVars: integration.envVars.filter(envVar => !process.env[envVar]),
  }));

  return NextResponse.json({
    success: true,
    integrations: integrationStatus,
    configured: integrationStatus.filter(i => i.configured).length,
    total: integrationStatus.length,
    timestamp: new Date().toISOString(),
  });
}
