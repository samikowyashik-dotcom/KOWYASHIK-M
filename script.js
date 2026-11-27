const menuButton = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('.site-nav');

if (menuButton && siteNavigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    siteNavigation.classList.toggle('is-open', !isOpen);
  });

  siteNavigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      siteNavigation.classList.remove('is-open');
    }
  });
}

document.querySelectorAll('[data-year]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  const formStatus = document.querySelector('#form-status');
  const fields = [...contactForm.querySelectorAll('input, textarea')];

  const validateField = (field) => {
    const error = document.querySelector(`#${field.id}-error`);
    let message = '';

    if (!field.value.trim()) {
      message = field.type === 'email' ? 'Please enter your email address.' : 'Please fill out this field.';
    } else if (field.type === 'email' && !field.validity.valid) {
      message = 'Enter an email address in the format name@example.com.';
    }

    field.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message;
    return !message;
  };

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const isValid = fields.map(validateField).every(Boolean);
    formStatus.className = `form-status ${isValid ? 'is-success' : 'is-error'}`;

    if (isValid) {
      formStatus.textContent = 'Your details look good. This demo does not send messages yet; please use the email link above.';
    } else {
      formStatus.textContent = 'Please correct the highlighted fields and try again.';
      contactForm.querySelector('[aria-invalid="true"]')?.focus();
    }
  });
}