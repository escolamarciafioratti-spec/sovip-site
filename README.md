# Sovip Servicces Ltda — versão 3.2

Site institucional premium da Sovip Servicces, preparado para hospedagem na Vercel e integração com GitHub.

## Estrutura principal

- `index.html` — página principal
- `construcao-de-casas.html` — página de construção
- `reformas.html` — página de reformas
- `projetos.html` — página de projetos
- `moveis-planejados.html` — página de móveis planejados
- `css/style.css` — estilos
- `js/main.js` — interações, portfólio, modal e formulários
- `images/` — imagens do site e portfólio
- `api/enviar-formulario.js` — função Node.js para recebimento de currículos
- `package.json` — dependências Node.js
- `vercel.json` — cabeçalhos e cache; a função em `/api` é detectada pela Vercel automaticamente
- `robots.txt` e `sitemap.xml` — SEO técnico

## Formulário Trabalhe Conosco

O currículo é enviado por `multipart/form-data` para `/api/enviar-formulario`.

Formatos aceitos: PDF, DOC, DOCX, JPG, JPEG e PNG. Limite: 10 MB.

O e-mail inclui nome, e-mail, telefone, área de interesse e mensagem, com o currículo anexado.

## Variáveis de ambiente da Vercel

Configure em **Settings → Environment Variables**:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM` (opcional)
- `SOVIP_EMAIL` — `diretoria@sovipsevicces.com.br`

Nunca coloque a senha SMTP no HTML, JavaScript ou GitHub.

## Deploy

1. Envie os arquivos para a branch de produção do GitHub.
2. A Vercel, já conectada ao repositório, criará um novo deployment automaticamente.
3. Configure as variáveis SMTP na Vercel.
4. Faça um novo deployment após salvar as variáveis.
5. Teste o formulário com um currículo de teste.

## Correções da versão 3.2

- Removida a configuração `functions` que estava causando o erro de padrão não encontrado.
- Função mantida em `api/enviar-formulario.js`, estrutura nativa para Vercel.
- Corrigidos erros do JavaScript nas páginas internas que não possuem portfólio/modal.
- Corrigido o ano do rodapé para funcionar apenas quando o elemento existir.
- Incluída a área de interesse do candidato no e-mail.
- Assunto do e-mail de currículo diferenciado de contato comercial.
- Padronizado o e-mail exibido no site para `diretoria@sovipsevicces.com.br`.
- Remoção do arquivo temporário do currículo após o envio.
- Dependências e versão do projeto atualizadas para 3.2.0.
