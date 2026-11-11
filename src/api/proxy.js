export const config = { runtime: 'edge' };
const OK = ['pexels.com', 'pixabay.com', 'freesound.org', 'wikimedia.org', 'jamendo.com', 'archive.org'];
export default async function handler(req) {
  const u = new URL(req.url);
  let t;
  try { t = new URL(u.searchParams.get('u')); } catch (e) { return new Response('bad url', { status: 400 }); }
  const h = t.hostname;
  if (t.protocol !== 'https:' || !OK.some(o => h === o || h.endsWith('.' + o))) return new Response('host not allowed', { status: 403 });
  const headers = { 'user-agent': 'Mozilla/5.0 LumerisReelMaker/1.0' };
  const range = req.headers.get('range');
  if (range) headers.range = range;
  let r;
  try { r = await fetch(t.toString(), { headers, redirect: 'follow' }); } catch (e) { return new Response('upstream error', { status: 502 }); }
  const out = new Headers();
  for (const k of ['content-type', 'content-length', 'content-range', 'accept-ranges']) { const v = r.headers.get(k); if (v) out.set(k, v); }
  out.set('cache-control', 'public, max-age=86400');
  return new Response(r.body, { status: r.status, headers: out });
}
