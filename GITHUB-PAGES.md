# Publicação no GitHub Pages

O site está preparado para ser publicado como protótipo estático. Os links são relativos e funcionam em um endereço como `https://USUARIO.github.io/REPOSITORIO/`.

1. Envie o código para o repositório escolhido, incluindo `.github/workflows/pages.yml`, as páginas HTML, `assets/`, `build-pages.cjs` e os arquivos de teste.
2. No GitHub, abra **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Execute o workflow **Publicar SenacHub no GitHub Pages** na aba Actions, ou envie uma alteração para `main` ou `master`.
4. Ao finalizar, o endereço publicado aparece na execução e em Settings → Pages.

O workflow testa o protótipo e monta `dist/` somente com os arquivos públicos necessários. Credenciais, banco de contas, testes, documentação interna e servidor local não são publicados como parte do site.

## Dados na versão online

O acesso continua sendo por perfis de demonstração. Projetos, curtidas e tarefas são locais ao navegador; PNGs e PDFs usam IndexedDB. O conteúdo criado na versão localhost não é transferido automaticamente ao endereço do GitHub Pages, pois cada endereço tem seu próprio armazenamento. Os projetos de exemplo incluídos no código aparecem normalmente para os visitantes.

GitHub Pages não executa o servidor Node.js de contas. Cadastro real, envio de e-mail e dados compartilhados exigirão um backend separado. O botão de networking abre o aplicativo de e-mail do visitante.

Documentação: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Verificação local

```text
node --test project-tools.test.cjs workflow.test.cjs
node build-pages.cjs
node preview.cjs
```
