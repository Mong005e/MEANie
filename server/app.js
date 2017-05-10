var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
// 27017 is default mongo port

//uses
app.use( express.static( 'public' ) );
app.use (bodyParser.urlencoded ({extended:true} ) );
app.use( bodyParser.json() );
//spin up server
app.listen( 8080, 'localhost', function( req, res ){
console.log( 'listening on 8080' );
});

//mongoose stuff
mongoose.connect( 'localhost:27017/meanie' );
var ourSchema = mongoose.Schema({
  name: String,
  location: String
});//end Schema
//model
var ourModel = mongoose.model( 'ourModel', ourSchema );


app.get( '/', function( req, res ){
  res.sendFile( path.resolve( 'public/index.html' ) );
  });

app.get( '/getRecords', function( req, res ){
// get and send back all the things
  ourModel.find().then( function( data ){
    console.log('this is data:', data);
    res.send( data );
  });
});


app.post( '/testPost', function( req, res ){
  console.log( 'req.body.name: ' + req.body.name );
// retrieved the req.body
// putting it into an object to be saved in the db
  var recordToAdd={
      name:req.body.name,
      location:req.body.location
    };
// create new record
  var newRecord=ourModel( recordToAdd );
  newRecord.save();
});
