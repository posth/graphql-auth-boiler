import React, { Component } from 'react';
import { Link } from 'react-router';

//Lets us get a query and a component to sandwhich them together when exporting them
import { graphql } from 'react-apollo';

//Queries
import currentUserQuery from '../queries/CurrentUser';
//Mutations
import logoutMutation from '../mutations/Logout';

//Class based component
class Header extends Component {

    onLogoutClick() {
        //Calling a mutation
        this.props.mutate({
            //Rerun all the queries the mutation has affected, all components affected by new queries will change
            refetchQueries: [{ query: currentUserQuery}]
        });
    }

    //Whether to show login or logout depending on auth
    renderButtons() {
        //destructuring for code cleanliness - pulling out what we want from the props at this stage
        const { loading, user } = this.props.data;

        //If the query hasn't completed yet to determine if user is authenticated or not
        if (loading) {
            return <div />
        }

        //if there is a currently authenticated user
        if (user) {
            // Using a <a> tag to get the same styling
            return (
                // Bind the context to this click event
                <li><a onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
            );
        } else {
            return (
                // Two possible links that can show up - react wants one root dom element
                <div>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </div>
            );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">
                        Home
                    </Link>
                    <ul className="right">
                        {/*method to call to see which buttons to show*/}
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        );
    }
}

//Multiple queries and mutations to a component, you have to stack up the graphql helper
export default graphql(logoutMutation)(
    graphql(currentUserQuery)(Header)
);