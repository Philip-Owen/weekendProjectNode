const express = require( 'express' );
const app = express();
const port = 8088;

app.use( express.static( 'server/public' ) );

app.listen(port, () => console.log('server up on:', port));