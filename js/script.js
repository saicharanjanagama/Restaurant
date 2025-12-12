// Preloader
window.addEventListener('load', () => {
const p = document.getElementById('preloader');
if (p) p.style.display = 'none';
});

// Theme toggle (persists in localStorage)
function initThemeToggle(buttonId){
const btn = document.getElementById(buttonId);
if (!btn) return;
const icon = btn.querySelector('#theme-icon') || btn;


const setTheme = (theme) => {
if (theme === 'dark') document.body.classList.add('dark');
else document.body.classList.remove('dark');
localStorage.setItem('theme', theme);
if(icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
};


const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(saved);


btn.addEventListener('click', () => {
const current = document.body.classList.contains('dark') ? 'dark' : 'light';
setTheme(current === 'dark' ? 'light' : 'dark');
});
}

initThemeToggle('theme-toggle');



// Hero Image Slider
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.hero-slider img');
    if (!slides.length) return;

    let index = 0;
    slides[index].classList.add('active');

    setInterval(() => {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
    }, 3500);
});

// About Image Slider
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.about-slider img');
    if (!slides.length) return;

    let index = 0;
    slides[index].classList.add('active');

    setInterval(() => {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
    }, 3500);
});


// Testimonials auto-carousel
(function(){
const carousel = document.getElementById('testimonial-carousel');
if(!carousel) return;
const items = carousel.querySelectorAll('.testimonial');
let idx = 0;
setInterval(() => {
items[idx].classList.remove('active');
idx = (idx + 1) % items.length;
items[idx].classList.add('active');
}, 4500);
})(); 


// Scroll to top
function initScrollTop(btnId){
const btn = document.getElementById(btnId);
if(!btn) return;
window.addEventListener('scroll', () => {
btn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}
initScrollTop('scrollTopBtn');


// Year in footer
document.querySelectorAll('#year, #year-2, #year-3, #year-4').forEach(el => {
if(el) el.textContent = new Date().getFullYear();
});


// Menu filtering and search (menu.html)
(function(){
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.item');
const searchInput = document.getElementById('search');
if(filterButtons.length){
filterButtons.forEach(button => {
button.addEventListener('click', () => {
const filter = button.getAttribute('data-filter');
filterButtons.forEach(btn => btn.classList.remove('active'));
button.classList.add('active');
menuItems.forEach(item => {
const cat = item.getAttribute('data-category');
item.style.display = (filter === 'all' || cat === filter) ? 'block' : 'none';
});
});
});
}
if(searchInput){
searchInput.addEventListener('input', (e) => {
const term = e.target.value.toLowerCase();
menuItems.forEach(item => {
const name = item.querySelector('h3').textContent.toLowerCase();
const desc = (item.querySelector('.desc') || {textContent:''}).textContent.toLowerCase();
item.style.display = (name.includes(term) || desc.includes(term)) ? 'block' : 'none';
});
});
}
})();

// Booking form with validation and localStorage (contact.html)
(function(){
const form = document.getElementById('booking-form');
if(!form) return;
const msg = document.getElementById('form-message');


form.addEventListener('submit', (e) => {
e.preventDefault();
const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const date = document.getElementById('date').value;
const phone = document.getElementById('phone').value.trim();
const time = document.getElementById('time').value;
const party = document.getElementById('party').value || 1;
const message = document.getElementById('message').value.trim();


if(!name || !email || !date){
msg.textContent = 'Please fill in all required fields.';
msg.style.color = 'crimson';
return;
}
if(!/\S+@\S+\.\S+/.test(email)){
msg.textContent = 'Please enter a valid email.';
msg.style.color = 'crimson';
return;
}

// Save to localStorage (demo)
const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
bookings.push({id: Date.now(), name, email, phone, date, time, party, message});
localStorage.setItem('bookings', JSON.stringify(bookings));


msg.textContent = 'Booking request submitted! We will contact you soon.';
msg.style.color = 'green';
form.reset();
});
})();

// Load bookings on bookings.html
(function(){
const container = document.getElementById('bookings-container');
const clearBtn = document.getElementById('clear-bookings');
if(!container) return;


function render(){
const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
if(bookings.length === 0){
container.innerHTML = '<p>No bookings yet.</p>';
return;
}
container.innerHTML = bookings.map(b => `
<div class="booking-card" style="background:var(--card);padding:1rem;border-radius:10px;margin-bottom:1rem;box-shadow:0 6px 14px rgba(0,0,0,0.06)">
<strong>${b.name}</strong> — <span style="color:var(--muted)">${new Date(b.date).toLocaleDateString()}</span>
<p>${b.message || '—'}</p>
<div style="font-size:.9rem;color:var(--muted)">Email: ${b.email} • Phone: ${b.phone || '—'} • Party: ${b.party} • Time: ${b.time || '—'}</div>
</div>
`).join('');
}


render();
if(clearBtn) clearBtn.addEventListener('click', () => {
if(confirm('Clear all bookings from local storage?')){
localStorage.removeItem('bookings');
render();
}
});
})();


// Intersection Observer fade-in
const faders = document.querySelectorAll('.fade-in');
const obs = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if(entry.isIntersecting) entry.target.classList.add('show');
});
}, {threshold: 0.15});
faders.forEach(f => obs.observe(f));


// Accessibility helper: focus visible for keyboard users
(function(){
function handleFirstTab(e){
if(e.key === 'Tab') document.body.classList.add('user-is-tabbing');
window.removeEventListener('keydown', handleFirstTab);
}
window.addEventListener('keydown', handleFirstTab);
})();


// Hamburger menu
const hamburgers = document.querySelectorAll('.hamburger');
hamburgers.forEach(h => h.addEventListener('click', () => {
const nav = document.querySelector('.nav-links');
if(nav) nav.classList.toggle('open');
}));