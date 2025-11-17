// =========================
// Fill current year
// =========================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================
// Mobile Navigation
// =========================
const openNav = document.getElementById('openNav');
const closeNav = document.getElementById('closeNav');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMobileMenu() {
  mobileNav.classList.add('open');
  mobileOverlay.classList.add('active');
  mobileNav.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden'; // Empêche le scroll
}

function closeMobileMenu() {
  mobileNav.classList.remove('open');
  mobileOverlay.classList.remove('active');
  mobileNav.setAttribute('aria-hidden','true');
  document.body.style.overflow = ''; // Restaure le scroll
}

// Event listeners pour ouvrir/fermer le menu
openNav?.addEventListener('click', openMobileMenu);
closeNav?.addEventListener('click', closeMobileMenu);
mobileOverlay?.addEventListener('click', closeMobileMenu);

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.mobile-link').forEach(el=>{
  el.addEventListener('click', closeMobileMenu);
});

// =========================
// Header Scroll Effect
// =========================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  // Change header style on scroll
  if(window.scrollY > 40) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }

  // Back to top visibility
  const back = document.getElementById('backToTop');
  if(window.scrollY > 400) {
    back.classList.add('visible');
  } else {
    back.classList.remove('visible');
  }

  // Reveal destination cards on scroll
  document.querySelectorAll('.card').forEach(card=>{
    const rect = card.getBoundingClientRect();
    if(rect.top < window.innerHeight - 80) {
      card.classList.add('visible');
    }
  });
});

// =========================
// Smooth Scroll Navigation
// =========================
document.querySelectorAll('a.nav-link, a.mobile-link').forEach(link=>{
  link.addEventListener('click', function(e){
    e.preventDefault();
    const target = this.getAttribute('href');
    document.querySelector(target)?.scrollIntoView({behavior:'smooth'});
    
    // Update active state
    document.querySelectorAll('a.nav-link, a.mobile-link').forEach(a => a.classList.remove('active'));
    document.querySelectorAll(`a[href="${target}"]`).forEach(a => a.classList.add('active'));
  });
});

// =========================
// Destination Filters
// =========================
const filters = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.grid .card');

filters.forEach(btn=>{
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filters.forEach(b=>b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.dataset.filter;
    
    // Filter cards
    cards.forEach(card=>{
      if(filter === 'all' || card.dataset.category === filter){
        card.style.display = '';
        setTimeout(()=>card.classList.add('visible'), 20);
      } else {
        card.classList.remove('visible');
        setTimeout(()=>card.style.display='none', 280);
      }
    });
  });
});

// =========================
// Testimonials Slider
// =========================
const dots = document.querySelectorAll('.testimonial-dot');
const testimonials = document.querySelectorAll('.testimonial');

// Manual navigation with dots
dots.forEach(dot=>{
  dot.addEventListener('click', ()=> {
    const idx = parseInt(dot.dataset.index, 10);
    
    // Remove active class from all
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    // Add active class to selected
    testimonials[idx]?.classList.add('active');
    dots[idx]?.classList.add('active');
  });
});

// Auto-rotate testimonials every 6 seconds
let tIdx = 0;
setInterval(()=>{
  tIdx = (tIdx + 1) % testimonials.length;
  
  // Remove active class from all
  testimonials.forEach(t => t.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  
  // Add active class to current
  testimonials[tIdx]?.classList.add('active');
  dots[tIdx]?.classList.add('active');
}, 6000);

// =========================
// FAQ Accordion
// =========================
document.querySelectorAll('.faq-item').forEach(item=>{
  item.querySelector('.faq-question').addEventListener('click', ()=>{
    // Fermer les autres items (accordion behavior)
    document.querySelectorAll('.faq-item').forEach(otherItem => {
      if(otherItem !== item) {
        otherItem.classList.remove('active');
      }
    });
    
    // Toggle current item
    item.classList.toggle('active');
  });
});

// =========================
// Contact Form Validation
// =========================
const form = document.getElementById('contactForm');

form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  
  const name = form.name;
  const email = form.email;
  const message = form.message;
  let valid = true;

  // Reset all errors
  form.querySelectorAll('.field').forEach(f=> f.classList.remove('error'));
  form.querySelectorAll('.error-message').forEach(em => em.style.display = 'none');

  // Validate name
  if(!name.value.trim()){ 
    name.parentElement.classList.add('error'); 
    name.parentElement.querySelector('.error-message').style.display='block'; 
    valid=false; 
  }
  
  // Validate email
  if(!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)){ 
    email.parentElement.classList.add('error'); 
    email.parentElement.querySelector('.error-message').style.display='block'; 
    valid=false; 
  }
  
  // Validate message
  if(!message.value.trim()){ 
    message.parentElement.classList.add('error'); 
    message.parentElement.querySelector('.error-message').style.display='block'; 
    valid=false; 
  }

  if(!valid) return;

  // Show loading state
  const btn = form.querySelector('button');
  const loader = btn.querySelector('.loader');
  loader.style.display = 'inline-block';
  btn.disabled = true;

  // Simulate form submission (replace with actual API call)
  setTimeout(()=>{
    loader.style.display = 'none';
    btn.disabled = false;
    form.reset();
    
    // Show success message
    document.getElementById('successMessage').style.display = 'block';
    
    // Hide success message after 4.5 seconds
    setTimeout(()=> {
      document.getElementById('successMessage').style.display = 'none';
    }, 4500);
  }, 1100);
});

// =========================
// Back to Top Button
// =========================
document.getElementById('backToTop')?.addEventListener('click', ()=> {
  window.scrollTo({top:0, behavior:'smooth'});
});

// =========================
// Initial Card Reveal
// =========================
document.addEventListener('DOMContentLoaded', ()=>{
  // Reveal cards that are already in viewport on page load
  document.querySelectorAll('.card').forEach(card=>{
    const rect = card.getBoundingClientRect();
    if(rect.top < window.innerHeight - 80) {
      card.classList.add('visible');
    }
  });
});