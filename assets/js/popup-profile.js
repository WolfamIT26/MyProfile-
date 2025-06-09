// Hàm để hiển thị pop-up
function showPopup() {
    const overlay = document.getElementById('popupOverlay');
    const popup = document.getElementById('myPopup');
    if (overlay && popup) {
        overlay.classList.add('active');
        popup.classList.add('active');
    }
}

// Hàm để đóng pop-up
function closePopup() {
    const overlay = document.getElementById('popupOverlay');
    const popup = document.getElementById('myPopup');
    if (overlay && popup) {
        overlay.classList.remove('active');
        popup.classList.remove('active');
    }
}

// Đợi DOM tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Hiển thị popup ngay khi trang tải xong
    showPopup();
    
    // Thêm event listener cho nút đóng
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closePopup);
    }
    
    // Thêm event listener cho overlay
    const overlay = document.getElementById('popupOverlay');
    if (overlay) {
        overlay.addEventListener('click', closePopup);
    }

    // Thêm event listener cho nút "Nhắn Tin"
    const messageButton = document.getElementById('messageButton');
    if (messageButton) {
        messageButton.addEventListener('click', function() {
            window.location.href = 'contact.html'; // Chuyển hướng đến trang liên hệ
            closePopup(); // Đóng pop-up sau khi chuyển hướng
        });
    }

    // Thêm event listener cho nút "Theo Dõi"
    const followButton = document.getElementById('followButton');
    if (followButton) {
        followButton.addEventListener('click', function() {
            alert('Cảm ơn bạn đã theo dõi!'); // Hiển thị thông báo
            // Bạn có thể thay đổi hành vi này sau để thực hiện chức năng theo dõi thực tế
            closePopup(); // Đóng pop-up
        });
    }
}); 