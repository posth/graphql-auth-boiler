import React, { Component } from 'react';

//child component
import AuthForm from './AuthForm';

//Login mutation and apollo graphql import to tie in the mutation to this component
import loginMutation from '../mutations/Login';
import { graphql } from 'react-apollo';

import currentUserQuery from '../queries/CurrentUser';

class LoginForm extends Component {

    //initialize component level state
    constructor(props) {
        super(props);

        this.state = { errors: [] };
    }

    //callback to grab authform values when submitted - pass this function to the authform child component
    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            // to redo queries which may cause other mutations throughout the app - in this case the header
            refetchQueries: [{ query: currentUserQuery }]
        })
            //all mutations here are promises which are resolved when the mutation completes - catch is called if mutation gives an error
            .catch(res => {
                //catch all possible graphql errors
                const errors = res.graphQLErrors.map(error => error.message);

                //updating component level state errors with the errors from the catch
                this.setState({ errors });
            });
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm
                    errors={this.state.errors}
                    onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        );
    }
}

export default graphql(loginMutation)(LoginForm);