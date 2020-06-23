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
            { text: '技术文档', link: '/tech/' },
            { text: 'testDemo', link: '/testDemo/' }
        ],
        // sidebar: [// 侧边栏配置
        //     {
        //         title: '技术文档',   // 必要的
        //         // path: '/cssTech/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        //         collapsable: false, // 可选的, 默认值是 true,
        //         sidebarDepth: 2,    // 可选的, 默认值是 1
        //         children: [
        //             {
        //                 title: 'css相关',
        //                 path: '/cssTech/'
        //             },
        //             {
        //                 title: 'js相关',
        //                 path: '/jsTech/'
        //             },
        //             {
        //                 title: 'vue相关',
        //                 path: '/vueTech/'
        //             },
        //             {
        //                 title: 'es6相关',
        //                 path: '/es6Tech/'
        //             }
        //         ]
        //     }
        // ],
        sidebar: {
            '/tech/': [
                '',
                'css',
                'js',
                'es6',
                'vue'
            ],
            '/testDemo/': [
                ''
            ]
        },
        sidebarDepth: 2
    }
};