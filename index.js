require('dotenv').config();
const app = require('./app.js');
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
}) //delete these from index.js that's supposed to be renamed to app.js vice verse

//delete and path request!!!
