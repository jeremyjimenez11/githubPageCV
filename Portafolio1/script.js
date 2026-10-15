(() => {
  "use strict";

  const progressBar = document.getElementById("scroll-progress-bar");
  const backToTop = document.getElementById("back-to-top");
  const menuToggle = document.getElementById("menu-toggle");
  const primaryNav = document.getElementById("primary-nav");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
  const projectCards = Array.from(document.querySelectorAll(".project-card"));
  const projectCount = document.getElementById("project-count");
  const emptyState = document.getElementById("empty-state");
  const yearElement = document.getElementById("current-year");

  if (yearElement) yearElement.textContent = String(new Date().getFullYear());

  // Progress bar and back-to-top visibility are updated together.
  let ticking = false;
  function updateScrollUI() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 420);
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener("resize", updateScrollUI);
  updateScrollUI();

  // Mobile navigation: supports keyboard and closes after choosing a section.
  function closeMenu() {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("open");
  }
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      primaryNav.classList.toggle("open", !isOpen);
    });
    navLinks.forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });
    document.addEventListener("click", event => {
      if (!primaryNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
  }

  // Highlight the current section, with a fallback for browsers without IntersectionObserver.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-25% 0px -58% 0px", threshold: [0, 0.1, 0.25, 0.5] });
    sections.forEach(section => observer.observe(section));
  }

  // Project filters update visible cards and announce the result count.
  function applyFilter(filter) {
    let visibleCount = 0;
    projectCards.forEach(card => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    if (projectCount) {
      projectCount.textContent = `${visibleCount} ${visibleCount === 1 ? "proyecto" : "proyectos"}`;
    }
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";
      filterButtons.forEach(item => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      applyFilter(filter);
    });
  });
})();
