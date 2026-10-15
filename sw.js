const C='irojeong-order-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||!r.url.startsWith(self.location.origin))return;
  e.respondWith(
    fetch(r).then(res=>{const c=res.clone();caches.open(C).then(x=>x.put(r,c));return res})
            .catch(()=>caches.match(r))
  );
});
