const graphql = require('graphql');

//Pulling what we need for these mutations
const {
    GraphQLObjectType,
    GraphQLString
} = graphql;

const UserType = require('./types/user_type');

//importing the the auth service which communicates with Passport (has 2 functions which are signup and login)
const AuthService = require('../services/auth');

//The mutations to the UserType
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Mutations
        signup: {
            //What it returns (a user)
            type: UserType,
            //What the mutation needs
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            //The third argument, request or context = the request object coming from express
            // the args are destructred using ES6 to just grab the email and password
            resolve(parentValue, { email, password }, req) {
                //What the signup function requires in the authservice
                //resolve from GraphQL wants a promise, so you return it
                //this signup logic is well abstracted - graphql strength
                return AuthService.signup({ email, password, req });
            }
        },
        //This mutation runs through Passport to logout 
        logout: {
            type: UserType,
            resolve(parentValue, args, req) {
                // save a reference to the user property 
                const { user } = req;
                //Calling req.logout removes user property from the request object
                //logging out the user
                req.logout();
                //returning the user which is logged out
                return user;
            }
        },
        login: {
            //login mutation will return a usertype
            type: UserType,
            //the arguments the mutation takes for the user to login
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            //returns a promise to the auth service which glues together Passport.js authentication
            resolve(parentValue, { email, password }, req) {
                return AuthService.login({ email, password, req })
            }
        }
    }
});

module.exports = mutation;
