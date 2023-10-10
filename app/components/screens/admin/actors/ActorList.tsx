import { FC } from 'react'
import Meta from '@/utils/meta/Meta';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Heading from '@/components/ui/heading/Heading';
import { useActors } from './useActors';
import AdminHeader from '@/components/ui/admin-navigation/AdminHeader/AdminHeader';
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable';

const ActorList: FC = () => {
  const {handleSearch, isLoading, searchTerm, data, deleteAsync, createAsync} = useActors()

 return <Meta title='Actors'>
    <AdminNavigation />
    <Heading title='Actors' />

    <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync} />
    <AdminTable isLoading={isLoading} removeHandler={deleteAsync} 
    headerItems={['Name', 'Count movies']} tableItems={data || []} />
  </Meta> 
}

export default ActorList