import React from 'react';
import ReactDOM from 'react-dom';

//Apollo client librarye xports the apollo client as the default export
import ApolloClient from 'apollo-client';
//react apollo exports multiple different properties, hence the {}
import { ApolloProvider } from 'react-apollo';

//Routing
import { Router, hashHistory, Route, Indexroute } from 'react-router';

import App from './components/App';

const client = new ApolloClient({
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
