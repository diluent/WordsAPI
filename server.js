var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var http       = require('http');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

    res.json({message: 'run'})
    requestOxford('hello', console.log);//{ message: 'hooray! welcome to our api!' });   
});

router.route('/bears')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {
            res.json({ message: 'Bear created!' });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.stack);
});


app.listen(port);
console.log('Magic happens on port ' + port);

function requestOxford(word, response) {
  var post_options = {
      host: 'ya.ru',//'od-api-2445581300291.apicast.io',
      //port: '443',
      //path: '/api/v1/entries/en/' + word +'translations=ru',
      method: 'GET',
      headers: {
          //'Accept': 'application/json',
          //'app_id': '71abeb5f',
          //'app_key': 'd9def23eb55db2c6dad778500e9a233e',
          
          //'Content-Length': Buffer.byteLength(post_data),
          //'Content-Type': 'application/x-www-form-urlencoded',
      }
  };

//     var post_data = querystring.stringify({
//       'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
//       'output_format': 'json',
//       'output_info': 'compiled_code',
//         'warning_level' : 'QUIET',
//         'js_code' : codestring
//   });

 var post_req = http.request(post_options, function(res) {
     console.log('it is happening');
     //console.log(res);

     var result = '';
      //res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('chunk: ' + chunk);
          
          result += chunk;
      });

      res.on('end', function () {
          console.log('Response: ' + result);
          response({res: 'oops'});
        });

        // res.on('error', function() {
        //   response({error: 'error'});
        // })
      
  });

//post_req.write("hello world!");
post_req.end();

  // post the data
  //post_req.write(post_data);
  //post_req.end();
}