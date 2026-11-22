(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const navLinks = nav ? nav.querySelectorAll('a') : [];
  const year = document.getElementById('year');
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleIcon = themeToggle?.querySelector('.theme-toggle-icon');
  const themeToggleLabel = themeToggle?.querySelector('.theme-toggle-label');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  if (year) year.textContent = new Date().getFullYear();

  // Accessible light/dark switch. The selected theme is remembered on this device.
  const applyTheme = (theme, savePreference = false) => {
    const isDark = theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      themeToggle.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    }
    if (themeToggleIcon) themeToggleIcon.textContent = isDark ? '☀' : '☾';
    if (themeToggleLabel) themeToggleLabel.textContent = isDark ? 'Light' : 'Dark';
    if (themeColorMeta) themeColorMeta.setAttribute('content', isDark ? '#0b1016' : '#10243a');

    if (savePreference) {
      try {
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
      } catch (error) {
        // Theme switching still works for this page if browser storage is disabled.
      }
    }
  };

  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light';
  } catch (error) {
    savedTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  }
  applyTheme(savedTheme);
  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
  });

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(willOpen));
      menuButton.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('is-open', willOpen);
      document.body.classList.toggle('menu-open', willOpen);
    });

    navLinks.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // Reveal elements as they enter the viewport. Falls back gracefully on older browsers.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Accessible project preview lightbox with previous/next navigation.
  const previewModal = document.getElementById('project-preview');
  const previewTriggers = Array.from(document.querySelectorAll('.project-preview-trigger'));
  const previewImage = document.getElementById('preview-image');
  const previewTitle = document.getElementById('preview-title');
  const previewDescription = document.getElementById('preview-description');
  const previewTags = document.getElementById('preview-tags');
  const previewCount = document.getElementById('preview-count');
  const previewPrevious = document.getElementById('preview-previous');
  const previewNext = document.getElementById('preview-next');
  let activePreviewIndex = 0;
  let lastPreviewTrigger = null;

  const renderProjectPreview = (index) => {
    if (!previewModal || !previewTriggers.length) return;
    activePreviewIndex = (index + previewTriggers.length) % previewTriggers.length;
    const trigger = previewTriggers[activePreviewIndex];
    const card = trigger.closest('.project-card');
    const image = trigger.querySelector('img');
    const title = card?.querySelector('.project-body h3');
    const description = card?.querySelector('.project-body > p');
    const tags = card?.querySelector('.project-tags');

    if (image && previewImage) {
      previewImage.src = image.getAttribute('src');
      previewImage.alt = image.alt;
    }
    if (previewTitle) previewTitle.textContent = title?.textContent.trim() || 'Project preview';
    if (previewDescription) previewDescription.textContent = description?.textContent.trim() || '';
    if (previewTags) previewTags.innerHTML = tags ? tags.innerHTML : '';
    if (previewCount) previewCount.textContent = `${String(activePreviewIndex + 1).padStart(2, '0')} / ${String(previewTriggers.length).padStart(2, '0')}`;
    if (previewPrevious) previewPrevious.disabled = previewTriggers.length < 2;
    if (previewNext) previewNext.disabled = previewTriggers.length < 2;
  };

  const openProjectPreview = (index, trigger) => {
    if (!previewModal) return;
    lastPreviewTrigger = trigger || document.activeElement;
    renderProjectPreview(index);
    previewModal.classList.add('is-open');
    previewModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('preview-open');
    const closeButton = previewModal.querySelector('.preview-close');
    if (closeButton) closeButton.focus();
  };

  const closeProjectPreview = () => {
    if (!previewModal || !previewModal.classList.contains('is-open')) return;
    previewModal.classList.remove('is-open');
    previewModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('preview-open');
    if (lastPreviewTrigger && typeof lastPreviewTrigger.focus === 'function') lastPreviewTrigger.focus();
  };

  previewTriggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => openProjectPreview(index, trigger));
  });
  previewModal?.querySelectorAll('[data-close-preview]').forEach((element) => {
    element.addEventListener('click', closeProjectPreview);
  });
  previewPrevious?.addEventListener('click', () => renderProjectPreview(activePreviewIndex - 1));
  previewNext?.addEventListener('click', () => renderProjectPreview(activePreviewIndex + 1));
  document.addEventListener('keydown', (event) => {
    if (!previewModal?.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeProjectPreview();
    if (event.key === 'ArrowLeft') renderProjectPreview(activePreviewIndex - 1);
    if (event.key === 'ArrowRight') renderProjectPreview(activePreviewIndex + 1);
  });

})();
