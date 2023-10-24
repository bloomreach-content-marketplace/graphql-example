import {ApolloProvider} from '@apollo/client';
import {useNavigate} from 'react-router';
import {apolloClient} from './lib/graphql/queries';
import Page from './pages/Page';
import {useLocation} from 'react-router-dom';

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
