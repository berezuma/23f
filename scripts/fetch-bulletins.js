/**
 * Aldizkari Ofizialen datu-biltzailea
 *
 * Script honek bost aldizkari ofizialetako datuak eskuratzen ditu
 * eta public/data/entries.json fitxategian gordetzen ditu.
 *
 * Exekuzioa: node scripts/fetch-bulletins.js
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, '..', 'public', 'data');
const OUTPUT_FILE = join(DATA_DIR, 'entries.json');

// Ensure the data directory exists
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

const today = new Date().toISOString().split('T')[0];

/**
 * Default headers to avoid 403 blocks from government websites
 */
const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'eu,es;q=0.9,en;q=0.8',
};

/**
 * Helper: fetch with timeout and retry
 */
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
      const mergedHeaders = { ...DEFAULT_HEADERS, ...options.headers };
      const response = await fetch(url, { ...options, headers: mergedHeaders, signal: controller.signal });
      clearTimeout(timeout);
      if (response.status === 403) {
        console.warn(`  [${url}] 403 Forbidden (${i + 1}/${retries} saiakera)`);
        if (i === retries - 1) return response;
        await new Promise(r => setTimeout(r, 3000 * (i + 1)));
        continue;
      }
      return response;
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 2000 * (i + 1)));
    }
  }
}

/**
 * EHAA/BOPV - Euskal Herriko Agintaritzaren Aldizkaria
 * Uses the Open Data Euskadi API
 */
async function fetchEHAA() {
  const entries = [];
  try {
    // Try the BOPV REST API
    const url = `https://api.euskadi.eus/bopv/summaries?date=${today}`;
    const response = await fetchWithRetry(url, {
      headers: { 'Accept': 'application/json' },
    });

    if (response.ok) {
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.warn('  EHAA API: erantzuna ez da JSON formatua');
        data = null;
      }

      if (data) {
        const items = data.items || data.summaries || data.content || data || [];
        const list = Array.isArray(items) ? items : [];

        for (const item of list) {
          entries.push({
            id: `ehaa-${item.id || entries.length}`,
            bulletinId: 'ehaa',
            date: today,
            bulletinNumber: item.bulletinNumber || item.number || '',
            title: item.title || item.titulo || '',
            summary: item.summary || item.resumen || item.description || '',
            category: mapCategory(item.section || item.category || ''),
            organism: item.organism || item.organismo || item.department || 'Eusko Jaurlaritza',
            url: item.url || item.link || 'https://www.euskadi.eus/web01-bopv/eu/bopv2/datos/Azkena.shtml',
          });
        }
      }
    } else {
      console.warn(`  EHAA API: HTTP ${response.status}`);
    }
  } catch (err) {
    console.error('EHAA fetch error:', err.message);
  }

  // Fallback: try the BOPV HTML page
  if (entries.length === 0) {
    try {
      const response = await fetchWithRetry(
        'https://www.euskadi.eus/web01-bopv/eu/bopv2/datos/Azkena.shtml'
      );
      if (response.ok) {
        const html = await response.text();
        const parsed = parseEHAAHtml(html);
        entries.push(...parsed);
      }
    } catch (err) {
      console.error('EHAA HTML fallback error:', err.message);
    }
  }

  return entries;
}

/**
 * Parse EHAA HTML to extract entries
 */
function parseEHAAHtml(html) {
  const entries = [];
  // Try multiple regex patterns to match different BOPV page structures
  const patterns = [
    /<a[^>]*class="[^"]*titulo[^"]*"[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a>/gi,
    /<a[^>]*href="([^"]*\/bopv2\/[^"]*)"[^>]*>\s*([^<]{15,})\s*<\/a>/gi,
    /<a[^>]*href="([^"]*)"[^>]*class="[^"]*entry[^"]*"[^>]*>([^<]+)<\/a>/gi,
    /<h[2-4][^>]*>\s*<a[^>]*href="([^"]*)"[^>]*>([^<]{15,})<\/a>/gi,
  ];

  let idx = 0;
  const seen = new Set();

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const title = match[2].trim();
      const url = match[1];
      const key = `${title}-${url}`;
      if (title.length > 15 && !seen.has(key) && !title.includes('Cookie')) {
        seen.add(key);
        entries.push({
          id: `ehaa-html-${idx++}`,
          bulletinId: 'ehaa',
          date: today,
          bulletinNumber: '',
          title: title,
          summary: '',
          category: 'bestelakoak',
          organism: 'Eusko Jaurlaritza',
          url: url.startsWith('http') ? url : `https://www.euskadi.eus${url}`,
        });
      }
    }
    if (entries.length > 0) break;
  }

  return entries;
}

