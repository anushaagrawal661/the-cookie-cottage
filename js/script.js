// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Feather Icons
  feather.replace();

  // Header scroll effect
  const header = document.querySelector('.header');
  const heroSection = document.querySelector('.hero');

  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Menu tabs functionality
  const menuCategoryBtns = document.querySelectorAll('.menu-category-btn');
  const menuContents = document.querySelectorAll('.menu-content');

  // Reviews slider functionality
  const reviewsTrack = document.querySelector('.reviews-track');
  const reviewCards = document.querySelectorAll('.review-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const sliderDots = document.querySelectorAll('.slider-dot');

  if (reviewsTrack && reviewCards.length > 0) {
    let currentSlide = 0;
    const slidesPerView = window.innerWidth < 768 ? 1 : 3;
    const slideWidth = 100 / slidesPerView;
    const totalSlides = Math.ceil(reviewCards.length / slidesPerView);

    // Set initial slide width and track width
    reviewCards.forEach(card => {
      card.style.flex = `0 0 ${slideWidth}%`;
      card.style.maxWidth = `${slideWidth}%`;
    });

    reviewsTrack.style.width = `${(reviewCards.length / slidesPerView) * 100}%`;

    function updateSlider() {
      const translateValue = -currentSlide * slideWidth;
      reviewsTrack.style.transform = `translateX(${translateValue}%)`;

      // Update active dot
      if (sliderDots) {
        sliderDots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentSlide);
        });
      }
    }

    // Previous slide
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
        updateSlider();
      });
    }

    // Next slide
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
        updateSlider();
      });
    }

    // Dots navigation
    sliderDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
      });
    });

    // Initialize first slide
    updateSlider();

    // Auto slide
    let slideInterval = setInterval(() => {
      currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
      updateSlider();
    }, 5000);

    // Pause auto slide on hover
    reviewsTrack.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });

    reviewsTrack.addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => {
        currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
        updateSlider();
      }, 5000);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      const newSlidesPerView = window.innerWidth < 768 ? 1 : 3;
      if (newSlidesPerView !== slidesPerView) {
        location.reload();
      }
    });
  }

  // View more button functionality
  const viewMoreBtn = document.querySelector('.view-more-btn');
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', function() {
      const cookiesMenu = document.getElementById('cookies-menu');
      if (cookiesMenu) {
        const hiddenItems = cookiesMenu.querySelectorAll('.menu-item.hidden');
        hiddenItems.forEach(item => {
          item.classList.remove('hidden');
        });

        // Hide the button after showing all items
        this.style.display = 'none';
      }
    });
  }

  // Scroll event for header change
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');

      // Toggle between menu and close icon
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        if (mobileNav.classList.contains('active')) {
          icon.setAttribute('data-feather', 'x');
        } else {
          icon.setAttribute('data-feather', 'menu');
        }
        feather.replace();
      }
    });
  }

  // Close mobile menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('active');
      document.body.classList.remove('menu-open');
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        icon.setAttribute('data-feather', 'menu');
        feather.replace();
      }
    });
  });

  // Menu category tabs
  menuCategoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      menuCategoryBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');

      // Get the category from data attribute
      const category = this.getAttribute('data-category');

      // Hide all menu contents
      menuContents.forEach(content => content.classList.remove('active'));

      // Show the selected category content
      const targetContent = document.getElementById(`${category}-menu`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const fadeElements = document.querySelectorAll('.section-header, .about-content, .menu-description, .behind-scenes-content, .featured-content, .contact-content');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.2
  });

  fadeElements.forEach(element => {
    element.classList.add('fade-element');
    fadeObserver.observe(element);
  });

  // Add CSS for fade animations
  const style = document.createElement('style');
  style.textContent = `
    .fade-element {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Initialize first menu category
  if (menuCategoryBtns.length > 0) {
    menuCategoryBtns[0].classList.add('active');
  }

  if (menuContents.length > 0) {
    menuContents[0].classList.add('active');
  }
});