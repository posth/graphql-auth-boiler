//GraphQL helper objects
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString
} = graphql;

//Base UserType - A type is a collection of data in your DB
//Though the base schema has a password, you don't want to have GraphQL expose it
//Only expose the email to GraphQL then
const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        email: { type: GraphQLString }
    }
});

module.exports = UserType;