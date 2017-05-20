import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

//Component
import AuthForm from './AuthForm';

//Mutations
import signupMutation from '../mutations/Signup';

//Queries
import currentUserQuery from '../queries/CurrentUser';

//component based class
class SignupForm extends Component {

    //initializing component level state
    constructor(props) {
        super(props);

        this.state = { errors: [] };
    }

    //lifecycle hook - whenever component is about to be rerendered than this function is called
    componentWillUpdate(nextProps) {
        if (!this.props.data.user && nextProps.data.user) {
            //redirect to the dashboard
            hashHistory.push('/dashboard');
        }
    }

    //callback function to passed down to the child component
    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query: currentUserQuery }]
        }).catch(res => {
            //grab each message from the error object you go through in the array of error objects
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors });
        });
    }

    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <AuthForm
                    errors={this.state.errors}
                    onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        );
    }
}

//stacking queries and mutations on the component, the order is not important
export default graphql(currentUserQuery)(
    graphql(signupMutation)(SignupForm)
);