/**
 * NAO/BON - Nafarroako Aldizkari Ofiziala
 */
async function fetchNAO() {
  const entries = [];
  try {
    const response = await fetchWithRetry('https://bon.navarra.es/eu/hasiera');
    if (response.ok) {
      const html = await response.text();
      const parsed = parseNAOHtml(html);
      entries.push(...parsed);
    } else {
      console.warn(`  NAO: HTTP ${response.status}`);
    }
  } catch (err) {
    console.error('NAO fetch error:', err.message);
  }
  return entries;
}

function parseNAOHtml(html) {
  const entries = [];
  // Extract entries from the BON main page
  const linkRegex = /<a[^>]*href="([^"]*\/[^"]*)"[^>]*>([^<]{15,})<\/a>/gi;
  let match;
  let idx = 0;

  while ((match = linkRegex.exec(html)) !== null) {
    const title = match[2].trim();
    if (title.length > 20 && !title.includes('Cookie') && !title.includes('menu')) {
      entries.push({
        id: `nao-html-${idx++}`,
        bulletinId: 'nao',
        date: today,
        bulletinNumber: '',
        title: title,
        summary: '',
        category: 'bestelakoak',
        organism: 'Nafarroako Gobernua',
        url: match[1].startsWith('http') ? match[1] : `https://bon.navarra.es${match[1]}`,
      });
    }
  }

  return entries;
}

/**
 * BAO - Bizkaiko Aldizkari Ofiziala
 */
async function fetchBAO() {
  const entries = [];
  try {
    const response = await fetchWithRetry('https://www.bizkaia.eus/eu/bao');
    if (response.ok) {
      const html = await response.text();
      const parsed = parseBAOHtml(html);
      entries.push(...parsed);
    } else {
      console.warn(`  BAO: HTTP ${response.status}`);
    }
  } catch (err) {
    console.error('BAO fetch error:', err.message);
  }
  return entries;
}

function parseBAOHtml(html) {
  const entries = [];
  const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>([^<]{20,})<\/a>/gi;
  let match;
  let idx = 0;

  while ((match = linkRegex.exec(html)) !== null) {
    const title = match[2].trim();
    if (title.length > 25) {
      entries.push({
        id: `bao-html-${idx++}`,
        bulletinId: 'bao',
        date: today,
        bulletinNumber: '',
        title: title,
        summary: '',
        category: 'bestelakoak',
        organism: 'Bizkaiko Foru Aldundia',
        url: match[1].startsWith('http') ? match[1] : `https://www.bizkaia.eus${match[1]}`,
      });
    }
  }

  return entries;
}

/**
 * BOTHA - Arabako Lurralde Historikoko Aldizkari Ofiziala
 */
async function fetchBOTHA() {
  const entries = [];
  try {
    const response = await fetchWithRetry(
      'https://www.araba.eus/BOTHA/Inicio/SGBO5001.aspx?Idi=eu'
    );
    if (response.ok) {
      const html = await response.text();
      const parsed = parseBOTHAHtml(html);
      entries.push(...parsed);
    } else {
      console.warn(`  BOTHA: HTTP ${response.status}`);
    }
  } catch (err) {
    console.error('BOTHA fetch error:', err.message);
  }
  return entries;
}

function parseBOTHAHtml(html) {
  const entries = [];
  const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>([^<]{20,})<\/a>/gi;
  let match;
  let idx = 0;

  while ((match = linkRegex.exec(html)) !== null) {
    const title = match[2].trim();
    if (title.length > 25) {
      entries.push({
        id: `botha-html-${idx++}`,
        bulletinId: 'botha',
        date: today,
        bulletinNumber: '',
        title: title,
        summary: '',
        category: 'bestelakoak',
        organism: 'Arabako Foru Aldundia',
        url: match[1].startsWith('http') ? match[1] : `https://www.araba.eus${match[1]}`,
      });
    }
  }

  return entries;
}

/**
 * GAO - Gipuzkoako Aldizkari Ofiziala
 */
async function fetchGAO() {
  const entries = [];
  try {
    const response = await fetchWithRetry('https://egoitza.gipuzkoa.eus/eu/GAO');
    if (response.ok) {
      const html = await response.text();
      const parsed = parseGAOHtml(html);
      entries.push(...parsed);
    } else {
      console.warn(`  GAO: HTTP ${response.status}`);
    }
  } catch (err) {
    console.error('GAO fetch error:', err.message);
  }
  return entries;
}

