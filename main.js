var http = require('http');
var testFolder ='./data';
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var template =require('./lib/template.js');

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname=url.parse(_url,true).pathname;
  var queryID=queryData.id;
  if(pathname === '/'){
    if(queryID == undefined){// localhos:3000 index로 보내준다.
      queryID="welcome"; }
    var title = queryID;
    fs.readdir(testFolder,function(err,filelist){
       var list = template.List(filelist);
        fs.readFile(`data/${queryID}`, 'utf8', function(err, description){
          var result=template.HTML(title, list, description);
          response.writeHead(200);
          response.end(result);
        });
      });
  }
  else if(pathname=="/send"){
    var body = '';
      request.on('data', function(data){
          body = body + data; });

      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var description ="<p>";
          description+=post.description+` ♥♥♥을담아 ${id}로부터...</p>`;
            fs.appendFile('data/LettersToBoogie',description, 'utf8', function(err){
              if(err) throw err;
              response.writeHead(302, {Location: '/?id=LettersToBoogie'});
              response.end();
            });
          });
  }
  else //유효하지 않은 쿼리
  {
    response.writeHead(404);
    response.end("Not Found");
  }

});
app.listen(3000);
