var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

userInsert = function(host, port) {
  this.db = new Db('kccal-user', new Server(host, port, {safe : false}, {auto_reconnect : true}, {}));
  this.db.open(function(){});
};

userInsert.prototype.getCollection = function(callback){
  this.db.collection('users', function(error, user_collection) {
    if(error) callback(error);
    else callback(null, user_collection);
  });
};

userInsert.prototype.save = function(users, callback){
  this.getCollection(function(error, user_collection) {
    if(error) callback(error)
    else{
      if(typeof(users.length)=="undefined")
        users = [users];
      
      for(var i = 0; i<users.length;i++)
      {
        user = users[i];
        user.created_at = new Date();
      }
      
      user_collection.insert(user, function(){
        callback(null, users);
      });
    }
  });
};

exports.userInsert = userInsert;