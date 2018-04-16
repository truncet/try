var express = require('express')
var app = express()
var body_parser = require('body-parser');
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
Mongo_url = 'mongodb://radiatordev_rw:lWqZm9iTfV2E4I3@10.64.5.92:7683,10.64.5.93:7683,10.64.5.94:7683/radiatordev?ssl=true&replicaSet=mongo7683';
dbo = "";

app.get('/', function(req,res){
  console.log('app started');
})


var server = app.listen(process.env.PORT, function(){
  console.log(server.address().port);
  Mongo = require('mongodb').MongoClient;
  Mongo.connect(Mongo_url, {sslValidate:false}, function(err, db){
    dbo = db.db();
  })

})

app.get('/get/data', function(req, res){
  dbo.collection('latest_data', function(err, coll){
    if(err) throw err;
    coll.find().toArray(function(err, items){
      delete items[0]._id;
      return res.json(items);
    })
  })
})

app.get('/get/services', function(req, res){
  dbo.collection('latest_data',function(err, coll){
           if(err) throw err;
           coll.find().toArray(function(err, items){
             delete items[0]._id;
             var services = [];
             for(i in items[0]){
               services.push(i);
             }
             return res.json(services);
           })
         })
})

app.get('/get/data/:service', function(req,res){
  dbo.collection('latest_data',function(err, coll){
           if(err) throw err;
           coll.find().toArray(function(err, items){
             delete items[0]._id;
             return res.json(items[0][req.params.service]);
           })
         })

})

app.post('/update', function(req, ers){
  var myObj = {};
  myObj["username"] = req.body.username;
  myObj["password"] =req.body.password;
  myObj["host"] =req.body.host;
  myObj["database"] =req.body.database;
  myObj["port"] = req.body.port;
  myObj["adapter"] = req.body.adapter;
  myObj["service"] = req.body.service;

  dbo.collection('mongo',function(err, coll){
           if(err) throw err;
           coll.insert(myObj,function(err, items){
            if(err) throw err;
             return res.json(items);
           })
         })

})
