import React, { Component } from 'react';

//Lets us get a query and a component to sandwhich them together when exporting them
import { graphql } from 'react-apollo';

import currentUserQuery from '../queries/CurrentUser';

//Class based component
class Header extends Component {

    //Whether to show login or logout depending on auth
    renderButtons() {
        //destructuring for code cleanliness - pulling out what we want from the props at this stage
        const { loading, user } = this.props.data;

        //If the query hasn't completed yet to determine if user is authenticated or not
        if(loading) {
            return <div />
        }

        //if there is a currently authenticated user
        if(user) {
            return <div>Logout</div>;
        } else {
            return (
                <div>Login</div>
            );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    {/*method to call to see which buttons to show*/}
                    {this.renderButtons()}
                </div>
            </nav>
        );
    }
}

export default graphql(currentUserQuery)(Header);