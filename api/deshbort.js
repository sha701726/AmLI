import { getRequestsFromSheet } from './deshbort_api';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ALLOW_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const requests = await getRequestsFromSheet();
    res.status(200).json(requests);
  } catch (err) {
    console.error('/api/deshbort error:', err);
    const message = err?.message || String(err);
    res.status(500).json({ error: `Failed to fetch requests: ${message}` });
  }
}


