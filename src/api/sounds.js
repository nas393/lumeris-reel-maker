export const config = { runtime: 'edge' };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=600' } });
const OK = ['freesound.org', 'wikimedia.org', 'jamendo.com', 'archive.org'];
export default async function handler(req) {
  const u = new URL(req.url);
  const q = (u.searchParams.get('q') || 'dark ambient').slice(0, 100);
  const url = `https://api.openverse.org/v1/audio/?q=${encodeURIComponent(q)}&license=cc0,pdm&page_size=20&mature=false`;
  let r;
  try { r = await fetch(url, { headers: { 'user-agent': 'LumerisReelMaker/1.0', accept: 'application/json' } }); } catch (e) { return json({ error: 'sounds_unreachable' }, 502); }
  if (!r.ok) return json({ error: 'sounds_' + r.status }, 502);
  const d = await r.json();
  const items = (d.results || []).filter(x => {
    try { const h = new URL(x.url).hostname; return OK.some(o => h === o || h.endsWith('.' + o)); } catch (e) { return false; }
  }).filter(x => !x.duration || (x.duration >= 4000 && x.duration <= 360000)).map(x => ({
    id: x.id, title: x.title || 'Untitled', by: x.creator || '', url: x.url, dur: x.duration ? Math.round(x.duration / 1000) : 0, license: (x.license || '').toUpperCase()
  }));
  return json({ items });
}
