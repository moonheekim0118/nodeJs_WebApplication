var http = require('http');
var testFolder ='./data';
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var template =require('./lib/template.js');
var Pollresult=require('./lib/PollResult.js');

var words=
{
  cute : '귀여움',
  pretty : '예쁨',
  funny : '웃김',
  smart : '지적임',
}

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname=url.parse(_url,true).pathname;
  var queryID=queryData.id;
  if(pathname === '/'){
    if(queryID == undefined){// localhos:3000 index로 보내준다.
      queryID="1.welcome"; }
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
  else if(pathname==="/send"){
    var body = '';
      request.on('data', function(data){
          body = body + data;
          if(body.length > 1e6){
            request.connection.destroy()};
         });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var description ="<p>";
          description+=post.description+` ♥♥♥을담아 ${id}로부터...</p>`;
            fs.appendFile('data/4. To Boogie',description, 'utf8', function(err){
              if(err) throw err;
              response.writeHead(302, {Location: '/?id=4. To Boogie'});
              response.end();
            });
          });
  }
  else if(pathname==="/poll_submit"){
    var body='';
    request.on('data',function(data){
      body = body + data;
      if(body.length > 1e6){
        request.connection.destroy()};
     });
    request.on('end',function(){
      var post =qs.parse(body);
      var res=post.charming;
      var description='<p>';
      for(var n in Pollresult){
        if(res === n){
          description+=` <h3>${words[n]}을 부기의 매력이라고 생각하는 당신! 안목 있습니다.</h3> <br> 부기는 정말 ${words[n]}이죠! </p>`
          break;
        }
      }
      fs.writeFile('data/6.Boogie charmingpoint', description, 'utf8', function(err){
        if(err) throw err;
        response.writeHead(302, {Location: '/?id=6.Boogie charmingpoint'});
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
