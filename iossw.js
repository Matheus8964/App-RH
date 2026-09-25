const CACHE_NAME = "app-rh-ios-v1";
const ARQUIVOS = [
  "./",
  "./ioslogin.html",
  "./instalacao.html"
];


/* =====================================================
   INSTALAÇÃO
===================================================== */

self.addEventListener(
  "install",
  function(event){

    event.waitUntil(

      caches.open(
        CACHE_NAME
      )
      .then(
        function(cache){

          return cache.addAll(
            ARQUIVOS
          );

        }
      )

    );


    self.skipWaiting();

  }
);



/* =====================================================
   ATIVAÇÃO
===================================================== */

self.addEventListener(
  "activate",
  function(event){

    event.waitUntil(

      caches.keys()
        .then(
          function(chaves){

            return Promise.all(

              chaves
                .filter(
                  function(chave){

                    return (
                      chave !==
                      CACHE_NAME
                    );

                  }
                )
                .map(
                  function(chave){

                    return caches.delete(
                      chave
                    );

                  }
                )

            );

          }
        )

    );


    self.clients.claim();

  }
);



/* =====================================================
   REQUISIÇÕES
===================================================== */

self.addEventListener(
  "fetch",
  function(event){

    /*
     * Não intercepta chamadas para
     * Google Apps Script.
     *
     * Essas precisam chegar ao servidor
     * para validar o usuário.
     */

    if(
      event.request.url.includes(
        "script.google.com"
      )
    ){

      return;

    }


    /*
     * Para os arquivos do aplicativo:
     *
     * tenta rede primeiro;
     * se não conseguir, usa cache.
     */

    event.respondWith(

      fetch(
        event.request
      )
      .then(
        function(resposta){

          /*
           * Guarda uma cópia atualizada
           * no cache.
           */

          const copia =
            resposta.clone();


          caches.open(
            CACHE_NAME
          )
          .then(
            function(cache){

              cache.put(
                event.request,
                copia
              );

            }
          );


          return resposta;

        }
      )
      .catch(
        function(){

          return caches.match(
            event.request
          );

        }
      )

    );

  }
);

