export const config = { runtime: 'edge' };
export default async function handler(req) {
  const f = new URL(req.url).searchParams.get('f') || 'post.js';
  const r = await fetch(new URL('/' + f.replace(/[^a-z.]/g, ''), req.url));
  const b = await r.arrayBuffer();
  const h = [...new Uint8Array(await crypto.subtle.digest('SHA-1', b))].map(x => x.toString(16).padStart(2, '0')).join('');
  return new Response(JSON.stringify({ status: r.status, size: b.byteLength, sha1: h }), { headers: { 'content-type': 'application/json' } });
}
