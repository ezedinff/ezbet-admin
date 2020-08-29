import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import state from './state';
import { message } from 'antd';

//const SERVER_URL = "http://localhost:9852/graphql" || process.env.REACT_APP_API_SERVER_URL;
const SERVER_URL = process.env.REACT_APP_API_SERVER_URL || "http://localhost:9852/graphql";
const cache = new InMemoryCache({});

const request = async (operation: any) => {
  const token = localStorage.getItem('token');
  // set the token in the request header for authorization
  operation.setContext({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(error => {
        if(error.extensions && (error.extensions.exception.response.statusCode | error.extensions.exception.response.status) >= 500) {
          message.error("Something wrong with the server. please try again later.");
        } else {
          message.error(error.message);
        }
      })
    }
    if (networkError) {
      message.error("Connection Lost");
      console.log('[networkError]', networkError);
    }
  }),
  requestLink,
  withClientState(state(cache)),
  new HttpLink({
    uri: SERVER_URL,
    // For server with different domain use "include"
    credentials: 'same-origin',
  }),
]);

const client = new ApolloClient({ link, cache });

export { client };
