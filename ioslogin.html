<!DOCTYPE html>
<html lang="pt-BR">

<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, viewport-fit=cover"
  >

  <meta
    name="theme-color"
    content="#0f172a"
  >

  <meta
    name="mobile-web-app-capable"
    content="yes"
  >

  <meta
    name="apple-mobile-web-app-capable"
    content="yes"
  >

  <meta
    name="apple-mobile-web-app-status-bar-style"
    content="black-translucent"
  >

  <meta
    name="apple-mobile-web-app-title"
    content="App RH"
  >

  <link
    rel="manifest"
    href="./manifest.json"
  >

  <link
    rel="apple-touch-icon"
    href="./icons/icon-192.png"
  >

  <title>App RH</title>


  <style>

    * {
      box-sizing: border-box;
    }


    html,
    body {

      margin: 0;

      width: 100%;

      height: 100%;

      overflow: hidden;

      font-family: Arial, sans-serif;

      background: #0f172a;

    }


    #app {

      width: 100%;

      height: 100%;

      position: relative;

    }


    #siteFrame {

      width: 100%;

      height: 100%;

      border: 0;

      display: block;

      background: white;

    }


    #loading {

      position: absolute;

      inset: 0;

      z-index: 10;

      display: flex;

      flex-direction: column;

      align-items: center;

      justify-content: center;

      gap: 14px;

      background: #0f172a;

      color: white;

      transition: opacity .25s ease;

      text-align: center;

      padding: 20px;

    }


    #loading.hidden {

      opacity: 0;

      pointer-events: none;

    }


    .spinner {

      width: 38px;

      height: 38px;

      border: 4px solid rgba(255,255,255,.25);

      border-top-color: white;

      border-radius: 50%;

      animation: spin .8s linear infinite;

    }


    @keyframes spin {

      to {

        transform: rotate(360deg);

      }

    }


    #loadingMessage {

      font-size: 15px;

      line-height: 1.4;

    }


    #offline {

      display: none;

      position: absolute;

      left: 12px;

      right: 12px;

      bottom: 12px;

      z-index: 20;

      padding: 12px 14px;

      border-radius: 12px;

      background: rgba(15,23,42,.95);

      color: white;

      text-align: center;

      font-size: 14px;

    }


    #install {

      display: none;

      position: fixed;

      right: 16px;

      bottom: 16px;

      z-index: 30;

      border: 0;

      border-radius: 999px;

      padding: 12px 18px;

      background: #2563eb;

      color: white;

      font-weight: 700;

      box-shadow: 0 8px 24px rgba(0,0,0,.25);

      cursor: pointer;

    }

  </style>

</head>


