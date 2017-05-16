import React, { Component } from 'react';

class AuthForm extends Component {

    //Defining component level state
    constructor(props) {
        super(props);

        this.state = { email: '', password: ''};
    }

    onSubmit(event) {
        event.preventDefault();

        //Here is where we call the prop passed from the LoginForm
        //Want to pass email and password to the parent component as that's what the mutation expects
        //placing it in a const is to make sure you don't accidently mutate the state object in this event handler
        const { email, password } = this.state;
        this.props.onSubmit({ email, password });
    }

    render() {
        return (
            <div className="row">
                {/*The onsubmit here is within the context of the Authform and not the LoginForm!*/}
                <form onSubmit={this.onSubmit.bind(this)} className="col s4">
                    <div className="input-field">
                        <input 
                            placeholder="Email"
                            value={this.state.email}
                            onChange={event => this.setState({ email: event.target.value })}
                        />
                    </div>
                    <div className="input-field">
                        <input 
                            placeholder="Password"
                            type="password"
                            value={this.state.password}
                            onChange={event => this.setState({ password: event.target.value })}
                        />
                    </div>
                    <button className="btn">Submit</button>
                </form>
            </div>
        );
    }
}

export default AuthForm;