import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

//Querries
import currentUserQuery from '../queries/CurrentUser';

//higher order component to see if the user is authenticated - if not redirect to login
export default (WrappedComponent) => {
    class RequireAuth extends Component {

        //whenever this component has an updated state from new props (from a new query for example), 
        //we check if current user is signed in
        componentWillUpdate(nextProps) {
            //If there is no user, we redirect to login
            //Also if it's done loading so we don't prematurely redirect the user while the query is still loading
            if (!nextProps.data.loading && !nextProps.data.user) {
                hashHistory.push('/login');
            }
        }

        render() {
            //returning the wrapped component along with any props the higher order component has
            return <WrappedComponent {...this.props} />;
        }
    }

    return graphql(currentUserQuery)(RequireAuth);
};