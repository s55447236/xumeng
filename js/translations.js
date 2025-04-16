// 语言配置
const translations = {
    zh: {
        nav: {
            home: '首页',
            works: '作品集',
            about: '关于我',
            resources: '资源'
        },
        hero: {
            greeting: '你好，我是张栩萌，',
            designer: '一名产品设计师',
            coder: '一名 AI 开发者',
            bridge: '致力于连接人与科技',
            through: '通过富有思考的',
            and: '和',
            gentle: '温和的设计'
        },
        philosophy: {
            title: '设计理念',
            items: {
                humanCentered: {
                    title: '以人为本的设计',
                    description: '设计始终从用户出发 — 他们的需求、动机、情感和环境。'
                },
                simplyConsumable: {
                    title: '简单易用',
                    description: '让复杂的事物变得简单，让简单的事物变得优雅。'
                },
                invisible: {
                    title: '无形设计',
                    description: '最好的设计是无形的 — 它只是恰到好处地工作着。'
                },
                emotional: {
                    title: '实用与情感',
                    description: '创造既实用又能引起情感共鸣的体验。'
                },
                productThinking: {
                    title: '产品思维',
                    description: '超越界面思考 — 设计整体产品体验。'
                }
            }
        },
        works: {
            title: '我的作品',
            moreReads: '更多推荐阅读'
        },
        contact: {
            title: '有项目想法？',
            subtitle: '让我们一起探讨可能性 :)',
            button: '联系我'
        },
        footer: {
            made: '由我创作',
            created: '创作于中国'
        }
    },
    en: {
        nav: {
            home: 'Home',
            works: 'Works',
            about: 'About',
            resources: 'Resources'
        },
        hero: {
            greeting: "Hi, I'm Xumeng,",
            designer: 'a product designer',
            coder: 'an AI coder',
            bridge: 'bridge people and technology',
            through: 'through thoughtful',
            and: 'and',
            gentle: 'gentle design'
        },
        philosophy: {
            title: 'Design Philosophy',
            items: {
                humanCentered: {
                    title: 'Human-centered Design',
                    description: 'Design always starts with the user — their needs, motivations, emotions, and context.'
                },
                simplyConsumable: {
                    title: 'Simply Consumable',
                    description: 'Make complex things simple, and simple things beautiful.'
                },
                invisible: {
                    title: 'Invisible Design',
                    description: 'The best design is invisible — it just works.'
                },
                emotional: {
                    title: 'Useful + Emotional',
                    description: 'Create experiences that are both useful and emotionally engaging.'
                },
                productThinking: {
                    title: 'Design for Product Thinking',
                    description: 'Think beyond the interface — design for the whole product experience.'
                }
            }
        },
        works: {
            title: 'My Works',
            moreReads: 'More recommended reads'
        },
        contact: {
            title: 'Got a project?',
            subtitle: "Let's see what we can do together :)",
            button: 'Get in touch'
        },
        footer: {
            made: 'Made by me',
            created: 'Created in China'
        }
    }
};

const parentClass = title.closest('section').className.split('-')[0];
if (parentClass === 'tools' && lang.about.sections.tools) {
    title.textContent = lang.about.sections.tools;
} 

let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    const langButton = document.querySelector('.lang-switch');
    langButton.textContent = currentLang === 'en' ? 'ZH' : 'EN';
    updateContent();
}

function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = translations[currentLang];
        for (const k of keys) {
            translation = translation[k];
        }
        if (translation) {
            element.textContent = translation;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateContent();
}); 