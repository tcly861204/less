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
forEachFile('', webConfig);