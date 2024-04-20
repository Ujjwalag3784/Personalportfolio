document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for anchor links
    const smoothScroll = (target, duration) => {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        let startTime = null;

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition - startPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target, 1000);
        });
    });

    // Add active class to the current navigation link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Add smooth scrolling to top button
    const scrollTopButton = document.getElementById('scrollTopButton');
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', () => {
            smoothScroll('#header', 1000);
        });
    }

    // Add animation to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate');

        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animated');
            } else {
                element.classList.remove('animated');
            }
        });
    };

    // Check if an element is in the viewport
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Add event listener for scroll event
    window.addEventListener('scroll', animateOnScroll);

    // Open email client when the contact email is clicked
    const emailLink = document.querySelector('a[href^="mailto"]');
    if (emailLink) {
        emailLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = event.target.href;
        });
    }

    // Additional functionalities can be added here
});
