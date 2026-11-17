(() => {
  'use strict';
  const key = 'senachub-theme';
  const root = document.documentElement;
  let theme = 'light';
  try { if (localStorage.getItem(key) === 'dark') theme = 'dark'; } catch {}
  root.dataset.theme = theme;

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.topbar-right');
    if (!container) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.setAttribute('role', 'switch');
    button.setAttribute('aria-label', 'Tema escuro');
    button.innerHTML = '<span class="theme-sun" aria-hidden="true">☀</span><span class="theme-track" aria-hidden="true"><span class="theme-thumb"></span></span><span class="theme-moon" aria-hidden="true">☾</span>';
    const update = () => {
      const dark = root.dataset.theme === 'dark';
      button.setAttribute('aria-checked', String(dark));
      button.title = dark ? 'Ativar tema claro' : 'Ativar tema escuro';
    };
    button.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, root.dataset.theme); } catch {}
      update();
    });
    window.addEventListener('storage', event => {
      if (event.key === key || event.key === null) {
        root.dataset.theme = event.newValue === 'dark' ? 'dark' : 'light';
        update();
      }
    });
    update();
    container.append(button);
  });
})();
