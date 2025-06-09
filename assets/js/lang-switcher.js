// Cache translations
let translationsCache = {};
let isSwitching = false;

// Preload both language files on page load
document.addEventListener('DOMContentLoaded', async function() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'vi';
    document.documentElement.lang = savedLang;
    
    // Preload both language files
    await Promise.all([
        loadLanguage('vi'),
        loadLanguage('en')
    ]);
    
    // Initialize dynamic content and then update UI with saved language
    if (typeof initializeContent === 'function') {
        await initializeContent();
    }
    updateLanguage(savedLang);

    // Ensure the lang-switcher button is available before attaching listener
    const langSwitcher = document.querySelector('.lang-switcher');
    if (langSwitcher) {
        updateButtonText(langSwitcher, savedLang);

        langSwitcher.addEventListener('click', async function() {
            if (isSwitching) return; // Prevent multiple clicks
            isSwitching = true;

            try {
                const currentLang = document.documentElement.lang;
                const newLang = currentLang === 'vi' ? 'en' : 'vi';
                
                // Update language first
                document.documentElement.lang = newLang;
                localStorage.setItem('preferredLanguage', newLang);
                
                // Re-initialize content for the new language
                if (typeof initializeContent === 'function') {
                    await initializeContent();
                }
                
                // Update content synchronously
                updateLanguage(newLang);
                
                // Update button text last
                updateButtonText(this, newLang);
            } finally {
                isSwitching = false;
            }
        });
    } else {
        console.warn('Language switcher button not found.');
    }
});

function updateButtonText(button, lang) {
    button.textContent = lang.toUpperCase();
}

async function loadLanguage(lang) {
    // Check cache first
    if (translationsCache[lang]) {
        return translationsCache[lang];
    }

    try {
        const response = await fetch(`/lang/${lang}.json`);
        if (!response.ok) {
            throw new Error('Failed to load language file');
        }
        
        const translations = await response.json();
        translationsCache[lang] = translations;
        return translations;
    } catch (error) {
        console.error('Error loading language file:', error);
        return {};
    }
}

function updateLanguage(lang) {
    const translations = translationsCache[lang];
    if (!translations) {
        console.error('Translations not loaded for lang:', lang);
        return;
    }

    console.log('Attempting to update language to:', lang);
    console.log('Translations for current lang:', translations);

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            console.log(`Updating element with key '${key}': '${element.textContent}' -> '${translations[key]}'`);
            element.textContent = translations[key];
        } else {
            console.warn(`Translation key '${key}' not found for language '${lang}'`);
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            console.log(`Updating placeholder for key '${key}': '${element.placeholder}' -> '${translations[key]}'`);
            element.setAttribute('placeholder', translations[key]);
        } else {
            console.warn(`Translation placeholder key '${key}' not found for language '${lang}'`);
        }
    });

    // Update meta tags
    if (translations.pageTitle) {
        console.log(`Updating document title: '${document.title}' -> '${translations.pageTitle}'`);
        document.title = translations.pageTitle;
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && translations.metaDescription) {
        console.log(`Updating meta description: '${metaDescription.getAttribute('content')}' -> '${translations.metaDescription}'`);
        metaDescription.setAttribute('content', translations.metaDescription);
    }
}

// Make updateLanguage globally accessible
window.updateLanguage = updateLanguage;