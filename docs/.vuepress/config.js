module.exports = {
    title: '西索的博客',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/picture.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
        ['link', { rel: 'manifest', href: '/picture.jpg' }],
        ['link', { rel: 'apple-touch-icon', href: '/picture.jpg' }],
    ],
    serviceWorker: true, // 是否开启 PWA
    themeConfig: {
        logo: '/picture.jpg',  // 左上角logo
        nav: [ // 导航栏配置
            { text: '首页', link: '/' },
            { text: '技术文档', link: '/blog/' },
            { text: '随笔', link: '/note/note1/' },
            { text: '诗和远方', link: '/poetry/' }
        ],
        sidebar: {
            '/blog/': [
                {
                    title: '博客',
                    collapsable: false,
                    path: 'css/'
                },
                {
                    collapsable: false,
                    children: [
                        {title: 'css', path: 'css/'}
                    ]
                },
                {
                    collapsable: false,
                    children: [
                        { title: "js", path: "js/" },
                    ]
                }
                ,{
                    collapsable: false,
                    children: [
                        { title: "es6", path: "es6/" },
                    ]
                },{
                    collapsable: false,
                    children: [
                        { title: "vue", path: "vue/" },
                    ]
                },{
                    collapsable: false,
                    children: [
                        { title: "react", path: "react/" },
                    ]
                },{
                    collapsable: false,
                    children: [
                        { title: "webpack", path: "webpack/" },
                    ]
                }
            ],
            '/note/': [
                {
                    title: '随笔',
                    collapsable: false
                },
                {
                    collapsable: false,
                    children: [
                        { title: "webpack", path: "note1/" },
                        { title: "note2", path: "note2/" },
                    ]
                }
            ],
            '/poetry/': [
                ''
            ]
        },
        sidebarDepth: 2
    }
};