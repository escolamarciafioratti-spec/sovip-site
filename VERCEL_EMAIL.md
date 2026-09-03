## Sovip 3.2 — Deploy Vercel

Esta versão usa `api/enviar-formulario.js` como função Node.js nativa da Vercel e não exige o bloco `functions` no `vercel.json`.

# Sovip 3.2 — Vercel + Node.js + E-mail

O formulário usa uma Vercel Function em Node.js:
`/api/enviar-formulario.js`

O arquivo selecionado pelo usuário é enviado ao servidor via `multipart/form-data` e anexado ao e-mail.

## Variáveis de ambiente na Vercel

Configure no projeto, em Settings → Environment Variables:

- `SMTP_HOST` — servidor SMTP do provedor de e-mail
- `SMTP_PORT` — normalmente 587 ou 465
- `SMTP_USER` — usuário SMTP
- `SMTP_PASS` — senha ou senha de aplicativo SMTP
- `SMTP_FROM` — remetente autorizado pelo provedor (opcional, usa SMTP_USER se vazio)
- `SOVIP_EMAIL` — `diretoria@sovipsevicces.com.br`

## Importante

Não coloque senha SMTP no HTML ou JavaScript. As credenciais ficam somente nas Environment Variables da Vercel.

O domínio/e-mail precisa permitir envio SMTP. Se o e-mail da Sovip for hospedado em um provedor específico, use os dados SMTP fornecidos por esse provedor.

## Deploy

1. Suba o projeto para um repositório GitHub.
2. Importe o repositório na Vercel.
3. A Vercel detectará o projeto Node.js/Function.
4. Cadastre as variáveis SMTP.
5. Faça um novo deploy.
6. Teste o formulário enviando um currículo de teste.

## Limite

O frontend e a Function aceitam arquivos de até 10 MB nos formatos PDF, DOC, DOCX, JPG e PNG.
