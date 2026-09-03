(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const WHATSAPP = "5567998389907";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  $("#year") && ($("#year").textContent = new Date().getFullYear());

  // Header + mobile menu
  const header = $("#header");
  const menuToggle = $("#menuToggle");
  const mobileNav = $("#mobileNav");

  const syncHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
    $("#backToTop")?.classList.toggle("show", window.scrollY > 500);
  };
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  menuToggle?.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  $$("a[href^='#']", mobileNav).forEach(link => link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  $("#backToTop")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));

  // Reveal animations
  const revealItems = $$(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(el => el.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: "0px 0px -40px" });
    revealItems.forEach(el => observer.observe(el));
  }

  // Counters
  const countEls = $$("[data-count]");
  const animateCounter = el => {
    const target = Number(el.dataset.count) || 0;
    if (reducedMotion) { el.textContent = `+${target}`; return; }
    const start = performance.now(), duration = 1100;
    const step = now => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = `+${Math.round(target * eased)}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && !reducedMotion) {
    const countObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animateCounter(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: .6 });
    countEls.forEach(el => countObserver.observe(el));
  } else countEls.forEach(animateCounter);

  const projects = [
    // Residencial
    { title:"Casa contemporânea de dois pavimentos", category:"residencial", tag:"Residencial", desc:"Residência moderna com fachada limpa, vidro e acabamento premium em Água Clara-MS.", img:"images/portfolio/residencial-casa-moderna.webp" },
    { title:"Casa térrea iluminada", category:"residencial", tag:"Residencial", desc:"Residência com fachada iluminada, esquadrias amplas e acabamento externo completo.", img:"images/portfolio/residencial-casa-noite.webp" },
    { title:"Fachada residencial noturna", category:"residencial", tag:"Residencial", desc:"Residência com iluminação de destaque e acabamento em textura.", img:"images/portfolio/residencial-fachada-noite.webp" },
    { title:"Entrada e área externa", category:"residencial", tag:"Residencial", desc:"Acesso, garagem e paisagismo em residência entregue pela Sovip.", img:"images/portfolio/residencial-entrada.webp" },
    { title:"Residência concluída", category:"residencial", tag:"Residencial", desc:"Residência com fachada contemporânea e acabamento final.", img:"images/portfolio/obra-10.webp" },
    { title:"Interior com bancada", category:"residencial", tag:"Residencial", desc:"Ambiente interno com bancada em granito e acabamento em porcelanato.", img:"images/portfolio/interior-bancada.webp" },

    // Reformas
    { title:"Banheiro corporativo", category:"reforma", tag:"Reformas", desc:"Acabamento interno com revestimentos, bancadas e divisórias.", img:"images/portfolio/obra-02.webp" },
    { title:"Reforma de sanitários", category:"reforma", tag:"Reformas", desc:"Adequação e acabamento de sanitários.", img:"images/portfolio/obra-05.webp" },

    // Estruturas
    { title:"Estrutura e alvenaria", category:"estrutura", tag:"Estruturas", desc:"Execução de alvenaria e preparação estrutural em obra.", img:"images/portfolio/obra-01.webp" },
    { title:"Concretagem e fundação", category:"estrutura", tag:"Estruturas", desc:"Concretagem e preparação de área para ambiente de grande porte.", img:"images/portfolio/obra-03.webp" },
    { title:"Obra estrutural", category:"estrutura", tag:"Estruturas", desc:"Fundação e preparação estrutural em obra.", img:"images/portfolio/obra-12.webp" },

    // Comercial
    { title:"Galpão industrial", category:"comercial", tag:"Comercial", desc:"Estrutura e cobertura de galpão comercial/industrial.", img:"images/portfolio/comercial-galpao.webp" },
    { title:"Piso industrial", category:"comercial", tag:"Comercial", desc:"Execução de piso em ambiente comercial/industrial.", img:"images/portfolio/obra-04.webp" },
    { title:"Estrutura metálica comercial", category:"comercial", tag:"Comercial", desc:"Montagem de estrutura metálica e ambiente comercial.", img:"images/portfolio/obra-07.webp" },
    { title:"Estrutura técnica industrial", category:"comercial", tag:"Industrial", desc:"Execução de estrutura metálica e adequação técnica.", img:"images/portfolio/obra-08.webp" },
    { title:"Fachada comercial", category:"comercial", tag:"Comercial", desc:"Execução e acabamento de fachada.", img:"images/portfolio/obra-09.webp" },
    { title:"Sede Sovip Servicces", category:"comercial", tag:"Institucional", desc:"Fachada da sede da Sovip Servicces.", img:"images/portfolio/obra-11.webp" },

    // Móveis planejados
    { title:"Cozinha planejada sob medida", category:"moveis", tag:"Móveis", desc:"Cozinha planejada com marcenaria sob medida e acabamento impecável.", img:"images/portfolio/moveis-cozinha-planejada.webp" },
    { title:"Sala de jantar com móveis planejados", category:"moveis", tag:"Móveis", desc:"Ambiente de jantar com armários e mesa em madeira planejada.", img:"images/portfolio/moveis-sala-jantar.webp" },
    { title:"Instalação de móveis planejados", category:"moveis", tag:"Móveis", desc:"Equipe Sovip na instalação de móveis sob medida em obra.", img:"images/portfolio/moveis-instalacao.webp" },
    { title:"Móveis planejados", category:"moveis", tag:"Móveis", desc:"Cozinha planejada com marcenaria sob medida.", img:"images/portfolio/obra-06.webp" },

    { title:"Cozinha com ilha e marcenaria", category:"moveis", tag:"Móveis", desc:"Cozinha planejada com ilha em granito, armários sob medida e acabamento moderno.", img:"images/portfolio/moveis-cozinha-ilha.webp" },
    { title:"Cozinha em granito e armários", category:"moveis", tag:"Móveis", desc:"Cozinha sob medida com bancada em granito e móveis sob medida.", img:"images/portfolio/moveis-cozinha-granito.webp" },
    { title:"Closet planejado sob medida", category:"moveis", tag:"Móveis", desc:"Closet completo com prateleiras, gavetas e organizadores sob medida.", img:"images/portfolio/moveis-closet.webp" },
    { title:"Obra industrial noturna", category:"comercial", tag:"Comercial", desc:"Execução em fachada de galpão industrial com equipe e equipamentos.", img:"images/portfolio/comercial-obra-noturna.webp" },
  ];

  const grid = $("#portfolioGrid");

  if (grid) {
  const count = $("#portfolioCount");
  const empty = $("#emptyState");
  const filters = $$(".filter");
  const modal = $("#projectModal");
  const modalImg = $("#modalImg");
  const modalTag = $("#modalTag");
  const modalTitle = $("#modalTitle");
  const modalDesc = $("#modalDesc");
  const modalWhatsapp = $("#modalWhatsapp");
  const modalCurrent = $("#modalCurrent");
  const modalTotal = $("#modalTotal");
  const modalPrev = $("#modalPrev");
  const modalNext = $("#modalNext");
  let activeFilter = "todos";
  let visibleProjects = [];
  let currentIndex = 0;
  let lastTrigger = null;

  const categoryLabel = p => p.tag;

  function renderPortfolio() {
    visibleProjects = projects.filter(p => activeFilter === "todos" || p.category === activeFilter);
    grid.innerHTML = visibleProjects.map((p, index) => `
      <article class="portfolio-card reveal visible" tabindex="0" role="button"
        aria-label="Ver detalhes de ${escapeHtml(p.title)}" data-index="${index}">
        <div class="portfolio-img">
          <img src="${p.img}"
            srcset="${buildSrcset(p.img)}"
            sizes="(max-width: 620px) 100vw, (max-width: 1050px) 50vw, 33vw"
            width="680" height="510"
            alt="${escapeHtml(p.title)}"
            loading="lazy"
            decoding="async"
            data-fallback="images/portfolio/projeto-placeholder.svg">
          <span class="portfolio-badge">${escapeHtml(categoryLabel(p))}</span>
        </div>
        <div class="portfolio-body">
          <small>${escapeHtml(p.tag)}</small>
          <h3>${escapeHtml(p.title)}</h3>
          <p>Ver detalhes do projeto →</p>
        </div>
      </article>
    `).join("");

    count.textContent = `${visibleProjects.length} projeto${visibleProjects.length === 1 ? "" : "s"} exibido${visibleProjects.length === 1 ? "" : "s"}`;
    empty.hidden = visibleProjects.length !== 0;

    $$("img[data-fallback]", grid).forEach(img => {
      img.addEventListener("error", () => {
        if (img.src.endsWith(img.dataset.fallback)) return;
        img.src = img.dataset.fallback;
      }, { once: true });
    });

    $$(".portfolio-card", grid).forEach(card => {
      card.addEventListener("click", () => openModal(Number(card.dataset.index), card));
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(Number(card.dataset.index), card);
        }
      });
    });
  }


  const SRCSET_480 = new Set(['comercial-galpao', 'comercial-obra-noturna', 'interior-bancada', 'moveis-closet', 'moveis-cozinha-granito', 'moveis-cozinha-ilha', 'moveis-cozinha-planejada', 'moveis-instalacao', 'moveis-sala-jantar', 'obra-01', 'obra-02', 'obra-03', 'obra-04', 'obra-05', 'obra-06', 'obra-07', 'obra-08', 'obra-09', 'obra-10', 'obra-11', 'obra-12', 'residencial-casa-moderna', 'residencial-casa-noite', 'residencial-entrada', 'residencial-fachada-noite']);
  const SRCSET_800 = new Set(['comercial-galpao', 'comercial-obra-noturna', 'interior-bancada', 'moveis-closet', 'moveis-cozinha-granito', 'moveis-cozinha-ilha', 'moveis-cozinha-planejada', 'moveis-instalacao', 'moveis-sala-jantar', 'obra-01', 'obra-02', 'obra-03', 'obra-04', 'obra-05', 'obra-06', 'obra-07', 'obra-08', 'obra-09', 'obra-10', 'obra-11', 'obra-12', 'residencial-casa-moderna', 'residencial-casa-noite', 'residencial-entrada', 'residencial-fachada-noite']);
  function buildSrcset(imgPath) {
    const m = String(imgPath).match(/^(.*\/)([^\/]+?)(\.[a-zA-Z0-9]+)$/);
    if (!m) return imgPath;
    const [, dir, stem, ext] = m;
    const parts = [];
    if (SRCSET_480.has(stem)) parts.push(`${dir}${stem}-480${ext} 480w`);
    if (SRCSET_800.has(stem)) parts.push(`${dir}${stem}-800${ext} 800w`);
    parts.push(`${imgPath} 1200w`);
    return parts.join(', ');
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, ch => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[ch]));
  }

  function openModal(index, trigger) {
    if (!visibleProjects.length) return;
    currentIndex = index;
    lastTrigger = trigger;
    updateModal();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    setTimeout(() => $(".modal-close", modal)?.focus(), 0);
  }

  function updateModal() {
    const p = visibleProjects[currentIndex];
    modalImg.src = p.img;
    modalImg.srcset = buildSrcset(p.img);
    modalImg.sizes = "(max-width: 620px) 100vw, 900px";
    modalImg.alt = p.title;
    modalImg.loading = "eager";
    modalImg.decoding = "async";
    modalTag.textContent = p.tag;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalCurrent.textContent = currentIndex + 1;
    modalTotal.textContent = visibleProjects.length;
    modalPrev.disabled = currentIndex === 0;
    modalNext.disabled = currentIndex === visibleProjects.length - 1;
    modalPrev.style.opacity = modalPrev.disabled ? ".35" : "1";
    modalNext.style.opacity = modalNext.disabled ? ".35" : "1";
    modalWhatsapp.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Vi o projeto "${p.title}" no site da Sovip e gostaria de conversar sobre um projeto semelhante.`)}`;
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lastTrigger?.focus();
    lastTrigger = null;
  }

  filters.forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach(b => {
      const active = b === button;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    if (modal.classList.contains("is-open")) closeModal();
    renderPortfolio();
  }));

  modalPrev.addEventListener("click", () => { if (currentIndex > 0) { currentIndex--; updateModal(); } });
  modalNext.addEventListener("click", () => { if (currentIndex < visibleProjects.length - 1) { currentIndex++; updateModal(); } });
  $$("[data-close-modal]", modal).forEach(el => el.addEventListener("click", closeModal));

  document.addEventListener("keydown", e => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft" && currentIndex > 0) { currentIndex--; updateModal(); }
    if (e.key === "ArrowRight" && currentIndex < visibleProjects.length - 1) { currentIndex++; updateModal(); }
    if (e.key === "Tab") {
      const focusables = $$("button, a[href]", modal).filter(el => !el.disabled);
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  let touchStart = 0;
  $(".modal-panel", modal)?.addEventListener("touchstart", e => touchStart = e.changedTouches[0].screenX, { passive:true });
  $(".modal-panel", modal)?.addEventListener("touchend", e => {
    const diff = touchStart - e.changedTouches[0].screenX;
    if (Math.abs(diff) < 45) return;
    if (diff > 0 && currentIndex < visibleProjects.length - 1) { currentIndex++; updateModal(); }
    if (diff < 0 && currentIndex > 0) { currentIndex--; updateModal(); }
  }, { passive:true });

  renderPortfolio();
  }

  // Contact -> WhatsApp
  const contactForm = $("#contactForm");
  const contactNote = $("#contactNote");

  const digitsOnly = value => String(value || "").replace(/\D/g, "");

  contactForm?.addEventListener("submit", e => {
    e.preventDefault();
    const form = e.currentTarget;
    const nome = form.nome.value.trim();
    const telefone = form.telefone.value.trim();
    const categoria = form.categoria.value;
    const mensagem = form.mensagem.value.trim();
    const phoneDigits = digitsOnly(telefone);

    contactNote.className = "form-note";
    contactNote.textContent = "";

    if (nome.length < 2) {
      contactNote.classList.add("is-error");
      contactNote.textContent = "Informe seu nome completo.";
      form.nome.focus();
      return;
    }
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      contactNote.classList.add("is-error");
      contactNote.textContent = "Informe um WhatsApp válido com DDD (ex.: 67 99999-9999).";
      form.telefone.focus();
      return;
    }
    if (!categoria) {
      contactNote.classList.add("is-error");
      contactNote.textContent = "Selecione o tipo de serviço.";
      form.categoria.focus();
      return;
    }
    if (mensagem.length < 10) {
      contactNote.classList.add("is-error");
      contactNote.textContent = "Descreva um pouco mais sobre a sua obra (mínimo 10 caracteres).";
      form.mensagem.focus();
      return;
    }

    const text = [
      `Olá! Meu nome é ${nome}.`,
      `Telefone: ${telefone}`,
      `Tipo de obra: ${categoria}`,
      "",
      mensagem
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
    const win = window.open(url, "_blank", "noopener,noreferrer");

    if (!win) {
      contactNote.classList.add("is-error");
      contactNote.innerHTML = `Não foi possível abrir o WhatsApp automaticamente. <a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#7ddea0;font-weight:700">Clique aqui para continuar</a>.`;
      return;
    }

    contactNote.classList.add("is-success");
    contactNote.textContent = "WhatsApp aberto com sua mensagem pronta. Basta tocar em enviar.";
  });

  // Currículo: validação do arquivo + envio real para a API da Vercel.
  const careerForm = $("#careerForm");
  const fileInput = $("#curriculo");
  const fileNameLabel = $("#fileName");
  const uploadBox = $(".upload-box");
  const careerNote = $("#careerNote");
  const formStatus = $("#form-status");
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png"
  ];
  const DEFAULT_FILE_LABEL = "PDF, DOC, DOCX, JPG ou PNG · até 10 MB";

  function resetFileField() {
    fileInput.value = "";
    fileNameLabel.textContent = DEFAULT_FILE_LABEL;
    uploadBox?.classList.remove("has-file");
  }

  function fileIsValid(file) {
    const extension = file.name.split(".").pop()?.toLowerCase();
    const allowedExtensions = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];
    const validType = file.type ? ALLOWED_TYPES.includes(file.type) : allowedExtensions.includes(extension);

    if (file.size > MAX_FILE_SIZE) {
      careerNote.textContent = "O arquivo deve ter no máximo 10 MB.";
      return false;
    }
    if (!validType) {
      careerNote.textContent = "Formato não permitido. Envie PDF, DOC, DOCX, JPG ou PNG.";
      return false;
    }
    return true;
  }

  fileInput?.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (!file) { resetFileField(); return; }

    if (!fileIsValid(file)) {
      resetFileField();
      return;
    }

    fileNameLabel.textContent = file.name;
    uploadBox?.classList.add("has-file");
    careerNote.textContent = "Seus dados são enviados diretamente por e-mail para a equipe da Sovip.";
  });

  careerForm?.addEventListener("submit", async e => {
    e.preventDefault();

    const file = fileInput.files?.[0];
    if (file && !fileIsValid(file)) {
      resetFileField();
      return;
    }

    const submitBtn = careerForm.querySelector('button[type="submit"]');
    submitBtn && (submitBtn.disabled = true);
    formStatus.textContent = "Enviando...";
    formStatus.className = "form-status is-sending";

    try {
      const response = await fetch(careerForm.action, {
        method: "POST",
        body: new FormData(careerForm),
        headers: { "Accept": "application/json" }
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Não foi possível enviar o formulário.");
      }

      formStatus.textContent = data.message;
      formStatus.className = "form-status is-success";
      careerForm.reset();
      resetFileField();
    } catch (error) {
      formStatus.textContent = error.message || "Erro ao enviar. Tente novamente.";
      formStatus.className = "form-status is-error";
    } finally {
      submitBtn && (submitBtn.disabled = false);
    }
  });

  // Sticky CTA (mobile)
  const stickyCta = $("#stickyCta");
  const contactSection = $("#contato");
  const updateStickyCta = () => {
    if (!stickyCta) return;
    const isMobile = window.matchMedia("(max-width: 860px)").matches;
    if (!isMobile) {
      stickyCta.hidden = true;
      stickyCta.classList.remove("is-visible");
      document.body.classList.remove("has-sticky-cta");
      return;
    }
    const scrolled = window.scrollY > 420;
    let nearContact = false;
    if (contactSection) {
      const rect = contactSection.getBoundingClientRect();
      nearContact = rect.top < window.innerHeight * 0.85;
    }
    const show = scrolled && !nearContact;
    stickyCta.hidden = !show;
    stickyCta.classList.toggle("is-visible", show);
    document.body.classList.toggle("has-sticky-cta", show);
  };
  updateStickyCta();
  window.addEventListener("scroll", updateStickyCta, { passive: true });
  window.addEventListener("resize", updateStickyCta);


  // Button glow follows pointer
  document.addEventListener("pointermove", e => {
    const btn = e.target.closest(".btn");
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    btn.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
    btn.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
  }, { passive: true });

})();
