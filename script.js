// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                navbarToggler.click();
            }
        }
    });
});

// Update Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Contact Form Handling (sends to backend)
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const successMsg = document.getElementById('successMsg');

    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
    }

    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        if (res.ok) {
            successMsg.classList.remove('d-none');
            this.reset();
            setTimeout(() => successMsg.classList.add('d-none'), 3000);
        } else {
            const data = await res.json().catch(() => ({}));
            alert(data.error || 'Failed to send message. Please try again later.');
        }
    } catch (err) {
        console.error('Error sending contact form:', err);
        alert('Could not send message. Please check your connection and try again.');
    }
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.experience-card, .skill-item, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Update GitHub and LinkedIn Links
document.addEventListener('DOMContentLoaded', () => {
    // Replace with your actual GitHub and LinkedIn URLs
    const githubLink = document.querySelector('a[href="https://github.com"]');
    const linkedinLink = document.querySelector('a[href="https://linkedin.com"]');
    
    if (githubLink) {
        githubLink.href = 'https://github.com/yourusername'; // Replace with actual GitHub username
    }
    if (linkedinLink) {
        linkedinLink.href = 'https://linkedin.com/in/yourusername'; // Replace with actual LinkedIn username
    }
});