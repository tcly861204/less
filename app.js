const fs = require('fs');
const path = require('path');
const webConfig = require('./config/autoWeb.config.js');

const forEachFile = (rootPath, arr) => {
    arr.forEach((item, index) => {
        if (!item.files) {
            switch (item.type) {
                case 'dir':
                    fs.mkdirSync(path.resolve(rootPath, item.name));
                    break;
                case 'file':
                    let fileName = item.name + item.fileType;
                    fs.exists(path.resolve(__dirname, 'config/' + fileName), (err) => {
                        if (err) {
                            fs.readFile('./config/' + fileName, 'utf-8', (err, data) => {
                                fs.writeFileSync(path.resolve(rootPath, fileName), data);
                            });
                        } else {
                            fs.writeFileSync(path.resolve(rootPath, fileName), item.content || '');
                        }
                    });
                    break;
                default:
                    break;
            }
        } else {
            fs.exists(path.resolve(rootPath || __dirname, item.name), (err) => {
                if (!err) {
                    fs.mkdirSync(path.resolve(rootPath || __dirname, item.name));
                    forEachFile(path.resolve(rootPath || __dirname, item.name), item.files);
                }
            });
        }
    });
}

process.stdin.resume();
process.stdout.write('请为构建的项目取一个文件夹名称:');
process.stdin.on('data',function(chunk){
    var fileName = chunk.toString();
    if(fileName){
        webConfig[0].name = fileName.trim().replace(/[\r\n]/g,"");
    }
    forEachFile('', webConfig);
    setTimeout(function(){
        process.abort();
    },100);
});
