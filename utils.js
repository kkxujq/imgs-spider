const http = require('http');
const cheerio = require('cheerio'); // https://github.com/cheeriojs/cheerio
const url = require('url');

module.exports = {
    getPageAsync: (URL) => {
        return new Promise((resolve, reject) => {
            console.log(`正在爬取：  ${URL}`);

            http.get(URL, (res) => {
                let html = '';

                res.on('data', (data) => {
                    html += data;
                });

                res.on('end', () => {
                    resolve(html);
                })
            }).on('error', (e) => {
                reject(e);
                console.log(`爬取${URL}信息出错 :(`);
            });
        })
    },

    printInfo: (pages) => {
        let data = [];
        pages.map((item) => {
            let $ = cheerio.load(item);
            let temp = [];
            $('img').each((i, elem) => {
                temp.push(elem.attribs.src);
            });
            data.push(temp);
        });

        return data;
    },

    urlValid: (path, origin) => {
        const {protocol, hostname, host} = url.parse(origin);

        if (new RegExp(protocol || host || hostname).test(path)) return path;

        return `${protocol}//${host || hostname}${path}`;
    },

};
