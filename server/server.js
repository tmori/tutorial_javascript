
var config = require('./config');
const http = require('http');
var fs     = require('fs');
const server = http.createServer();

server.on('request', function(req, res) {
     // ファイルを読み込む処理は時間がかかるので、callbackにして、ノンブロッキング処理にする
     fs.readFile(__dirname + '/pages/' + req.url, 'utf-8', function (err, data) {
        // エラー発生時
        if (err) {
            res.writeHead(404, {'Content-Type' : 'text/plain'});
            res.write('page not found');
            // returnを使って、ここで処理を終了させる
            return res.end();
        }

        // 表示させるのはtextじゃなくて、htmlなので、text/htmlにする
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(data);
        res.end();
    });
});

console.log("SERVER START: port=" + config.port);

// サーバを待ち受け状態にする
// 第1引数: ポート番号
// 第2引数: IPアドレス
server.listen(config.port);

console.log("SERVER END");
