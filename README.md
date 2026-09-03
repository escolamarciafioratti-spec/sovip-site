# Sovip 3.1 — Premium Refactor

# Sovip 3.0 — Refatoração completa

## Estrutura
- index.html
- css/style.css
- js/main.js
- images/portfolio/*.svg (placeholders substituíveis)

## O que foi refatorado
- HTML reorganizado e sem dependências de código duplicado.
- CSS reescrito em um único sistema de tokens, componentes e breakpoints.
- JavaScript consolidado em módulos lógicos: menu, scroll, reveal, contadores, portfólio, modal, WhatsApp e currículo.
- Portfólio passa a ser gerado por uma única fonte de dados.
- Modal acessível com teclado, setas, Escape e swipe.
- Formulário de currículo mantém submissão multipart para FormSubmit, em vez de bloquear o envio no JavaScript.
- Formulário comercial abre WhatsApp com mensagem personalizada.
- Layout mobile/desktop revisado.
- Placeholders SVG evitam imagens quebradas até que as fotos reais sejam copiadas.

## Importante sobre o currículo
O formulário usa FormSubmit com o endereço configurado no projeto. Na primeira utilização, o serviço pode exigir confirmação do endereço de destino. O HTML sozinho não é um servidor de armazenamento.

## Como colocar fotos reais no portfólio
Substitua os SVGs em `images/portfolio/` e altere os caminhos no array `projects` de `js/main.js`.


## SEO local — Sovip 3.1
Textos revisados com linguagem simples e foco local em construtora, construção de casas, reformas, projetos, obras comerciais e móveis planejados em Água Clara-MS e região.
