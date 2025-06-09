document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('profileModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close-modal');
    const profileCards = document.querySelectorAll('.profile-card');
    const modalImage = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const modalRole = document.getElementById('modalRole');
    const modalDescription = document.getElementById('modalDescription');
    const modalSkills = document.getElementById('modalSkills');
    const modalProjects = document.getElementById('modalProjects');
    const modalContact = document.getElementById('modalContact');

    // Hàm cập nhật nội dung modal
    function updateModalContent(card) {
        const image = card.querySelector('.profile-image').src;
        const name = card.querySelector('.profile-name').textContent;
        const role = card.querySelector('.profile-role').textContent;
        const description = card.querySelector('.profile-description').textContent;
        const skills = card.querySelector('.profile-skills').textContent;
        const projects = card.querySelector('.profile-projects').textContent;
        const contact = card.querySelector('.profile-contact').textContent;

        modalImage.src = image;
        modalName.textContent = name;
        modalRole.textContent = role;
        modalDescription.textContent = description;
        modalSkills.textContent = skills;
        modalProjects.textContent = projects;
        modalContact.textContent = contact;

        // Cập nhật các thuộc tính data-i18n
        modalName.setAttribute('data-i18n', card.querySelector('.profile-name').getAttribute('data-i18n'));
        modalRole.setAttribute('data-i18n', card.querySelector('.profile-role').getAttribute('data-i18n'));
        modalDescription.setAttribute('data-i18n', card.querySelector('.profile-description').getAttribute('data-i18n'));
        modalSkills.setAttribute('data-i18n', card.querySelector('.profile-skills').getAttribute('data-i18n'));
        modalProjects.setAttribute('data-i18n', card.querySelector('.profile-projects').getAttribute('data-i18n'));
        modalContact.setAttribute('data-i18n', card.querySelector('.profile-contact').getAttribute('data-i18n'));

        // Cập nhật ngôn ngữ ngay lập tức
        if (window.updateLanguage) { // Changed from window.updateContent to window.updateLanguage
            window.updateLanguage(document.documentElement.lang);
        }
    }

    // Mở modal khi click vào profile card
    profileCards.forEach(card => {
        card.addEventListener('click', () => {
            updateModalContent(card);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Đóng modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Đóng modal khi nhấn ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}); 