<body>


  <main id="app">


    <div id="loading">

      <div class="spinner"></div>

      <strong id="loadingMessage">
        Carregando...
      </strong>

    </div>


    <iframe
      id="siteFrame"
      title="App RH"
      allow="fullscreen; clipboard-read; clipboard-write"
      referrerpolicy="no-referrer">
    </iframe>


    <div id="offline">
      Sem conexão.
    </div>


    <button
      id="install"
      type="button">
      Instalar aplicativo
    </button>


  </main>


  <script>


    // =====================================================
    // CONFIGURAÇÃO
    // =====================================================

    const URL_APPS_SCRIPT =
      "https://script.google.com/a/*/macros/s/AKfycbzHA32fnNDd117Uc1SrRCZpGzz0L8YkIQ144SUpckVJ9t3eEaEHIbJYq3b0Ashnr5QyzQ/exec";


    // =====================================================
    // ELEMENTOS
    // =====================================================

    const frame =
      document.getElementById("siteFrame");

    const loading =
      document.getElementById("loading");

    const loadingMessage =
      document.getElementById("loadingMessage");

    const offline =
      document.getElementById("offline");

    const installButton =
      document.getElementById("install");


    // =====================================================
    // MOSTRA MENSAGEM
    // =====================================================

    function mostrarMensagem(mensagem){

      loadingMessage.textContent =
        mensagem;

    }


    // =====================================================
    // RECUPERA TOKEN SALVO
    // =====================================================

    function recuperarTokenSalvo(){

      console.log(
        "================================="
      );

      console.log(
        "VERIFICANDO LOGIN SALVO"
      );

      console.log(
        "================================="
      );


      let token = "";


      // ---------------------------------------------------
      // 1. TENTA tokenUsuario
      // ---------------------------------------------------

      try{

        token =
          localStorage.getItem(
            "tokenUsuario"
          ) || "";

      }catch(erro){

        console.error(
          "Erro ao acessar tokenUsuario:",
          erro
        );

      }


      token =
        String(token).trim();


      if(token){

        console.log(
          "Token encontrado em tokenUsuario:",
          token
        );

        return token;

      }


      // ---------------------------------------------------
      // 2. TENTA objeto usuario
      // ---------------------------------------------------

      try{

        const usuarioSalvo =
          localStorage.getItem(
            "usuario"
          );


        if(usuarioSalvo){

          const usuario =
            JSON.parse(
              usuarioSalvo
            );


          if(usuario && usuario.token){

            token =
              String(
                usuario.token
              ).trim();


            if(token){

              console.log(
                "Token encontrado dentro de usuario:",
                token
              );


              // Sincroniza novamente
              // a chave tokenUsuario.

              try{

                localStorage.setItem(
                  "tokenUsuario",
                  token
                );

              }catch(erro){

                console.warn(
                  "Não foi possível sincronizar tokenUsuario:",
                  erro
                );

              }


              return token;

            }

          }

        }

      }catch(erro){

        console.error(
          "Erro ao recuperar objeto usuario:",
          erro
        );

      }


      // ---------------------------------------------------
      // 3. Nenhum token
      // ---------------------------------------------------

      console.log(
        "Nenhum token salvo encontrado."
      );


      return "";

    }


    // =====================================================
    // MONTA URL DO APPS SCRIPT
    // =====================================================

    function montarURLAppsScript(token){

      if(!token){

        console.log(
          "Abrindo Apps Script normalmente."
        );

        return URL_APPS_SCRIPT;

      }


      const separador =
        URL_APPS_SCRIPT.includes("?")
          ? "&"
          : "?";


      const url =
        URL_APPS_SCRIPT +
        separador +
        "token=" +
        encodeURIComponent(token);


      console.log(
        "URL do Apps Script com token:"
      );

      console.log(
        url
      );


      return url;

    }


    // =====================================================
    // INICIALIZA O APLICATIVO
    // =====================================================

    function iniciarAplicativo(){

      const token =
        recuperarTokenSalvo();


      // ---------------------------------------------------
      // TEM TOKEN
      // ---------------------------------------------------

      if(token){

        console.log(
          "Opa! Identifiquei um token salvo."
        );


        mostrarMensagem(
          "Opa! Identifiquei um login salvo. " +
          "Vou redirecionar você automaticamente..."
        );


        const url =
          montarURLAppsScript(
            token
          );


        /*
         * Pequeno intervalo apenas para permitir
         * que o usuário veja a mensagem.
         */

        setTimeout(function(){

          frame.src =
            url;

        }, 700);


        return;

      }


      // ---------------------------------------------------
      // NÃO TEM TOKEN
      // ---------------------------------------------------

      console.log(
        "Nenhum login salvo."
      );


      mostrarMensagem(
        "Carregando..."
      );


      frame.src =
        montarURLAppsScript("");


    }


    // =====================================================
    // IFRAME CARREGOU
    // =====================================================

    frame.addEventListener(
      "load",
      function(){

        loading.classList.add(
          "hidden"
        );

      }
    );


    // =====================================================
    // CONEXÃO
    // =====================================================

    function updateConnection(){

      offline.style.display =
        navigator.onLine
          ? "none"
          : "block";

    }


    window.addEventListener(
      "online",
      updateConnection
    );


    window.addEventListener(
      "offline",
      updateConnection
    );


    updateConnection();


    // =====================================================
    // SERVICE WORKER
    // =====================================================

    if(
      "serviceWorker" in navigator
    ){

      window.addEventListener(
        "load",
        function(){

          navigator.serviceWorker
            .register("./sw.js")
            .catch(
              console.error
            );

        }
      );

    }


    // =====================================================
    // INSTALAÇÃO PWA
    // =====================================================

    let deferredPrompt =
      null;


    window.addEventListener(
      "beforeinstallprompt",
      function(event){

        event.preventDefault();

        deferredPrompt =
          event;

        installButton.style.display =
          "block";

      }
    );


    installButton.addEventListener(
      "click",
      async function(){

        if(!deferredPrompt){

          return;

        }


        deferredPrompt.prompt();


        await deferredPrompt.userChoice;


        deferredPrompt =
          null;


        installButton.style.display =
          "none";

      }
    );


    window.addEventListener(
      "appinstalled",
      function(){

        installButton.style.display =
          "none";

      }
    );


    // =====================================================
    // INICIA
    // =====================================================

    iniciarAplicativo();


  </script>


</body>

</html>
