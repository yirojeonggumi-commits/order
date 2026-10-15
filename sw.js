const C='irojeong-order-v2';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  const ks=await caches.keys();
  await Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)));
  await self.clients.claim();
})())});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||!r.url.startsWith(self.location.origin))return;
  e.respondWith((async()=>{
    try{
      const res=await fetch(new Request(r.url,{cache:'reload',credentials:'same-origin'}));
      if(res&&res.ok){ const c=await caches.open(C); c.put(r,res.clone()); }
      return res;
    }catch(err){
      const m=await caches.match(r); if(m) return m; throw err;
    }
  })());
});
