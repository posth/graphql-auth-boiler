//GraphQL helper objects
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql;

//Base UserType - A type is a collection of data in your DB
//Though the base schema has a password, you don't want to have GraphQL expose it
//Only expose the email to GraphQL then
const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        //unique id for objects, so that when brought to the front, the unique ID in apollo
        //can be checked, and if it's repeated, will be stored in local cache
        id: { type: GraphQLID },
        email: { type: GraphQLString }
    }
});

module.exports = UserType;