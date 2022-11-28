const express = require( "express" );
const bodyParser = require( "body-parser" );
const date = require( __dirname + "/date.js" );

const app = express();
const port = 3000;

let newAdds = [];
let workAdds = [];

app.use( bodyParser.urlencoded( { extended: true } ) );
app.set( "view engine", "ejs" );
app.use( express.static( "public" ) );

app.get( "/", ( req, res ) =>
{
    let day = date.getDate();
    res.render( "list", {listTitle: day, items: newAdds} );
} );

app.post( "/", ( req, res ) =>
{
    let newAdd = req.body.newAdd;
    console.log(req.body);

    if ( req.body.list === "extra" )
    {
        workAdds.push( newAdd );
        res.redirect( "/work" );
    } else
    {
        newAdds.push( newAdd );
        res.redirect( "/" );
    };
} );

app.get( "/work", ( req, res ) =>
{
    res.render( "list", { listTitle: "Work List", items: workAdds } );
} );

app.post( "/work", ( req, res ) =>
{
    let workAdd = req.body.newAdd;
    workAdds.push( workAdd );

    res.redirect( "/work" );
} );

app.get( "/about", ( req, res ) =>
{
    res.render( "about" );
})

app.listen( port, () =>
{
    console.log( "working" );
} );