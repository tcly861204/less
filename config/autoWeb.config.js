const webConfig = [{
    name: 'app',
    type: 'dir',
    files: [{
            'name': 'src',
            'type': 'dir',
            'files': [{
                    'name': 'img',
                    'type': 'dir'
                },
                {
                    'name': 'css',
                    'type': 'dir'
                },
                {
                    'name': 'style',
                    'type': 'dir'
                },
                {
                    'name': 'js',
                    'type': 'dir',
                    'files': [{
                        'name': 'basic',
                        'type': 'file',
                        'fileType': '.js',
                        'path': 'js'
                    }]
                },
                {
                    'name': 'index',
                    'type': 'file',
                    'fileType': '.html',
                    'path': ''
                },
            ]
        },
        {
            'name': 'dist',
            'type': 'dir'
        },
        {
            'name': 'less',
            'type': 'dir',
            'files': [{
                'name': 'reset',
                'type': 'file',
                'fileType': '.less',
                'path': 'less'
            }, {
                'name': 'basic',
                'type': 'file',
                'fileType': '.less',
                'path': 'less',
                'content': '/* --基本css-- */\n',
            }, {
                'name': 'layout',
                'type': 'file',
                'fileType': '.less',
                'path': 'less',
                'content': '/* --布局css-- */\n',
            }]
        }, {
            'name': 'package',
            'type': 'file',
            'fileType': '.json',
            'path': ''
        }, {
            'name': 'gulpfile',
            'type': 'file',
            'fileType': '.js',
            'path': ''
        }
    ]
}]

module.exports = webConfig;