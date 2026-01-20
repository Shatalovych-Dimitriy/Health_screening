// Configuration
const CONFIG = {
    // ЗВЕРНІТЬ УВАГУ: Я змінив перше посилання, щоб воно закінчувалося на embedded=true
    doctorFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSetdqkmpPyPM_-ZM-FZojSzDOZxKSjj4fsadDyrWPB8u0wr2Q/viewform?embedded=true",
    patientFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScBfrnqdsK63QYev0mMYBBxBRXfIpYJo1EJhoE8n8fwuJdzIg/viewform?embedded=true"
};

// State
let currentTab = 'doctors';

// DOM Elements
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
});

// Tab Switching Logic
function initTabs() {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            if (target === currentTab) return;

            switchTab(target);
        });
    });
}

function switchTab(tabName) {
    currentTab = tabName;

    // Update Tabs
    tabs.forEach(t => {
        if (t.dataset.tab === tabName) {
            t.classList.add('active');
        } else {
            t.classList.remove('active');
        }
    });

    // Update Content
    contents.forEach(c => {
        if (c.id === tabName) {
            c.classList.add('active');
        } else {
            c.classList.remove('active');
        }
    });
}

// Form Loading Logic
function startTest(userType) {
    const actionContainerId = `${userType}-action`;
    const container = document.getElementById(actionContainerId);

    if (!container) {
        console.error(`Container for ${userType} not found`);
        return;
    }

    // Find the content wrapper to expand it
    const wrapper = container.closest('.content-wrapper');
    if (wrapper) {
        wrapper.classList.add('wide-mode');
    }

    const formUrl = userType === 'doctor' ? CONFIG.doctorFormUrl : CONFIG.patientFormUrl;

    // Create iframe
    // ЗМІНИ ТУТ:
    // 1. width="100%" - щоб займало всю ширину блоку
    // 2. height="1200" - збільшили висоту, щоб не було внутрішнього скролу
    const iframeHtml = `
        <div class="form-container" style="width: 100%;">
            <iframe 
                src="${formUrl}" 
                width="100%" 
                height="1200" 
                frameborder="0" 
                marginheight="0" 
                marginwidth="0"
                style="display: block; border: none;"
                title="Google Form">Loading...</iframe>
        </div>
    `;

    // Replace button with iframe with a smooth fade
    container.style.opacity = '0';

    setTimeout(() => {
        container.innerHTML = iframeHtml;

        // Додаткові стилі для контейнера, щоб він не обмежував iframe
        container.style.width = '100%';
        container.style.maxWidth = '100%';

        container.style.opacity = '1';
        container.style.height = 'auto';
    }, 300);
}

// Landing Page Logic
function enterApp(userType) {
    const landingPage = document.getElementById('landing-page');
    const mainApp = document.getElementById('main-app');

    // Fade out landing
    landingPage.style.animation = 'fadeOut 0.3s forwards';

    setTimeout(() => {
        landingPage.classList.add('hidden');
        mainApp.classList.remove('hidden');

        switchTab(userType);

        // Optional: Trigger animations for main app
        mainApp.style.animation = 'fadeIn 0.4s ease-out';
    }, 300);
}

// Add fadeOut animation dynamically if not in CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.95); }
    }
`;
document.head.appendChild(style);