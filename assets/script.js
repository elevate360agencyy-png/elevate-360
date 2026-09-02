// ELEVATE 360 — shared interactivity

document.addEventListener('DOMContentLoaded', () => {
  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // contact form (static demo — no backend, shows confirmation state)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.getElementById('form-success');
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Sending…';
        btn.disabled = true;
      }
      setTimeout(() => {
        if (success) success.classList.add('show');
        form.reset();
        if (btn) {
          btn.textContent = 'Send message';
          btn.disabled = false;
        }
      }, 700);
    });
  }
});
const contactForm = document.getElementById("contact-form");

if (contactForm) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    const successMessage =
      document.getElementById("form-success");


    const originalButtonText =
      submitButton.innerHTML;


    // Get all form values

    const formData = new FormData(contactForm);


    // Add page information

    formData.append(
      "page",
      window.location.href
    );


    // Convert data into URL encoded format

    const data =
      new URLSearchParams();


    for (const [key, value] of formData.entries()) {

      data.append(key, value);

    }


    // Disable button while sending

    submitButton.disabled = true;

    submitButton.innerHTML =
      "Sending...";


    if (successMessage) {

      successMessage.style.display =
        "none";

    }


    try {

      await fetch(
        "https://script.google.com/macros/s/AKfycbxcQtyr7-b8YZjHfigOzUycm24ES2OoKHm2nOqHBmPW6wqWhke4-JqzVs4wCO4waCIunA/exec",
        {

          method: "POST",

          body: data,

          mode: "no-cors"

        }
      );


      // Show success message

      if (successMessage) {

        successMessage.style.display =
          "block";

      }


      // Clear the form

      contactForm.reset();


      submitButton.innerHTML =
        "Message Sent ✓";


      // Restore button after 3 seconds

      setTimeout(function () {

        submitButton.disabled = false;

        submitButton.innerHTML =
          originalButtonText;

      }, 3000);


    } catch (error) {

      console.error(
        "Form submission error:",
        error
      );


      submitButton.disabled = false;

      submitButton.innerHTML =
        "Try Again";

    }

  });

}