// let Promise = require('bluebird');   // http://bluebirdjs.com/docs/api-reference.html

let {getPageAsync, printInfo, urlValid} = require('./UTILs');

let URLS = ['http://www.w3cplus.com/', 'http://m.news.cctv.com/2017/05/15/ARTIOiMk1aHunTwEfhJVtHh1170515.shtml'];

let arr = [];

URLS.forEach((URL) => {
    let html = getPageAsync(URL)
    arr.push(html);
})

Promise
    .all(arr)
    .then((pages) => {
        let urls = [];
        let path = printInfo(pages);

        path.forEach((pathArr, index) => {
            pathArr.map((path) => {
                urls.push(urlValid(path, URLS[index]));
            })
        })

        console.log(urls);
    });
