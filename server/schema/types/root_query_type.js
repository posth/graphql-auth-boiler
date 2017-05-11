const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;

const UserType = require('./user_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //By default, graphql expects at least one field available for all defined types
    user: {
      //everytime someone asks for a user we return the current user
      type:  UserType,
      //instruct graphQL how to return the current user
      resolve(parentValue, args, req) {
        //if the user is athentication, the req property will have the user property
        //if there is no current user graphQL will return null to the front
        return req.user;
      }
    }
  }
});

module.exports = RootQueryType;
