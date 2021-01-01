let fs = require('fs');
const options = {
	key: fs.readFileSync('./keys/private.pem'),
	cert: fs.readFileSync('./keys/public.pem')
};

let express = require( 'express' );
let app = express();
let server = require( 'https' ).Server( options, app );
let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );

app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );
app.use( '/neuralNets', express.static( path.join( __dirname, 'neuralNets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );

io.of( '/stream' ).on( 'connection', stream );

server.listen( 3000 );
