import {ApolloServer} from '@apollo/server';
import {expressMiddleware as apolloMiddleware} from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import {readFile} from 'node:fs/promises';
import {resolvers} from './resolvers.js';

const PORT = 9000;

const app = express();
app.use(cors(), express.json());

// app.post('/login', handleLogin);

const typeDefs = await readFile('./schema.graphql', 'utf8');

// async function getContext({ req }): Promise<ResolverContext> {
//   const companyLoader = createCompanyLoader();
//   const context: ResolverContext = { companyLoader };
//   if (req.auth) {
//     context.user = await getUser(req.auth.sub);
//   }
//   return context;
// }

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer/*, { context: getContext }*/));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
