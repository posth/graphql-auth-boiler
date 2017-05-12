import React from 'react';
import ReactDOM from 'react-dom';

//Apollo client librarye xports the apollo client as the default export
import ApolloClient from 'apollo-client';
//react apollo exports multiple different properties, hence the {}
import { ApolloProvider } from 'react-apollo';

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
      <div>
        Auth Starter
      </div>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
