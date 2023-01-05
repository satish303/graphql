var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require("cors");
import satish from 'satish'
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type user{
  userId:Int,
  id:Int,
  title:String,
  body:String
}
  type Query {
    hello: String
    getEmplist:[user]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  getEmplist:async()=>{
    let rawData = await fetch("https://jsonplaceholder.typicode.com/posts");
    let convertData = await rawData.json();
    console.log(convertData)
    return convertData
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
   
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000 ,()=>{
console.log("the port is listening 4000")
console.log("http://localhost:4000/graphql")
});
console.log('Running a GraphQL API server at http://localhost:4000/graphql');