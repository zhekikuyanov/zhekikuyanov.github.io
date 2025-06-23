document.addEventListener('DOMContentLoaded', function() {
    // Burger menu
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');
    
    if (burgerMenu && nav) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Hero slider
    const heroSlider = document.querySelector('.hero__slider');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.slider__slide');
        const dotsContainer = document.querySelector('.slider__dots');
        let currentSlide = 0;
        
        // Create dots
        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider__dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.slider__dot');
        
        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = (index + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        // Auto slide change
        let slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
        
        // Pause on hover
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        heroSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        });
    }
    
    // Animate stats on about page
    const stats = document.querySelectorAll('.stat__number');
    if (stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
        
        function animateValue(el) {
            const end = parseInt(el.getAttribute('data-count'), 10);
            const duration = 2000;
            const start = 0;
            const increment = end / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                el.textContent = Math.floor(current);
                if (current >= end) {
                    el.textContent = end;
                    clearInterval(timer);
                }
            }, 16);
        }
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to the server
            // For demo purposes, we'll just show an alert
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
});