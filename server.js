const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

module.exports= function server (file_url) {

  // remove the first dot
  let url = file_url.substr(1)

  router.get('/',function(req,res){
    res.sendFile(path.join(__dirname + url));
    //__dirname : It will resolve to your project folder.
  });

  // //add the router
  // app.use(express.static(__dirname + '/View'));
  // //Store all HTML files in view folder.
  app.use(express.static(path.join(__dirname, 'static')))
  //Store all JS and CSS in Scripts folder.

  app.use('/', router);
  app.listen(process.env.port || 3000);

  console.log('Running at Port 3000');
}
