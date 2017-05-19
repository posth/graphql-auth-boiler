import React, { Component } from 'react';
import { graphql } from 'react-apollo';

//Component
import AuthForm from './AuthForm';

//Mutations
import signupMutation from '../mutations/Signup';

//component based class
class SignupForm extends Component {

    //callback function to passed down to the child component
    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password }
        });
    }

    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <AuthForm
                    errors={[]}
                    onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        );
    }
}

export default graphql(signupMutation)(SignupForm);