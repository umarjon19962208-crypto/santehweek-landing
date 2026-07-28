'use strict';

// Footer yilini avtomatik yangilash
const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Scroll animatsiyalari
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.13 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

// Qalqib chiquvchi Telegram tugmasi
const floatingBot = document.getElementById('floatingBot');
const hintClose = document.querySelector('.hint-close');
const floatingHint = document.querySelector('.floating-hint');

window.setTimeout(() => {
  floatingBot?.classList.add('show');
}, 1200);

hintClose?.addEventListener('click', () => {
  floatingHint?.remove();
});

// Meta Pixel o'rnatilganda barcha bot tugmalarini kuzatish
// Pixel kodi keyin qo'shiladi. Bu kod fbq mavjud bo'lsa avtomatik event yuboradi.
document.querySelectorAll('.track-bot').forEach((button) => {
  button.addEventListener('click', () => {
    const eventName = button.dataset.track || 'TelegramBotClick';

    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, {
        destination: 'telegram_bot',
        button_text: button.textContent.trim()
      });
    }
  });
});

// Details ochilganda qolganlarini yopish
const faqItems = document.querySelectorAll('.accordion details');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
