// Navigation mobile toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#nav-links');

navToggle.addEventListener('click', () => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !isExpanded);
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('.site-header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Back to top button functionality
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Nettoyage : suppression des animations Intersection Observer et autres ajouts récents

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    header.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop;
});

// Add loading animation to page
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Typing effect for hero text (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect if desired
// const heroTitle = document.querySelector('.hero-text h1');
// if (heroTitle) {
//   const originalText = heroTitle.textContent;
//   typeWriter(heroTitle, originalText, 50);
// }

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Add hover effects to project cards
document.querySelectorAll('#projects li').forEach(project => {
  project.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  project.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add skill progress bars (optional enhancement)
function createSkillBars() {
  const skills = [
    { name: 'HTML/CSS', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'Flutter', level: 80 },
    { name: 'Angular', level: 75 },
    { name: 'Node.js', level: 70 },
    { name: 'ASP.NET Core', level: 65 }
  ];
  
  const skillsContainer = document.querySelector('#skills');
  if (skillsContainer) {
    const skillsGrid = document.createElement('div');
    skillsGrid.className = 'skills-grid';
    
    skills.forEach(skill => {
      const skillItem = document.createElement('div');
      skillItem.className = 'skill-item';
      
      skillItem.innerHTML = `
        <h3>${skill.name}</h3>
        <div class="skill-bar">
          <div class="skill-progress" style="width: ${skill.level}%"></div>
        </div>
        <span class="skill-level">${skill.level}%</span>
      `;
      
      skillsGrid.appendChild(skillItem);
    });
    
    // Replace existing content
    const existingContent = skillsContainer.querySelector('p');
    if (existingContent) {
      existingContent.remove();
    }
    skillsContainer.appendChild(skillsGrid);
  }
}

// Initialize skill bars
createSkillBars();

// Add contact form enhancement
function enhanceContactSection() {
  const contactSection = document.querySelector('#contact');
  if (contactSection) {
    const contactInfo = document.createElement('div');
    contactInfo.className = 'contact-info';
    
    contactInfo.innerHTML = `
      <div class="contact-item">
        <h3>📧 Email</h3>
        <p><a href="mailto:syzzyameth08@gmail.com">syzzyameth08@gmail.com</a></p>
      </div>
      <div class="contact-item">
        <h3>📱 Téléphone</h3>
        <p><a href="tel:+221773492733">+221 77 349 27 33</a></p>
      </div>
      <div class="contact-item">
        <h3>🌍 Localisation</h3>
        <p>Dakar, Sénégal</p>
      </div>
    `;
    
    // Replace existing content
    const existingContent = contactSection.querySelectorAll('p');
    existingContent.forEach(p => p.remove());
    contactSection.appendChild(contactInfo);
  }
}

// Initialize contact enhancement
enhanceContactSection();

// Validation et confirmation du formulaire de contact
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contact-success');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    ['name','email','subject','message'].forEach(id => {
      const input = contactForm.querySelector('#'+id);
      if (!input.value.trim()) {
        input.style.borderColor = 'red';
        valid = false;
      } else {
        input.style.borderColor = '';
      }
    });
    if (!valid) return;
    contactSuccess.style.display = 'block';
    contactForm.reset();
    setTimeout(() => { contactSuccess.style.display = 'none'; }, 4000);
  });
}
// Validation en temps réel
['name','email','subject','message'].forEach(id => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener('input', function() {
      if (this.value.trim()) {
        this.style.borderColor = '';
      }
    });
  }
});

// Add loading states and performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  // Preload critical resources
  const criticalImages = document.querySelectorAll('img[data-src]');
  criticalImages.forEach(img => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  });
  
  // Add performance monitoring
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Page loaded in ${loadTime}ms`);
    });
  }
});

// Loader d’attente au chargement
window.addEventListener('load', function() {
  const loader = document.getElementById('site-loader');
  if (loader) {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 600);
  }
});

// SPA navigation: afficher une seule section à la fois
const sections = [
  'about', 'education', 'experience', 'projects', 'skills', 'contact'
];

function showSection(sectionId) {
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      section.style.display = (id === sectionId) ? 'block' : 'none';
    }
  });
}

// Initialisation : afficher "À propos" et "Formation" au début
function showAboutAndEducation() {
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      section.style.display = (id === 'about' || id === 'education') ? 'block' : 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  showAboutAndEducation();

  // Navigation SPA
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').replace('#', '');
      if (sections.includes(targetId)) {
        e.preventDefault();
        showSection(targetId);
      }
    });
  });

  // Footer quick links
  document.querySelectorAll('.footer-section ul a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').replace('#', '');
      if (sections.includes(targetId)) {
        e.preventDefault();
        showSection(targetId);
      }
    });
  });
});

// Carrousel JS
const carouselTrack = document.querySelector('.carousel-track');
const carouselImgs = document.querySelectorAll('.carousel-img');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
let carouselIndex = 0;
function updateCarousel() {
  carouselImgs.forEach((img, i) => {
    img.style.transform = `translateX(${(i - carouselIndex) * 320}px)`;
  });
}
if (prevBtn && nextBtn && carouselImgs.length) {
  prevBtn.addEventListener('click', () => {
    carouselIndex = (carouselIndex - 1 + carouselImgs.length) % carouselImgs.length;
    updateCarousel();
  });
  nextBtn.addEventListener('click', () => {
    carouselIndex = (carouselIndex + 1) % carouselImgs.length;
    updateCarousel();
  });
  updateCarousel();
}