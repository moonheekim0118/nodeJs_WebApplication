module.exports={
  HTML:function(title, list, description)
  {
    return `<!DOCTYPE html>
    <html>
      <head>
        <h2><a href="/">푸들왕 김부기</h2>
        <meta charset="utf-8">
        <title>${title}</title>
        <ul>
        ${list}
        </ul>
      </head>
      <body>
        ${description}
      </body>
    </html>`;
  }
,
List: function(filelist)
{
  var body = "<ul>";
  for(var i=0; i<filelist.length; i++)
  {
    body=body +`<li><a href="/?id=${filelist[i]}"title = "${filelist[i]}"> ${filelist[i]}</a></li>`;
  }
  body= body +"</ul>";
  return body;
  }
}
