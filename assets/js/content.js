// Load content from JSON file
async function loadContent() {
    try {
        const response = await fetch('/data/content.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading content:', error);
        return null;
    }
}

// Render projects
function renderProjects(projects) {
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" rel="noopener">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${project.demo}" target="_blank" rel="noopener">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectCard);
    });
}

// Render blog posts
function renderBlogPosts(blogPosts) {
    const blogContainer = document.querySelector('.blog-grid');
    if (!blogContainer) return;

    blogPosts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="date">${post.date}</span>
                    <span class="category">${post.category}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <div class="blog-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="blog-footer">
                    <span class="read-time">${post.readTime}</span>
                    <a href="/blog/${post.id}" class="read-more">Đọc thêm</a>
                </div>
            </div>
        `;
        blogContainer.appendChild(blogCard);
    });
}

// Render about section
function renderAbout(about) {
    const aboutSection = document.querySelector('.about-content');
    if (!aboutSection) return;

    // Introduction
    const intro = document.createElement('div');
    intro.className = 'about-intro';
    intro.innerHTML = `<p data-i18n="about_intro_content"></p>`;
    aboutSection.appendChild(intro);

    // Skills
    const skills = document.createElement('div');
    skills.className = 'skills-section';
    skills.innerHTML = `
        <h3 data-i18n="home_skills_title"></h3>
        <div class="skills-grid">
            <div class="skill-category">
                <h4 data-i18n="${about.skills.frontend_key}"></h4>
                <div class="skill-tags">
                    ${(about.skills.frontend_list ?? []).map(key => `<span class="tag" data-i18n="skill_${key.toLowerCase()}"></span>`).join('')}
                </div>
            </div>
            <div class="skill-category">
                <h4 data-i18n="${about.skills.backend_key}"></h4>
                <div class="skill-tags">
                    ${(about.skills.backend_list ?? []).map(key => `<span class="tag" data-i18n="skill_${key.toLowerCase()}"></span>`).join('')}
                </div>
            </div>
            <div class="skill-category">
                <h4 data-i18n="${about.skills.tools_key}"></h4>
                <div class="skill-tags">
                    ${(about.skills.tools_list ?? []).map(key => `<span class="tag" data-i18n="skill_${key.toLowerCase()}"></span>`).join('')}
                </div>
            </div>
            <div class="skill-category">
                <h4 data-i18n="${about.skills.soft_key}"></h4>
                <div class="skill-tags">
                    ${(about.skills.soft_list ?? []).map(key => `<span class="tag" data-i18n="skill_${key.toLowerCase()}"></span>`).join('')}
                </div>
            </div>
        </div>
    `;
    aboutSection.appendChild(skills);

    // Experience
    const experience = document.createElement('div');
    experience.className = 'experience-section';
    experience.innerHTML = `
        <h3 data-i18n="experience_title"></h3>
        <div class="timeline">
            ${(about.experience ?? []).map((exp, index) => `
                <div class="timeline-item">
                    <div class="timeline-year">${exp.year}</div>
                    <div class="timeline-content">
                        <h4 data-i18n="experience_${index + 1}_title"></h4>
                        <h5 data-i18n="experience_${index + 1}_company"></h5>
                        <p data-i18n="experience_${index + 1}_description"></p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    aboutSection.appendChild(experience);

    // Education
    const education = document.createElement('div');
    education.className = 'education-section';
    education.innerHTML = `
        <h3 data-i18n="education_title"></h3>
        <div class="timeline">
            ${(about.education ?? []).map((edu, index) => `
                <div class="timeline-item">
                    <div class="timeline-year">${edu.year}</div>
                    <div class="timeline-content">
                        <h4 data-i18n="education_${index + 1}_degree"></h4>
                        <h5 data-i18n="education_${index + 1}_school"></h5>
                        <p data-i18n="education_${index + 1}_description"></p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    aboutSection.appendChild(education);
}

// Initialize content
async function initializeContent() {
    const content = await loadContent();
    if (!content) return;

    // Render content based on current page
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('projects')) {
        renderProjects(content.projects);
    } else if (currentPage.includes('blog')) {
        renderBlogPosts(content.blog);
    } else if (currentPage.includes('about')) {
        renderAbout(content.about);
    } else {
        // Home page
        renderProjects(content.projects.slice(0, 3)); // Show only 3 featured projects
        renderBlogPosts(content.blog.slice(0, 2)); // Show only 2 latest blog posts
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeContent); 