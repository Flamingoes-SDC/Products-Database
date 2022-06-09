const {Client} = require('pg');
const client = new Client({
  user: "Kayla",
  password: "Wajja7qq7",
  port: 5432,
  database: "products"
});

client.connect()
.then(() => console.log("Connected successfully"))
.then(() => )
.catch(e => console.log(e))
.finally(() => client.end());