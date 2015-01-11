var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('ecsentry.sqlite');

//db.serialize(function () {
//    db.each("SELECT * FROM Product", function (err, row) {
//        console.log(row.Id + ": " + row.Name);
//    });
//});

function insert(thirdPartySku, source,name,price, listImage, category, images, remark) {
    db.run("insert into product(ThirdPartySku,Source,Name,Price,ListImage,Category,Images,Remark) VALUES (?,?,?,?,?,?,?,?)", thirdPartySku, source,name, price, listImage,category, images, remark);
}

function insertJDCategory(channel,href,category,categoryUrl,item,itemUrl,pageInfo) {
    db.run("insert into JDCategory(Channel,Href,Category,CategoryUrl,Item,ItemUrl,PageInfo) VALUES (?,?,?,?,?,?,?)", channel, href, category, categoryUrl, item, itemUrl, pageInfo);
}


function closeDb() {
    db.close();
}

var Id = 0;
var Sku = 0;
function run(callback) {
    db.each("SELECT max(Id) as Id,ThirdPartySku FROM product", function (err, row) {
        Id = row.Id;
        Sku = row.ThirdPartySku;
        //console.log(maxId);
        callback();
    });
}

var rowCount = 0;
function exist(url,callback) {
    db.each("SELECT count(1) as Total FROM JDCategory where ItemUrl='"+url+"'", function (err, row) {
        if (row.Total == 0) {
            callback();
        }
    });
}

function getList(callback,object) {
    db.each("SELECT * FROM JDCategory where PageInfo!='' and channel='家用电器'", function (err, row) {
        
            callback(row);
    });
    object.run();
}

function getRowCount() {
    return rowCount;
}

function getId() {
    return Id;
}
function getSku() {
    return Sku;
}

exports.getList = getList;
exports.insert = insert;
exports.insertJDCategory = insertJDCategory;
exports.exist = exist;
exports.run = run;
exports.closeDb = closeDb;
exports.getId = getId;
exports.getSku = getSku;