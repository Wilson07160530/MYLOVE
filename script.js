// Main JavaScript for Birthday Website

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initHero();
    initLoveLetter();
    initManifesto();
    initGallery();
    initTimeline();

    // tinanggal na ang initWishes()

    initFooter();
    initMusicPlayer();
    initVideoMessage(); // <-- idagdag ito
    initScrollAnimations();
    initConfetti();
});

// Hero Section Initialization
function initHero() {
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.15 + 0.3}s`;
    });
}

// Confetti Effect
function initConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const confettiCount = 250;
    const colors = ['#9333ea', '#4866ec', '#a855f7', '#f472b6', '#c026d3'];
    let animationFrame;
    let confettiActive = false;

    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 8 + 3;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    function createConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            confettiPieces.push(new Confetti());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });

        if (confettiActive) {
            animationFrame = requestAnimationFrame(animateConfetti);
        }
    }

    function startConfetti() {
        if (!confettiActive) {
            confettiActive = true;
            createConfetti();
            animateConfetti();

            // Stop confetti after 3 seconds
            setTimeout(() => {
                confettiActive = false;
                cancelAnimationFrame(animationFrame);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                confettiPieces.length = 0;
            }, 3000);
        }
    }

    // Trigger confetti after hero animation
    setTimeout(startConfetti, 1500);

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Love Letter Section
function initLoveLetter() {
    const titleElement = document.getElementById('letterTitle');
    const contentElement = document.getElementById('letterContent');

    titleElement.textContent = loveLetterData.title;

    loveLetterData.paragraphs.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        contentElement.appendChild(p);
    });
}

// Manifesto Section
function initManifesto() {
    const grid = document.getElementById('manifestoGrid');

    manifestoData.forEach((item, index) => {
        const manifestoItem = document.createElement('div');
        manifestoItem.className = 'manifesto-item scroll-animate';
        manifestoItem.style.animationDelay = `${index * 0.1}s`;

        manifestoItem.innerHTML = `
            <div class=\"manifesto-number\">
                <span>${item.number}</span>
            </div>
            <div class=\"manifesto-content\">
                <h3>${item.title}</h3>
                <p>${item.content}</p>
            </div>
        `;

        grid.appendChild(manifestoItem);
    });
}

// Photo Gallery
function initGallery() {
    const grid = document.getElementById('galleryGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    photosData.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = `${index * 0.1}s`;

        item.innerHTML = `
            <img src=\"${photo.url}\" alt=\"${photo.caption}\">
            <div class=\"gallery-overlay\">
                <div class=\"gallery-caption\">${photo.caption}</div>
            </div>
            <div class=\"gallery-corners corner-tl\"></div>
            <div class=\"gallery-corners corner-br\"></div>
        `;

        item.addEventListener('click', () => {
            lightboxImage.src = photo.url;
            lightboxCaption.textContent = photo.caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        grid.appendChild(item);
    });

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Timeline Section
function initTimeline() {
    const container = document.getElementById('timelineItems');

    memoriesData.forEach((memory, index) => {
        const item = document.createElement('div');
        item.className = 'timeline-item scroll-animate';
        item.style.animationDelay = `${index * 0.1}s`;

        item.innerHTML = `
            <div class=\"timeline-content\">
                <div class=\"timeline-date\">
                    <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">
                        <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/>
                    </svg>
                    <span>${memory.date}</span>
                </div>
                <h3>${memory.title}</h3>
                <p>${memory.description}</p>
            </div>
            <div class=\"timeline-dot\"></div>
            <div class=\"timeline-image\">
                <img src=\"${memory.image}\" alt=\"${memory.title}\">
                <div class=\"timeline-image-overlay\"></div>
            </div>
        `;

        container.appendChild(item);
    });
}

function initVideoMessage() {

    const birthdayVideo = document.getElementById("birthdayVideo");
    const audio = document.getElementById("audioPlayer");

    if (!birthdayVideo || !audio) return;

    birthdayVideo.addEventListener("play", () => {
        audio.pause();
    });

    birthdayVideo.addEventListener("ended", () => {
        audio.play().catch(() => {});
    });

}
// Footer Section
function initFooter() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Create floating hearts
    const heartsContainer = document.getElementById('floatingHeartsFooter');
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.className = 'footer-heart';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        heart.style.animationDuration = `${3 + Math.random() * 2}s`;

        heart.innerHTML = `
            <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"#f9a8d4\">
                <path d=\"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\"/>
            </svg>
        `;

        heartsContainer.appendChild(heart);
    }
}

// Music Player
function initMusicPlayer() {
    const player = document.getElementById('musicPlayer');
    const audio = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const closeBtn = document.getElementById('closePlayerBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const volumeIcon = document.getElementById('volumeIcon');
    const muteIcon = document.getElementById('muteIcon');
    const songStatus = player.querySelector('.song-status');
    const soundWaves = document.getElementById('soundWaves');

    let isPlaying = false;
    let isMuted = false;

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            songStatus.textContent = 'Click to play';
            soundWaves.style.display = 'none';
        } else {
            audio.play().catch(err => {
                console.log('Audio playback failed:', err);
            });
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            songStatus.textContent = 'Now playing...';
            soundWaves.style.display = 'flex';
        }
        isPlaying = !isPlaying;
    });

    muteBtn.addEventListener('click', () => {
        audio.muted = !audio.muted;
        isMuted = !isMuted;

        if (isMuted) {
            volumeIcon.style.display = 'none';
            muteIcon.style.display = 'block';
        } else {
            volumeIcon.style.display = 'block';
            muteIcon.style.display = 'none';
        }
    });

    closeBtn.addEventListener('click', () => {
        player.style.display = 'none';
        audio.pause();
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-100px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
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
}

// Custom smooth scroll implementation
let isScrolling = false;
let scrollTimeout;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 100);
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});
