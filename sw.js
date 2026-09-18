const CACHE_NAME = 'meu-app-shell-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Cache somente os arquivos do próprio PWA.
  // O conteúdo do Google Sites continua sendo carregado pela internet.
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request))
    );
  }
});
const CACHE_NAME = "app-rh-v1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./alarme.html",
    "./manifest.json"
];


/* =====================================================
   INSTALAÇÃO
===================================================== */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(
                    ARQUIVOS
                );

            })

    );

    self.skipWaiting();

});


/* =====================================================
   ATIVAÇÃO
===================================================== */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(chaves => {

                return Promise.all(

                    chaves
                        .filter(chave =>
                            chave !== CACHE_NAME
                        )
                        .map(chave =>
                            caches.delete(chave)
                        )

                );

            })

    );

    self.clients.claim();

});


/* =====================================================
   CACHE
===================================================== */

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(resposta => {

                return resposta ||
                    fetch(event.request);

            })

    );

});


/* =====================================================
   CLIQUE NA NOTIFICAÇÃO
===================================================== */

self.addEventListener(
    "notificationclick",
    event => {

        event.notification.close();


        event.waitUntil(

            clients.matchAll({
                type: "window",
                includeUncontrolled: true
            })

            .then(lista => {

                for(
                    const cliente of lista
                ){

                    if(
                        "focus" in cliente
                    ){

                        return cliente.focus();

                    }

                }


                if(
                    clients.openWindow
                ){

                    return clients.openWindow(
                        "./alarme.html"
                    );

                }

            })

        );

    }
);
