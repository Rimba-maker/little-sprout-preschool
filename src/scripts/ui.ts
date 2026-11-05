/** Small, dependency-free behaviours: reveal, nav toggle, visit preselect, newsletter. */
document.documentElement.classList.add('js');

// Reveal on scroll. Visible by default; JS only brings things in.
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      el.classList.add('is-in');
      io.unobserve(el);
      // After the entrance, drop the stagger delay so hover feels instant.
      window.setTimeout(() => { el.style.transitionDelay = '0s'; }, 1400);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
);
document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => io.observe(el));

// Mobile nav
const nav = document.getElementById('navbar');
const toggle = nav?.querySelector<HTMLButtonElement>('.nav__toggle');
const setOpen = (open: boolean) => {
  nav?.setAttribute('data-open', String(open));
  toggle?.setAttribute('aria-expanded', String(open));
  toggle?.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
};
toggle?.addEventListener('click', () => setOpen(nav?.getAttribute('data-open') !== 'true'));
nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

// Newsletter (Netlify Forms over fetch)
document.querySelectorAll<HTMLFormElement>('form[data-ajax-form]').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    const btn = form.querySelector<HTMLButtonElement>('button[type=submit]');
    if (btn) btn.disabled = true;
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!res.ok) throw new Error();
      form.reset();
      if (status) { status.classList.remove('sr-only'); status.textContent = 'Terima kasih, Anda sudah terdaftar.'; }
    } catch {
      if (status) { status.classList.remove('sr-only'); status.textContent = 'Belum berhasil. Coba lagi sebentar lagi.'; }
    } finally {
      if (btn) btn.disabled = false;
    }
  });
});
