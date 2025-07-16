// Kids Portfolio JavaScript - Fun and Interactive!

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Photo upload functionality
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder, .photo-placeholder-gallery');
    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = 'inherit';
                        
                        // Clear placeholder content and add image
                        placeholder.innerHTML = '';
                        placeholder.appendChild(img);
                        
                        // Add success animation
                        placeholder.style.animation = 'bounce 0.6s ease-in-out';
                        setTimeout(() => {
                            placeholder.style.animation = '';
                        }, 600);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });
    });

    // Animate skill bars on scroll
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-fill');
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const width = bar.style.width;
                if (width && !bar.classList.contains('animated')) {
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                        bar.classList.add('animated');
                    }, 100);
                }
            }
        });
    }

    // Add scroll event listener for skill bars
    window.addEventListener('scroll', animateSkillBars);
    
    // Trigger animation on page load
    setTimeout(animateSkillBars, 500);

    // Add active class to navigation items
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.skill-category, .activity-card, .achievement-card, .about-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add floating animation to shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
    });

    // Add bounce animation for interactive elements
    const interactiveElements = document.querySelectorAll('.nav-link, .stat-item');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            this.style.animation = 'bounce 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Add CSS for bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 60%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            80% {
                transform: translateY(-5px);
            }
        }
        
        .nav-link.active {
            background: rgba(255,255,255,0.3) !important;
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);

    // Add confetti effect on page load
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.top = Math.random() * window.innerHeight + 'px';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = 'fall 3s linear forwards';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }

    // Add fall animation for confetti
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // Create confetti on page load
    for (let i = 0; i < 20; i++) {
        setTimeout(createConfetti, i * 100);
    }

    // Add interactive sound effects (optional)
    function playSound(type) {
        // This is a placeholder for sound effects
        // You can add actual sound files if desired
        console.log(`Playing ${type} sound`);
    }

    // Add click sounds to interactive elements
    const clickableElements = document.querySelectorAll('.nav-link, .photo-placeholder, .photo-placeholder-gallery');
    clickableElements.forEach(element => {
        element.addEventListener('click', () => {
            playSound('click');
        });
    });

    // Add parallax effect to floating shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Add typing effect to hero title
    function typeWriter(element, html, speed = 100) {
        let i = 0;
        let isTag = false;
        let output = '';
        function type() {
            if (i < html.length) {
                let char = html[i];
                output += char;
                element.innerHTML = output;
                if (char === '<') isTag = true;
                if (char === '>') isTag = false;
                i++;
                setTimeout(type, isTag ? 0 : speed);
            }
        }
        type();
    }

    // Optional: Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalHTML = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalHTML, 50);
        }, 1000);
    }

    // Add rainbow effect to navigation on hover
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.background = `linear-gradient(45deg, 
                hsl(${Math.random() * 360}, 70%, 60%), 
                hsl(${Math.random() * 360}, 70%, 60%))`;
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });

    // Polaroid random rotation
    document.querySelectorAll('.polaroid-photo').forEach(function(photo) {
        // Random rotation between -8deg and +8deg
        var rotate = (Math.random() * 16 - 8).toFixed(1);
        photo.style.transform = 'rotate(' + rotate + 'deg)';
        photo.setAttribute('data-rotate', rotate);
    });

    // Polaroid modal logic
    var modal = document.getElementById('polaroidModal');
    var modalImg = document.querySelector('.polaroid-modal-img');
    var modalCaption = document.querySelector('.polaroid-modal-caption');
    var modalClose = document.querySelector('.polaroid-modal-close');

    // Album modal logic
    var albumModal = document.getElementById('albumModal');
    var albumModalImg = document.querySelector('.album-modal-img');
    var albumModalCaption = document.querySelector('.album-modal-caption');
    var albumModalTitle = document.querySelector('.album-modal-title');
    var albumModalClose = document.querySelector('.album-modal-close');
    var albumCounter = document.querySelector('.album-counter');
    var prevBtn = document.querySelector('.prev-btn');
    var nextBtn = document.querySelector('.next-btn');
    
    var currentAlbumPhotos = [];
    var currentPhotoIndex = 0;

    // Handle individual polaroid photos (not in albums)
    document.querySelectorAll('.polaroid-photo:not(.album-photo)').forEach(function(photo) {
        photo.addEventListener('click', function() {
            var img = photo.querySelector('img');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalCaption.textContent = photo.getAttribute('data-caption') || img.alt;
            modal.classList.add('open');
        });
    });

    // Handle album clicks
    document.querySelectorAll('.polaroid-album').forEach(function(album) {
        album.addEventListener('click', function() {
            var photos = album.querySelectorAll('.album-photo');
            currentAlbumPhotos = Array.from(photos);
            currentPhotoIndex = 0;
            
            // Set album title
            albumModalTitle.textContent = album.getAttribute('data-album-title');
            
            // Show first photo
            showAlbumPhoto(0);
            
            // Open album modal
            albumModal.classList.add('open');
        });
    });

    function showAlbumPhoto(index) {
        if (currentAlbumPhotos.length === 0) return;
        
        var photo = currentAlbumPhotos[index];
        var img = photo.querySelector('img');
        
        albumModalImg.src = img.src;
        albumModalImg.alt = img.alt;
        albumModalCaption.textContent = photo.getAttribute('data-caption') || img.alt;
        
        // Update counter
        albumCounter.textContent = `${index + 1} / ${currentAlbumPhotos.length}`;
        
        // Update navigation buttons
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === currentAlbumPhotos.length - 1;
        
        currentPhotoIndex = index;
    }

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPhotoIndex > 0) {
                showAlbumPhoto(currentPhotoIndex - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentPhotoIndex < currentAlbumPhotos.length - 1) {
                showAlbumPhoto(currentPhotoIndex + 1);
            }
        });
    }

    // Close modals
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('open');
        });
    }
    
    if (albumModalClose) {
        albumModalClose.addEventListener('click', function() {
            albumModal.classList.remove('open');
        });
    }

    // Close modals on background click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });
    }
    
    if (albumModal) {
        albumModal.addEventListener('click', function(e) {
            if (e.target === albumModal) {
                albumModal.classList.remove('open');
            }
        });
    }

    // Keyboard navigation for album modal
    document.addEventListener('keydown', function(e) {
        if (albumModal.classList.contains('open')) {
            if (e.key === 'ArrowLeft' && currentPhotoIndex > 0) {
                showAlbumPhoto(currentPhotoIndex - 1);
            } else if (e.key === 'ArrowRight' && currentPhotoIndex < currentAlbumPhotos.length - 1) {
                showAlbumPhoto(currentPhotoIndex + 1);
            } else if (e.key === 'Escape') {
                albumModal.classList.remove('open');
            }
        }
    });

    // Touch/swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;

    function handleSwipe() {
        if (albumModal.classList.contains('open') && currentAlbumPhotos.length > 1) {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && currentPhotoIndex < currentAlbumPhotos.length - 1) {
                    // Swipe left - next photo
                    showAlbumPhoto(currentPhotoIndex + 1);
                } else if (diff < 0 && currentPhotoIndex > 0) {
                    // Swipe right - previous photo
                    showAlbumPhoto(currentPhotoIndex - 1);
                }
            }
        }
    }

    // Touch events for album modal
    if (albumModal) {
        albumModal.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            isSwiping = true;
        }, { passive: true });

        albumModal.addEventListener('touchmove', function(e) {
            if (isSwiping) {
                e.preventDefault();
            }
        }, { passive: false });

        albumModal.addEventListener('touchend', function(e) {
            if (isSwiping) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                isSwiping = false;
            }
        }, { passive: true });
    }

    // Add visual feedback for swipe
    function addSwipeFeedback() {
        const style = document.createElement('style');
        style.textContent = `
            .album-modal-content {
                transition: transform 0.3s ease;
            }
            .album-modal-content.swiping {
                transition: transform 0.1s ease;
            }
        `;
        document.head.appendChild(style);
    }
    addSwipeFeedback();

    console.log('🌟 Kids Portfolio loaded successfully! 🌟');
});

// Horizontal photo gallery scroll
function scrollPhotos(direction) {
    const gallery = document.getElementById('photoGallery');
    const photo = gallery.querySelector('.photo-item');
    if (!photo) return;
    const photoWidth = photo.offsetWidth + 20; // 20px gap
    gallery.scrollBy({
        left: direction * photoWidth,
        behavior: 'smooth'
    });
} 