function parseGAOHtml(html) {
  const entries = [];
  const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>([^<]{20,})<\/a>/gi;
  let match;
  let idx = 0;

  while ((match = linkRegex.exec(html)) !== null) {
    const title = match[2].trim();
    if (title.length > 25) {
      entries.push({
        id: `gao-html-${idx++}`,
        bulletinId: 'gao',
        date: today,
        bulletinNumber: '',
        title: title,
        summary: '',
        category: 'bestelakoak',
        organism: 'Gipuzkoako Foru Aldundia',
        url: match[1].startsWith('http') ? match[1] : `https://egoitza.gipuzkoa.eus${match[1]}`,
      });
    }
  }

  return entries;
}

/**
 * Map raw category strings to our category IDs
 */
function mapCategory(raw) {
  const lower = (raw || '').toLowerCase();
  if (lower.includes('xedapen') || lower.includes('disposicion') || lower.includes('general')) {
    return 'xedapen_orokorrak';
  }
  if (lower.includes('administrazio') || lower.includes('administrativo')) {
    return 'administrazio_egintzak';
  }
  if (lower.includes('iragarki') || lower.includes('anuncio')) {
    return 'iragarkiak';
  }
  if (lower.includes('lanpoltsa') || lower.includes('empleo') || lower.includes('enplegu')) {
    return 'lanpoltsa';
  }
  if (lower.includes('dirulaguntza') || lower.includes('subvencion') || lower.includes('ayuda')) {
    return 'dirulaguntzak';
  }
  if (lower.includes('hirigintza') || lower.includes('urbanismo') || lower.includes('ingurumen')) {
    return 'hirigintza';
  }
  if (lower.includes('zerga') || lower.includes('fiscal') || lower.includes('tributar')) {
    return 'zergak';
  }
  return 'bestelakoak';
}

/**
 * Load existing data and merge with new entries
 */
function loadExistingData() {
  try {
    if (existsSync(OUTPUT_FILE)) {
      const raw = readFileSync(OUTPUT_FILE, 'utf-8');
      const data = JSON.parse(raw);
      return data.entries || [];
    }
  } catch {
    // ignore
  }
  return [];
}

/**
 * Main execution
 */
async function main() {
  console.log(`\n  Aldizkari Ofizialen datu-biltzailea`);
  console.log(`  Data: ${today}`);
  console.log(`  ${'='.repeat(40)}\n`);

  // Fetch from all bulletins in parallel
  const results = await Promise.allSettled([
    fetchEHAA(),
    fetchNAO(),
    fetchBAO(),
    fetchBOTHA(),
    fetchGAO(),
  ]);

  const bulletinNames = ['EHAA', 'NAO', 'BAO', 'BOTHA', 'GAO'];
  let newEntries = [];

  results.forEach((result, idx) => {
    if (result.status === 'fulfilled') {
      const entries = result.value;
      console.log(`  ${bulletinNames[idx]}: ${entries.length} sarrera eskuratu da`);
      newEntries.push(...entries);
    } else {
      console.error(`  ${bulletinNames[idx]}: Errorea - ${result.reason?.message || 'Ezezaguna'}`);
    }
  });

  // Load existing data and merge (keep last 7 days)
  const existingEntries = loadExistingData();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const cutoffDate = sevenDaysAgo.toISOString().split('T')[0];

  // Remove old entries and entries from today (will be replaced)
  const keptEntries = existingEntries.filter(
    e => e.date > cutoffDate && e.date !== today
  );

  const allEntries = [...keptEntries, ...newEntries];

  // Sort by date (newest first) then by bulletin
  allEntries.sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    const bulletinOrder = ['ehaa', 'nao', 'bao', 'botha', 'gao'];
    return bulletinOrder.indexOf(a.bulletinId) - bulletinOrder.indexOf(b.bulletinId);
  });

  const output = {
    lastUpdated: new Date().toISOString(),
    date: today,
    totalEntries: allEntries.length,
    entries: allEntries,
  };

  writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`\n  Guztira: ${allEntries.length} sarrera`);
  console.log(`  Gordeta: ${OUTPUT_FILE}`);
  console.log(`  Eguneratze data: ${output.lastUpdated}`);

  if (newEntries.length === 0) {
    console.warn('\n  ⚠ OHARRA: Ez da sarrerarik eskuratu gaur.');
    console.warn('  Webguneek eskabide automatikoak blokeatzen dituzte (403 Forbidden).');
    console.warn('  Aplikazioak lagin-datuak erabiliko ditu ordez.\n');
  } else {
    console.log('');
  }
}

main().catch(err => {
  console.error('Errore orokorra:', err);
  process.exit(1);
});
