'use strict';

const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px' });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

const floatingBot = document.getElementById('floatingBot');
const hintClose = document.querySelector('.hint-close');
const floatingHint = document.querySelector('.floating-hint');
window.setTimeout(() => floatingBot?.classList.add('show'), 1200);
hintClose?.addEventListener('click', () => floatingHint?.remove());

document.querySelectorAll('.track-bot').forEach((button) => {
  button.addEventListener('click', () => {
    if (typeof window.fbq !== 'function') return;
    const eventName = button.dataset.track || 'TelegramBotClick';
    const buttonText = button.textContent.trim().replace(/\s+/g, ' ');
    window.fbq('track', 'Contact', {
      content_name: 'SantehWeek Telegram Bot',
      contact_method: 'telegram',
      button_text: buttonText
    });
    window.fbq('trackCustom', eventName, {
      destination: 'telegram_bot',
      button_text: buttonText
    });
  });
});

const faqItems = document.querySelectorAll('.accordion details');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
