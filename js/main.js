// 全局变量和状态管理
const state = {
    currentLang: localStorage.getItem('preferredLanguage') || 'en'
};

// DOM 加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    initializeAll();
});

// 统一初始化函数
function initializeAll() {
    initScrollEffect();
    initLanguage();
    initUI();
    initPhilosophy();
}

// 语言相关功能
function initLanguage() {
    updateContent();
    updateLanguageButton();
    
    const langButton = document.querySelector('.lang-switch');
    if (langButton) {
        langButton.addEventListener('click', toggleLanguage);
    }
    }
    
function toggleLanguage() {
    state.currentLang = state.currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('preferredLanguage', state.currentLang);
    updateContent();
    updateLanguageButton();
}

function updateLanguageButton() {
    const button = document.querySelector('.lang-switch');
    if (button) {
        button.textContent = state.currentLang === 'en' ? '中' : 'EN';
    }
}

function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations && translations[state.currentLang] && translations[state.currentLang][key]) {
            element.textContent = translations[state.currentLang][key];
        }
    });
}

// 设计理念功能
const philosophyData = {
    'human-centered': {
        title: 'Design always starts with the user — their needs, motivations, emotions, and context.',
        image: 'assets/philosophy/design-illustration.png'
    },
    'simplify': {
        title: 'My mission is to make complex systems clear, usable — even elegant.',
        image: 'assets/philosophy/simplify-illustration.png'
    },
    'invisible': {
        title: 'The best design is invisible — it just works.',
        image: 'assets/philosophy/invisible-illustration.png'
    },
    'emotional': {
        title: 'Create experiences that are both useful and emotionally engaging.',
        image: 'assets/philosophy/emotional-illustration.png'
    },
    'product': {
        title: 'Think beyond the interface — design for the whole product experience.',
        image: 'assets/philosophy/product-illustration.png'
    }
};

function initPhilosophy() {
    console.log('Initializing philosophy section...');
    
    const items = document.querySelectorAll('.philosophy-list li');
    const title = document.querySelector('.philosophy-title');
    const image = document.querySelector('.philosophy-image');
    
    if (!items.length || !title || !image) {
        console.warn('Some philosophy elements not found');
        return;
    }

    // 为每个列表项设置 data-text 属性
    items.forEach(item => {
        const text = item.textContent;
        item.setAttribute('data-text', text);
    });

    function switchContent(index) {
        // 移除所有激活状态
        items.forEach(item => {
            item.classList.remove('active');
        });
        
        // 激活当前项
        const currentItem = items[index];
        currentItem.classList.add('active');
        
        // 获取对应的key
        const key = currentItem.getAttribute('data-key');
        const data = philosophyData[key];
        
        if (!data) {
            console.warn('No data found for key:', key);
            return;
        }

        // 更新内容
        title.style.opacity = '0';
        image.classList.remove('show');
        
        setTimeout(() => {
            title.textContent = data.title;
            image.src = data.image;
            title.style.opacity = '1';
            image.classList.add('show');
        }, 300);
    }

    // 点击事件
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            switchContent(index);
        });
    });

    // 初始化第一项
    switchContent(0);
}

// 滚动效果功能
function initScrollEffect() {
    const textLines = document.querySelectorAll('.hero-content .text-line');
    console.log('Found text lines:', textLines.length);

    function updateTextColors() {
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        textLines.forEach((line) => {
            const rect = line.getBoundingClientRect();
            const elementCenter = rect.top + (rect.height / 2);
            
            // 如果元素已经滚动到视口上方，不应用任何效果
            if (rect.bottom < 0) {
                line.style.color = '#red'; // 直接设置为黑色
                return;
            }
            
            // 如果元素还没有进入视口，保持原始颜色
            if (rect.top > windowHeight) {
                line.style.color = '#fff'; // 设置为浅灰色
                return;
            }
            
            // 对于在视口内的元素，计算渐变效果
            const distanceToCenter = Math.abs(windowHeight/2 - elementCenter);
            const maxDistance = windowHeight/2;
            const progress = Math.max(0, Math.min(1, 1 - (distanceToCenter / maxDistance)));
            const grayValue = Math.round(153 * (1 - progress));
            
            line.style.color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
        });
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateTextColors);
    });

    updateTextColors();
}

// UI 相关功能初始化
function initUI() {
    initializePhilosophySection();
    initializeToolsSlider();
}

// 设计理念部分初始化
function initializePhilosophySection() {
    const philosophyItems = document.querySelectorAll('.philosophy-list li');

    philosophyItems.forEach(item => {
        item.addEventListener('click', () => {
            // 更新激活状态
            philosophyItems.forEach(li => li.classList.remove('active'));
            item.classList.add('active');

            // 更新内容
            const content = translations[state.currentLang].philosophy.items[item.getAttribute('data-key')];
            if (content) {
                const titleElement = document.querySelector('.philosophy-content h2');
                const imageElement = document.querySelector('.philosophy-image');

                if (titleElement) titleElement.textContent = content.description;
                if (imageElement) imageElement.src = `assets/philosophy/${item.getAttribute('data-key')}.png`;
            }
        });
    });
}

// 工具箱轮播初始化
function initializeToolsSlider() {
    const track = document.querySelector('.tools-track');
    if (!track) return;

    // 克隆工具图标实现无缝轮播
    const images = Array.from(track.querySelectorAll('img'));
    images.forEach(img => {
        const clone = img.cloneNode(true);
        track.appendChild(clone);
    });

    // 鼠标悬停效果
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });

    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
}

// 联系按钮初始化
function initializeContactButton(button) {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });

    button.addEventListener('click', () => {
        window.location.href = 'mailto:your.email@example.com';
    });
}

// 示例作品数据
const works = [
    {
        title: 'Digital Worlds',
        description: '基于AR的位置分享应用',
        image: 'images/work1.jpg',
        tags: ['AR设计', '社交媒体设计', '交互设计']
    }
];

// 加载作品
function loadWorks() {
    const worksGrid = document.querySelector('.works-grid');
    if (!worksGrid) return;

    works.forEach(work => {
        const workCard = document.createElement('div');
        workCard.className = 'work-card';
        workCard.innerHTML = `
            <img src="${work.image}" alt="${work.title}">
            <div class="work-card-content">
                <h3>${work.title}</h3>
                <p>${work.description}</p>
                <div class="tags">
                    ${work.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        worksGrid.appendChild(workCard);
    });
}

// 联系按钮效果
const contactButton = document.querySelector('.get-in-touch');
if (contactButton) {
    contactButton.addEventListener('mouseover', () => {
        contactButton.style.transform = 'scale(1.05)';
    });

    contactButton.addEventListener('mouseout', () => {
        contactButton.style.transform = 'scale(1)';
    });

    contactButton.addEventListener('click', () => {
        // 这里可以添加联系表单或跳转到联系页面的逻辑
        window.location.href = 'mailto:your.email@example.com';
    });
}

// 联系按钮动画
document.querySelector('.get-in-touch').addEventListener('click', function() {
    const avatars = document.querySelector('.contact-avatars');
    avatars.classList.toggle('expanded');
});

// 按钮hover效果
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.get-in-touch');
    if (button) {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
        });

        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
        });
    }
});