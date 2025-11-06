// Basic interactive behaviors for the Fashion Week site:
// - Mobile nav toggle
// - Smooth scroll for anchor links
// - Lightbox for gallery items
// - Simple client-side RSVP form validation

document.addEventListener('DOMContentLoaded', function () {
  // header year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', siteNav.classList.contains('open'));
  });

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Lightbox / gallery
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryGrid?.addEventListener('click', (e) => {
    const btn = e.target.closest('.gallery-item');
    if (!btn) return;
    const src = btn.dataset.src || '';
    // If you replace placeholders with real <img> elements, you can read dataset or src.
    // For demo, we'll show a placeholder image if the file isn't present.
    lightboxImage.src = src || 'https://via.placeholder.com/1200x800?text=Fashion+Show';
    openLightbox();
  });

  function openLightbox() {
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImage.src = '';
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Simple RSVP form handling (client-side only)
  const rsvpForm = document.getElementById('rsvpForm');
  const formMsg = document.getElementById('formMsg');

  rsvpForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();

    if (!name || !email) {
      formMsg.textContent = 'Please provide your name and a valid email.';
      formMsg.style.color = '#ffb86b';
      return;
    }

    // In real deployment, hook this up to your server or a form provider.
    formMsg.textContent = 'Thanks! Your RSVP was received (demo).';
    formMsg.style.color = '#8ef6c0';
    form.reset();

    // Example: open mail client pre-filled (optional)
    // window.location.href = `mailto:info@fashionweek.example?subject=RSVP from ${encodeURIComponent(name)}&body=${encodeURIComponent('Message: ' + (form.message.value || ''))}`;
  });

});
