import React from 'react';
import ReactDOM from 'react-dom';

//Apollo client librarye xports the apollo client as the default export
import ApolloClient, { createNetworkInterface } from 'apollo-client';
//react apollo exports multiple different properties, hence the {}
import { ApolloProvider } from 'react-apollo';

//Routing
import { Router, hashHistory, Route, Indexroute } from 'react-router';

import App from './components/App';

//* by default graphQL doesn't attach cookie information to the request
//GraphiQL DOES attach cookies with the request object to identify with the backend in the case of user auth
//need to add config to graphQL to add cookies to request
const networkInterface = createNetworkInterface({
  //Apollo assumes you are listening to graphql on /graphql - its redefined here because when you
  //recreate a networkInterface it doesn't assume the endpoint of /graphql anymore
  uri: '/graphql',
  //it is safe to send cookies with the outgoing request - tells apollo client to send cookies along with queries to the backend
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  //custom network interface passed along to enable cookies to be passed with queries to the backend
  networkInterface,
  //options object for data ID from object function to be able to identify
  //every record that comes back from the server
  //rather than refetch all data, it can re-identify the data that was already pulled
  //and store in local cache

  //all records fetched from backend will run through this function and identify it by return the records id
  //user id is brought back up and apollo can now identify unique records fetched
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      {/*Base router instance - hashhistory is used to not worry about proper setup in the express side of the app*/}
      <Router history={hashHistory}>
        {/*Base component is App*/}
        <Route path="/" component={App}>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
