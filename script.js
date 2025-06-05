
(() => {
  const body = document.body;
  const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const themeSwitch = document.getElementById('themeSwitch');
  const typedEl = document.querySelector('.typed');
  const typeTexts = ['B.Tech Graduate', 'Developer', 'Web Designer', 'Fresher'];

  // Create progress bar if it doesn't exist
  let progressBar = document.querySelector('.progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
  }

  // Create custom cursor
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  // Cursor movement
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Cursor hover effects
  document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
      cursor.classList.add('hover');
    } else {
      cursor.classList.remove('hover');
    }
  });

  // Enhanced Theme Toggle
  let isDark = true;
  const savedTheme = localStorage.getItem('dark-mode');
  if (savedTheme !== null) {
    isDark = savedTheme === 'true';
    body.classList.toggle('dark-mode', !isDark);
  }

  if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
      isDark = !isDark;
      body.classList.toggle('dark-mode', !isDark);
      localStorage.setItem('dark-mode', isDark);
      
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(0,245,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        left: 50%;
        top: 50%;
      `;
      themeSwitch.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }

  // Enhanced Mobile Menu
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.style.transform = navLinks.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
    });
  }

  // Enhanced Scroll Progress Bar and Navbar Effects
  let ticking = false;
  const updateScrollEffects = () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.setProperty('--progress', `${scrolled}%`);
    
    // Enhanced navbar scroll effect
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  });

  // Enhanced Scroll Reveal with Stagger Effect
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          
          // Add extra effects for specific elements
          if (entry.target.classList.contains('skills-list')) {
            const skillItems = entry.target.querySelectorAll('li');
            skillItems.forEach((item, i) => {
              setTimeout(() => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.opacity = '1';
              }, i * 100);
            });
          }
        }, index * 150);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
    
    // Set initial state for skills
    if (el.classList.contains('skills-list')) {
      const skillItems = el.querySelectorAll('li');
      skillItems.forEach(item => {
        item.style.transform = 'translateY(30px) scale(0.8)';
        item.style.opacity = '0';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      });
    }
  });

  // Enhanced Typewriter Effect with More Realistic Typing
  if (typedEl) {
    let typeIndex = 0, charIndex = 0, isDeleting = false;
    
    const typeEffect = () => {
      const currentText = typeTexts[typeIndex];
      const typingSpeed = isDeleting ? 50 : Math.random() * 100 + 50;
      
      if (isDeleting) {
        typedEl.textContent = currentText.slice(0, charIndex--);
        if (charIndex < 0) {
          isDeleting = false;
          typeIndex = (typeIndex + 1) % typeTexts.length;
          setTimeout(typeEffect, 500);
          return;
        }
      } else {
        typedEl.textContent = currentText.slice(0, charIndex++);
        if (charIndex > currentText.length) {
          isDeleting = true;
          setTimeout(typeEffect, 2000);
          return;
        }
      }
      
      setTimeout(typeEffect, typingSpeed);
    };
    
    // Start typing effect after hero animation
    setTimeout(typeEffect, 2000);
  }

  // Enhanced Floating Particles System
  const particlesContainer = document.getElementById('particles') || document.querySelector('.particles');
  if (particlesContainer) {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties for more variety
      const size = Math.random() * 4 + 2;
      const opacity = Math.random() * 0.8 + 0.2;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 5;
      
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${opacity};
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
      `;
      
      particlesContainer.appendChild(particle);

          setTimeout(() => {
            if (particle.parentNode) {
              particle.remove();
            }
          }, (duration + delay) * 1000);
        };
    
        // Create particles at interval
        setInterval(createParticle, 2000);
      }
    })();
