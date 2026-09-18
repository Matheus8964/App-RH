const CACHE_NAME = "app-rh-v2";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./alarme.html",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];


/* =====================================================
   INSTALAÇÃO
===================================================== */

self.addEventListener("install", event => {

    console.log("[SW] Instalando:", CACHE_NAME);

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(ARQUIVOS);

            })
            .then(() => {

                // Ativa a nova versão imediatamente
                return self.skipWaiting();

            })

    );

});


/* =====================================================
   ATIVAÇÃO
===================================================== */

self.addEventListener("activate", event => {

    console.log("[SW] Ativando:", CACHE_NAME);

    event.waitUntil(

        caches.keys()
            .then(chaves => {

                return Promise.all(

                    chaves
                        .filter(chave => chave !== CACHE_NAME)
                        .map(chave => {

                            console.log(
                                "[SW] Removendo cache antigo:",
                                chave
                            );

                            return caches.delete(chave);

                        })

                );

            })
            .then(() => {

                // Assume o controle imediatamente
                return self.clients.claim();

            })

    );

});


/* =====================================================
   CACHE
   =====================================================

   Primeiro tenta buscar a versão atual pela internet.

   Se conseguir:
   - entrega a versão nova
   - atualiza o cache

   Se estiver sem internet:
   - usa a versão armazenada no cache
===================================================== */

self.addEventListener("fetch", event => {

    const request = event.request;

    // Ignora requisições que não sejam GET
    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);

    // Só trabalha com arquivos do próprio PWA
    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(

        fetch(request)

            .then(response => {

                // Guarda uma cópia da resposta nova
                if (
                    response &&
                    response.status === 200
                ) {

                    const copia = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {

                            cache.put(
                                request,
                                copia
                            );

                        });

                }

                return response;

            })

            .catch(() => {

                // Sem internet:
                // usa o arquivo salvo no cache

                return caches.match(request);

            })

    );

});


/* =====================================================
   CLIQUE NA NOTIFICAÇÃO DO ALARME
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

                // Se o App RH já estiver aberto,
                // coloca a janela em primeiro plano.

                for (
                    const cliente of lista
                ) {

                    if (
                        "focus" in cliente
                    ) {

                        return cliente.focus();

                    }

                }


                // Se não estiver aberto,
                // abre o alarme.

                if (
                    clients.openWindow
                ) {

                    return clients.openWindow(
                        "./alarme.html"
                    );

                }

            })

        );

    }
);
