// Parallax Effect Implementation
document.addEventListener('DOMContentLoaded', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    // Check if device supports hover and is a large enough screen
    // We don't want to run heavy parallax on small touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX);
            const yAxis = (window.innerHeight / 2 - e.pageY);
            
            // Use requestAnimationFrame for smooth performance
            requestAnimationFrame(() => {
                parallaxElements.forEach(el => {
                    const speed = el.getAttribute('data-parallax-speed') || 0.02;
                    const x = xAxis * speed;
                    const y = yAxis * speed;
                    
                    // Keep existing transforms if they exist (like translate for floating)
                    let currentTransform = '';
                    if (el.classList.contains('float')) {
                       // Handled by CSS keyframes, but combining dynamic translate with keyframes 
                       // can be trickier. For simple parallax we apply to a wrapper or rely on CSS variables.
                       // For safety, we just apply transform. CSS keyframes vs style.transform can conflict,
                       // but on wrapper elements it works fine.
                    }
                    
                    el.style.transform = `translate(${x}px, ${y}px)`;
                });
            });
        });
    }

    // Add intersection observer for fade-in scroll effects (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial state for sections to fade in
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
});
