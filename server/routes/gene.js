var express = require('express');
var router = express.Router();
var fs = require("fs");
let bodyParser = require('body-parser');

/* GET gene listing. */
router.get('/gene', function (req, res, next) {
    fs.readFile("../public/genomes_organelles.txt", 'utf8', function (err, data) {
        if (err) {
            return console.error(err);
        }
        res.json(data);
    });
});

// // create application/x-www-form-urlencoded parser   
// let urlencodedParser = bodyParser.urlencoded({ extended: false })//url-encoded解析器  

// router.post('/saveas', function (req, res, next) {
//     let saveData = Object.keys(req.body)[0];
//     console.log(saveData)
//     fs.writeFile('nc_numbers.txt', saveData, function (err) {
//         if (err) {
//             return console.error(err);
//         }
//         res.send("数据写入成功！");
//     });
//     fs.readFile('nc_numbers.txt', function (err, data) {
//         if (err) {
//             return console.error(err);
//         }
//         console.log("异步读取文件数据: " + data.toString());
//     });
// });

module.exports = router;
