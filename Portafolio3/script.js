(() => {
  'use strict';

  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector));

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scrollBehavior = () => (reducedMotion.matches ? 'auto' : 'smooth');

  const header = $('#siteHeader');
  const progressBar = $('#progressBar');
  const backToTop = $('#backToTop');
  const breadcrumbCurrent = $('#breadcrumbCurrent');
  const navLinks = $$('#mainNav a');
  const sections = $$('main section[id]');

  /* ---------- Año actual en el pie de página ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Altura del header (para scroll-margin) ---------- */
  const setHeaderHeight = () => {
    document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
  };
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);
  window.addEventListener('load', setHeaderHeight);

  /* ---------- Menú móvil ---------- */
  const menuToggle = $('#menuToggle');
  const menuLabel = $('#menuToggleLabel');
  const mainNav = $('#mainNav');

  const setMenu = (open) => {
    mainNav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuLabel.textContent = open ? 'Cerrar' : 'Menú';
    setHeaderHeight();
  };

  menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 820) setMenu(false);
  });

  /* ---------- Sección activa + breadcrumb ---------- */
  let activeId = null;

  const setActive = (id) => {
    if (id === activeId) return;
    activeId = id;
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      if (isActive) {
        link.setAttribute('aria-current', 'location');
        breadcrumbCurrent.textContent = link.textContent.trim();
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  /* ---------- Estado del scroll (progreso, header, volver arriba) ---------- */
  let ticking = false;

  const update = () => {
    ticking = false;
    const doc = document.documentElement;
    const y = window.scrollY;
    const max = doc.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

    progressBar.style.transform = `scaleX(${progress})`;
    header.classList.toggle('is-scrolled', y > 8);
    backToTop.classList.toggle('is-visible', y > 600);

    const offset = header.offsetHeight + 24;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top - offset <= 0) current = section;
    });
    if (window.innerHeight + y >= doc.scrollHeight - 2) {
      current = sections[sections.length - 1];
    }
    setActive(current.id);
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();

  /* ---------- Volver arriba ---------- */
  $$('[data-scroll-top]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
      const brand = $('#inicio');
      if (brand) brand.focus({ preventScroll: true });
    });
  });

  /* ---------- Filtros de proyectos ---------- */
  const filterButtons = $$('.filter');
  const projects = $$('.project');
  const filterStatus = $('#filterStatus');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let visible = 0;

      filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));

      projects.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.hidden = !show;
        card.classList.remove('is-entering');
        if (show) {
          visible += 1;
          void card.offsetWidth; // reinicia la animación
          card.classList.add('is-entering');
        }
      });

      filterStatus.textContent = filter === 'all'
        ? `Mostrando los ${projects.length} proyectos`
        : `Mostrando ${visible} de ${projects.length} proyectos en «${button.textContent.trim()}»`;
    });
  });

  projects.forEach((card) => {
    card.addEventListener('animationend', () => card.classList.remove('is-entering'));
  });

  /* ---------- Foto de perfil: respaldo si no carga ---------- */
  const photo = $('#profilePhoto');
  const photoBox = $('#heroPhoto');
  if (photo && photoBox) {
    const showFallback = () => photoBox.classList.add('is-missing');
    photo.addEventListener('error', showFallback);
    if (photo.complete && photo.naturalWidth === 0) showFallback();
  }
})();
