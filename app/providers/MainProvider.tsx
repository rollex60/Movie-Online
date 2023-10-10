import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from '@/components/layout/Layout'
import ReduxToast from './ReduxToast';
import { store } from './../store/store';
import { Provider } from 'react-redux'
import HeadProvider from './HeadProvider/HeadProvider';
import AuthProvider from './AuthProvider/AuthProvider';
import { TypeComponentAuthFields } from '@/shared/types/auth.types';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

const MainProvider: FC<TypeComponentAuthFields> = ({children, Component}) => {
    return (
        <HeadProvider>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ReduxToast />
                <AuthProvider Component={Component}>
                <Layout>{children}</Layout>
                </AuthProvider>
            </QueryClientProvider>
        </Provider>
        </HeadProvider>
    )
}

export default MainProvider