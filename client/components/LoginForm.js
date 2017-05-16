import React, { Component } from 'react';

//child component
import AuthForm from './AuthForm';

//Login mutation and apollo graphql import to tie in the mutation to this component
import loginMutation from '../mutations/Login';
import { graphql } from 'react-apollo';

import currentUserQuery from '../queries/CurrentUser';

class LoginForm extends Component {

    //callback to grab authform values when submitted - pass this function to the authform child component
    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            // to redo queries which may cause other mutations throughout the app - in this case the header
            refetchQueries: [{ query: currentUserQuery }]
        });
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm onSubmit={this.onSubmit.bind(this)}/>
            </div>
        );
    }
}

export default graphql(loginMutation)(LoginForm);