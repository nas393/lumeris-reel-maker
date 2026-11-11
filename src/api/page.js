export const config = { runtime: 'edge' };
export default async function handler(req) {
  const r = await fetch(new URL('/app.html', req.url));
  let t = await r.text();
  t = t.split('https://www.pexels.com/api/').join('https://pixabay.com/api/docs/').split('>pexels.com/api<').join('>pixabay.com/api/docs<').split('Pexels').join('Pixabay').split("if(!r.ok)throw new Error(d.error").join("if(!r.ok||d.error)throw new Error(d.error").split('const m=1400').join('const m=1000').split("'image/jpeg',0.85").join("'image/jpeg',0.7").split('rec.start(250)').join('rec.start()').split('</body>').join('<script src="/post.js"></script>\n<script src="/fx.js"></script>\n</body>').split('<small>REEL MAKER</small>').join('<small>REEL + POST MAKER</small>').split("ai_429:").join("ai_slow:'AI was too slow. Try again, or type the subject instead of the screenshot.',ai_429:");
  return new Response(t, { status: r.status, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=0, must-revalidate' } });
}
