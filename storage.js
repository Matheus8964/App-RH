/* =========================================================
   STORAGE DO APP RH
   =========================================================

   Armazenamento persistente usando IndexedDB.

   Banco:
      AppRHDB

   Tabela:
      usuario

   Registro:
      chave = "usuarioAtual"

   Dados armazenados:
      id
      nome
      cargo
      token

   ========================================================= */


const APP_RH_DB_NAME = "AppRHDB";

const APP_RH_DB_VERSION = 1;

const APP_RH_STORE = "usuario";

const APP_RH_USER_KEY = "usuarioAtual";


/* =========================================================
   ABRIR BANCO
   ========================================================= */

function abrirBancoRH() {

  return new Promise(function(resolve, reject) {

    if (!window.indexedDB) {

      reject(
        new Error(
          "IndexedDB não está disponível neste navegador."
        )
      );

      return;
    }


    const request =
      indexedDB.open(
        APP_RH_DB_NAME,
        APP_RH_DB_VERSION
      );


    /* =====================================================
       CRIA A TABELA NA PRIMEIRA EXECUÇÃO
       ===================================================== */

    request.onupgradeneeded = function(event) {

      const db = event.target.result;


      if (!db.objectStoreNames.contains(APP_RH_STORE)) {

        db.createObjectStore(
          APP_RH_STORE,
          {
            keyPath: "chave"
          }
        );

      }

    };


    /* =====================================================
       BANCO ABERTO
       ===================================================== */

    request.onsuccess = function(event) {

      resolve(event.target.result);

    };


    /* =====================================================
       ERRO
       ===================================================== */

    request.onerror = function(event) {

      reject(
        event.target.error ||
        new Error("Erro ao abrir IndexedDB.")
      );

    };

  });

}


/* =========================================================
   SALVAR USUÁRIO
   ========================================================= */

async function salvarUsuarioRH(usuario) {

  if (!usuario) {

    throw new Error(
      "Usuário não informado."
    );

  }


  const db =
    await abrirBancoRH();


  const registro = {

    chave:
      APP_RH_USER_KEY,

    id:
      usuario.id ||
      usuario.idUsuario ||
      usuario.ID ||
      "",

    nome:
      usuario.nome ||
      usuario.nomeCompleto ||
      usuario.NOME ||
      "",

    cargo:
      usuario.cargo ||
      usuario.CARGO ||
      "",

    token:
      usuario.token ||
      "",

    atualizadoEm:
      new Date().toISOString()

  };


  return new Promise(function(resolve, reject) {

    const transaction =
      db.transaction(
        [APP_RH_STORE],
        "readwrite"
      );


    const store =
      transaction.objectStore(
        APP_RH_STORE
      );


    const request =
      store.put(registro);


    request.onsuccess =
      function() {

        resolve(registro);

      };


    request.onerror =
      function(event) {

        reject(
          event.target.error ||
          new Error(
            "Erro ao salvar usuário."
          )
        );

      };


    transaction.oncomplete =
      function() {

        db.close();

      };


    transaction.onerror =
      function(event) {

        reject(
          event.target.error ||
          new Error(
            "Erro na transação do usuário."
          )
        );

      };

  });

}


/* =========================================================
   BUSCAR USUÁRIO
   ========================================================= */

async function obterUsuarioRH() {

  const db =
    await abrirBancoRH();


  return new Promise(function(resolve, reject) {

    const transaction =
      db.transaction(
        [APP_RH_STORE],
        "readonly"
      );


    const store =
      transaction.objectStore(
        APP_RH_STORE
      );


    const request =
      store.get(
        APP_RH_USER_KEY
      );


    request.onsuccess =
      function(event) {

        resolve(
          event.target.result ||
          null
        );

      };


    request.onerror =
      function(event) {

        reject(
          event.target.error ||
          new Error(
            "Erro ao buscar usuário."
          )
        );

      };


    transaction.oncomplete =
      function() {

        db.close();

      };

  });

}


/* =========================================================
   PEGAR SOMENTE O TOKEN
   ========================================================= */

async function obterTokenRH() {

  const usuario =
    await obterUsuarioRH();


  if (!usuario) {

    return "";

  }


  return String(
    usuario.token || ""
  ).trim();

}


/* =========================================================
   PEGAR SOMENTE O ID
   ========================================================= */

async function obterIdUsuarioRH() {

  const usuario =
    await obterUsuarioRH();


  if (!usuario) {

    return "";

  }


  return String(
    usuario.id || ""
  ).trim();

}


/* =========================================================
   PEGAR SOMENTE O NOME
   ========================================================= */

async function obterNomeUsuarioRH() {

  const usuario =
    await obterUsuarioRH();


  if (!usuario) {

    return "";

  }


  return String(
    usuario.nome || ""
  ).trim();

}


/* =========================================================
   APAGAR USUÁRIO
   =========================================================

   ATENÇÃO:

   Esta função NÃO é chamada automaticamente.

   Só deve ser utilizada quando o usuário realmente
   quiser sair/trocar de usuário.

   ========================================================= */

async function limparUsuarioRH() {

  const db =
    await abrirBancoRH();


  return new Promise(function(resolve, reject) {

    const transaction =
      db.transaction(
        [APP_RH_STORE],
        "readwrite"
      );


    const store =
      transaction.objectStore(
        APP_RH_STORE
      );


    const request =
      store.delete(
        APP_RH_USER_KEY
      );


    request.onsuccess =
      function() {

        resolve(true);

      };


    request.onerror =
      function(event) {

        reject(
          event.target.error ||
          new Error(
            "Erro ao apagar usuário."
          )
        );

      };


    transaction.oncomplete =
      function() {

        db.close();

      };

  });

}


/* =========================================================
   VERIFICAR SE EXISTE USUÁRIO
   ========================================================= */

async function existeUsuarioRH() {

  const usuario =
    await obterUsuarioRH();


  return !!(
    usuario &&
    (
      usuario.id ||
      usuario.nome ||
      usuario.token
    )
  );

}


/* =========================================================
   DEBUG
   =========================================================

   Mostra no console tudo que está salvo.

   ========================================================= */

async function debugUsuarioRH() {

  try {

    const usuario =
      await obterUsuarioRH();


    console.log(
      "===================================="
    );

    console.log(
      "APP RH - INDEXEDDB"
    );

    console.log(
      "===================================="
    );

    console.log(
      "Usuário:",
      usuario
    );

    if (usuario) {

      console.log(
        "ID:",
        usuario.id
      );

      console.log(
        "Nome:",
        usuario.nome
      );

      console.log(
        "Cargo:",
        usuario.cargo
      );

      console.log(
        "Token:",
        usuario.token
      );

      console.log(
        "Atualizado em:",
        usuario.atualizadoEm
      );

    } else {

      console.log(
        "Nenhum usuário armazenado."
      );

    }

    console.log(
      "===================================="
    );


    return usuario;

  }
  catch(erro) {

    console.error(
      "Erro no IndexedDB:",
      erro
    );

    return null;

  }

}
