// Highlight active nav link based on current page
(function setActiveNav(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if(href === path) a.classList.add("active");
  });
})();

// Reveal animation on scroll
(function revealOnScroll(){
  const els = document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window)){
    els.forEach(el => el.classList.add("show"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();

// Contact form validation (client-side)
(function contactForm(){
  const form = document.getElementById("contactForm");
  if(!form) return;

  const okBox = document.getElementById("successBox");
  const errBox = document.getElementById("errorBox");

  function show(box, msg){
    box.textContent = msg;
    box.style.display = "block";
  }
  function hide(box){ box.style.display = "none"; }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    hide(okBox); hide(errBox);

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if(name.length < 2) return show(errBox, "Please enter your name (at least 2 characters).");
    if(!emailOk) return show(errBox, "Please enter a valid email address.");
    if(subject.length < 3) return show(errBox, "Please enter a subject (at least 3 characters).");
    if(message.length < 10) return show(errBox, "Message must be at least 10 characters.");

    // Demo success (no backend). In real hosting, connect to Formspree/Netlify forms/etc.
    form.reset();
    show(okBox, "Thanks! Your message is validated and ready to send (demo).");
  });
})();
