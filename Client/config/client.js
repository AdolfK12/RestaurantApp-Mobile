import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://f2c2.c1-rental-transportation.site", //ngrok
  cache: new InMemoryCache(),
});

export default client;
