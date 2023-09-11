import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'en-US',
    title: 'Stack',
    description: 'Card-style Hugo theme designed for bloggers',
    lastUpdated: true,
    outDir: '../public',

    head: [
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
        ['link', { rel: 'manifest', href: '/site.webmanifest' }],
        ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }],
        ['meta', { name: 'msapplication-TileColor', content: '#00aba9' }],
        ['meta', { name: 'theme-color', content: '#ffffff' }],
        ['script', { defer: "true", "data-domain": "stack.jimmycai.com", src: 'https://stat.jimmycai.com/js/include.js' }],
    ],

    markdown: {
        lineNumbers: true,
        theme: 'one-dark-pro'
    },

    cleanUrls: true,

    themeConfig: {
        logo: '/logo.png',

        footer: {
            message: "Documentation released under the MIT License, logo designed by Jimmy Cai, all rights reserved.",
            copyright: "Copyright © 2020 - Present Jimmy Cai",
        },

        sidebar: {
            '/guide/': sidebarGuide(),
            '/config/': sidebarGuide(),
            '/writing/': sidebarGuide(),
        },

        nav: [
            { text: 'Guide', link: '/guide/' },
            { text: 'Config', link: '/config/' },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/CaiJimmy/hugo-theme-stack' }
        ],

        editLink: {
            pattern: 'https://github.com/CaiJimmy/hugo-theme-stack/edit/master/docs/:path',
            text: 'Edit this page on GitHub'
        },

        outline: [2, 3],

        carbonAds: {
            code: 'CEAIE27W',
            placement: 'stackjimmycaicom'
        },

        algolia: {
            appId: '6OC1XCG4R5',
            apiKey: '7779946cc768ec3699123e60a91d0ddc',
            indexName: 'stack-jimmycai',
        }
    },
});

function sidebarGuide() {
    return [
        {
            text: 'Introduction',
            collapsible: true,
            items: [
                { text: 'About Stack', link: '/guide/' },
                { text: 'Getting Started', link: '/guide/getting-started' },
                { text: 'Modify Theme', link: '/guide/modify-theme' }
            ]
        },
        {
            text: 'Writing',
            collapsible: true,
            items: [
                { text: 'Markdown', link: '/writing/markdown' },
                {
                    text: 'Frontmatter Configs', link: '/writing/frontmatter'
                },
                { text: 'Shortcodes', link: '/writing/shortcodes' },
            ]
        },
        {
            text: 'Config',
            collapsible: true,
            items: [
                {
                    text: 'Introduction',
                    link: '/config/'
                },
                {
                    text: 'Site Configs',
                    link: '/config/site'
                },
                {
                    text: 'i18n Configs',
                    link: '/config/i18n'
                },
                {
                    text: 'Custom Menu',
                    link: '/config/menu'
                },
                {
                    text: 'Custom Header / Footer',
                    link: '/config/header-footer'
                },
                {
                    text: 'Date Format',
                    link: '/config/date-format'
                },
                {
                    text: 'Sidebar',
                    link: '/config/sidebar'
                },
                {
                    text: 'Footer',
                    link: '/config/footer'
                },
                {
                    text: 'Article',
                    link: '/config/article'
                },
                {
                    text: 'Comments',
                    link: '/config/comments'
                },
                {
                    text: 'Widgets',
                    link: '/config/widgets'
                },
                {
                    text: 'Open Graph',
                    link: '/config/open-graph'
                },
                {
                    text: 'Default Image',
                    link: '/config/default-image'
                },
                {
                    text: 'Color Scheme',
                    link: '/config/color-scheme'
                },
                {
                    text: 'Image Processing',
                    link: '/config/image-processing'
                }
            ]
        },
    ]
}