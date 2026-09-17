# PWA + Google Sites

Este projeto cria uma casca PWA hospedada no GitHub Pages e exibe um Google Sites dentro de um iframe.

## 1. Configure o endereço do Google Sites

Abra `index.html` e altere:

`https://sites.google.com/view/SEU-SITE-AQUI`

para o endereço real do seu Google Sites.

## 2. Personalize o aplicativo

No `manifest.json` altere:
- `name`
- `short_name`
- `description`
- `theme_color`
- `background_color`

No `index.html` altere também:
- `<title>`
- `apple-mobile-web-app-title`

## 3. Ícones

Substitua:
- `icons/icon-192.png`
- `icons/icon-512.png`

por seus próprios ícones PNG nos tamanhos indicados.

## 4. Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos mantendo as pastas.
3. Vá em Settings > Pages.
4. Em Source, escolha `Deploy from a branch`.
5. Selecione a branch principal e a pasta `/ (root)`.
6. Salve.
7. Aguarde a publicação.

O endereço ficará parecido com:

`https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`

## 5. HTTPS

O GitHub Pages fornece HTTPS. Isso é importante para PWA e Service Worker.

## Importante

O PWA funciona como uma camada externa. O Google Sites continua dependendo de internet.

Se o Google Sites bloquear a exibição dentro do iframe, será necessário trocar a estratégia para uma navegação externa ou reconstruir o portal como Web App.
