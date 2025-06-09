document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.getElementById('easter-egg');
    let clickCount = 0;
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
    let currentColorIndex = 0;
    
    avatar.addEventListener('click', () => {
        clickCount++;
        
        // Thay đổi màu border
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        avatar.style.border = `3px solid ${colors[currentColorIndex]}`;
        
        // Hiệu ứng xoay
        avatar.style.transform = `rotate(${clickCount * 45}deg)`;
        
        // Reset sau 1 giây
        setTimeout(() => {
            avatar.style.transform = 'rotate(0deg)';
        }, 1000);
        
        // Easter egg đặc biệt sau 5 lần click
        if (clickCount === 5) {
            showEasterEggMessage();
        }
    });
    
    function showEasterEggMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 1000;
            text-align: center;
        `;
        
        message.innerHTML = `
            <h2>🎉 Bạn đã tìm thấy Easter Egg! 🎉</h2>
            <p>Chúc mừng! Bạn là người tinh mắt!</p>
            <button onclick="this.parentElement.remove()" style="
                margin-top: 10px;
                padding: 5px 10px;
                border: none;
                border-radius: 5px;
                background: #4a90e2;
                color: white;
                cursor: pointer;
            ">Đóng</button>
        `;
        
        document.body.appendChild(message);
        
        // Reset click count
        clickCount = 0;
    }
}); 