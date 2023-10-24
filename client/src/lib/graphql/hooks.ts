import {useQuery} from '@apollo/client';
import {pageQuery} from './queries';

export function usePage(environment: string, channel: string, path: string) {
    const {data, loading, error} = useQuery(pageQuery, {
        variables: {environment, channel, path},
    });
    return {page: data?.page, loading, error: Boolean(error)};
}


