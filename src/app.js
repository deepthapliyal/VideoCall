let express = require( 'express' );
let app = express();
let server = require( 'http' ).Server( app );
let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );

let fs = require('fs');
const options = {
	key: fs.readFileSync(__dirname + '/keys/private.pem'),
	cert: fs.readFileSync(__dirname + '/keys/public.pem')
};

app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );
app.use( '/neuralNets', express.static( path.join( __dirname, 'neuralNets' ) ) );


app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );


io.of( '/stream' ).on( 'connection', stream );

//server.listen( 3000 );
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("App is running on port " + port);
});