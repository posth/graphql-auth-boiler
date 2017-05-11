const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //By default, graphql expects at least one field available for all defined types
    testField: { type: GraphQLID }
  }
});

module.exports = RootQueryType;
