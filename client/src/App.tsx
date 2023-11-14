import {ApolloProvider} from '@apollo/client';
import {apolloClient} from './lib/graphql/queries';
import Page from './pages/Page';

function App() {

    return (
        <ApolloProvider client={apolloClient}>
            <main className="section">
                <Page/>
            </main>
        </ApolloProvider>
    );
}

export default App;
