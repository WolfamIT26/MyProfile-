// Lazy loading images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Scroll to top button
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-top-btn';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--accent-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s;
        z-index: 1000;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Progress bar
const createProgressBar = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--accent-color);
        z-index: 1000;
        transition: width 0.1s;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Mini game "Anh Năm Né Deadline"
const createMiniGame = () => {
    const gameContainer = document.createElement('div');
    gameContainer.className = 'mini-game';
    gameContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: var(--bg-secondary);
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        display: none;
    `;
    
    const gameContent = `
        <h3>Anh Năm Né Deadline</h3>
        <div class="game-area" style="
            width: 200px;
            height: 200px;
            position: relative;
            background: var(--bg-primary);
            border: 2px solid var(--accent-color);
            margin: 1rem 0;
        ">
            <div class="player" style="
                width: 20px;
                height: 20px;
                background: var(--accent-color);
                position: absolute;
                border-radius: 50%;
            "></div>
        </div>
        <button class="start-game">Bắt đầu</button>
    `;
    
    gameContainer.innerHTML = gameContent;
    document.body.appendChild(gameContainer);
    
    // Game logic
    let isPlaying = false;
    let score = 0;
    const player = gameContainer.querySelector('.player');
    const gameArea = gameContainer.querySelector('.game-area');
    const startButton = gameContainer.querySelector('.start-game');
    
    const movePlayer = (e) => {
        if (!isPlaying) return;
        
        const rect = gameArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        player.style.left = Math.min(Math.max(x - 10, 0), rect.width - 20) + 'px';
        player.style.top = Math.min(Math.max(y - 10, 0), rect.height - 20) + 'px';
    };
    
    const createDeadline = () => {
        if (!isPlaying) return;
        
        const deadline = document.createElement('div');
        deadline.className = 'deadline';
        deadline.style.cssText = `
            width: 10px;
            height: 10px;
            background: red;
            position: absolute;
            border-radius: 50%;
            left: ${Math.random() * 180}px;
            top: 0;
        `;
        
        gameArea.appendChild(deadline);
        
        let pos = 0;
        const fall = setInterval(() => {
            if (!isPlaying) {
                clearInterval(fall);
                return;
            }
            
            pos += 2;
            deadline.style.top = pos + 'px';
            
            // Check collision
            const playerRect = player.getBoundingClientRect();
            const deadlineRect = deadline.getBoundingClientRect();
            
            if (
                playerRect.left < deadlineRect.right &&
                playerRect.right > deadlineRect.left &&
                playerRect.top < deadlineRect.bottom &&
                playerRect.bottom > deadlineRect.top
            ) {
                gameOver();
                clearInterval(fall);
            }
            
            // Remove if out of bounds
            if (pos > 200) {
                deadline.remove();
                score++;
                clearInterval(fall);
            }
        }, 20);
        
        setTimeout(createDeadline, Math.random() * 2000 + 1000);
    };
    
    const gameOver = () => {
        isPlaying = false;
        alert(`Game Over! Score: ${score}`);
        gameContainer.style.display = 'none';
        score = 0;
    };
    
    startButton.addEventListener('click', () => {
        isPlaying = true;
        gameArea.innerHTML = '';
        gameArea.appendChild(player);
        createDeadline();
    });
    
    gameArea.addEventListener('mousemove', movePlayer);
    
    // Toggle game with keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'g') {
            gameContainer.style.display = gameContainer.style.display === 'none' ? 'block' : 'none';
        }
    });
};

// Initialize features
document.addEventListener('DOMContentLoaded', () => {
    createScrollTopButton();
    createProgressBar();
    createMiniGame();
}); 