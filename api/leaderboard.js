const REPO_OWNER = 'kathyyxu';
const REPO_NAME = 'womanup';
const FILE_PATH = 'data/leaderboard.json';
const BRANCH = 'main';
const MAX_RECORDS = 100;
const ENCODED_FILE_PATH = FILE_PATH.split('/').map(encodeURIComponent).join('/');

let memoryRecords = [];

function normalizeRecord(record) {
  const name = String(record?.name || '').trim().slice(0, 18);
  const score = Number(record?.score);
  if (!name || !Number.isFinite(score)) return null;

  return {
    name,
    score: Math.round(score),
    rank: String(record?.rank || '').trim().slice(0, 4),
    hours: String(record?.hours || '').trim().slice(0, 12),
    duoScore: Math.round(Number(record?.duoScore || 0)),
    duoComplete: Boolean(record?.duoComplete),
    note: String(record?.note || '').trim().slice(0, 80),
    updatedAt: Number(record?.updatedAt || Date.now()),
  };
}

function normalizeRecords(records) {
  if (!Array.isArray(records)) return [];

  const byName = new Map();
  records.forEach((item) => {
    const record = normalizeRecord(item);
    if (!record) return;
    const existing = byName.get(record.name);
    if (!existing || record.score > existing.score || (record.score === existing.score && record.updatedAt > existing.updatedAt)) {
      byName.set(record.name, record);
    }
  });

  return Array.from(byName.values())
    .sort((a, b) => b.score - a.score || b.updatedAt - a.updatedAt)
    .slice(0, MAX_RECORDS);
}

function sendJson(response, status, payload) {
  response.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

function githubHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'womanup-leaderboard',
  };
}

async function readGitHubRecords() {
  if (!process.env.GITHUB_TOKEN) return null;

  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${ENCODED_FILE_PATH}?ref=${BRANCH}`;
  const response = await fetch(url, { headers: githubHeaders() });

  if (response.status === 404) {
    return { records: [], sha: null };
  }

  if (!response.ok) {
    throw new Error(`GitHub read failed: ${response.status}`);
  }

  const file = await response.json();
  const json = JSON.parse(Buffer.from(file.content || '', 'base64').toString('utf8') || '[]');
  return { records: normalizeRecords(json), sha: file.sha };
}

async function writeGitHubRecords(records, sha) {
  if (!process.env.GITHUB_TOKEN) return false;

  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${ENCODED_FILE_PATH}`;
  const body = {
    message: 'Update shared leaderboard',
    branch: BRANCH,
    content: Buffer.from(JSON.stringify(records, null, 2)).toString('base64'),
    ...(sha ? { sha } : {}),
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers: githubHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`GitHub write failed: ${response.status}`);
  }

  return true;
}

async function getRecords() {
  try {
    const github = await readGitHubRecords();
    if (github) {
      memoryRecords = github.records;
      return github;
    }
  } catch {
    return { records: memoryRecords, sha: null };
  }

  return { records: memoryRecords, sha: null };
}

async function saveRecord(record) {
  const cleanRecord = normalizeRecord(record);
  if (!cleanRecord) return getRecords();

  const { records, sha } = await getRecords();
  const next = normalizeRecords([...records.filter((item) => item.name !== cleanRecord.name), cleanRecord]);
  memoryRecords = next;

  try {
    await writeGitHubRecords(next, sha);
  } catch {
    // Keep the in-memory board alive for demo traffic even if persistence is unavailable.
  }

  return { records: next, sha: null };
}

export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');

  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return;
  }

  if (request.method === 'GET') {
    const { records } = await getRecords();
    sendJson(response, 200, { records });
    return;
  }

  if (request.method === 'POST') {
    const { records } = await saveRecord(request.body || {});
    sendJson(response, 200, { records });
    return;
  }

  sendJson(response, 405, { error: 'Method not allowed' });
}
