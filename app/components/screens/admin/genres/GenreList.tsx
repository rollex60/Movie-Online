import { FC } from 'react'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Heading from '@/components/ui/heading/Heading';
import { useGenres } from './useGenres';
import AdminHeader from '@/components/ui/admin-navigation/AdminHeader/AdminHeader';
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable';

import { Meta } from '@/utils/meta/Meta';


const GenreList: FC = () => {
  const {handleSearch, isLoading, searchTerm, data, deleteAsync, createAsync} = useGenres()

 return <Meta title='Genres'>
    <AdminNavigation />
    <Heading title='Genres' />

    <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync} />
    <AdminTable isLoading={isLoading} removeHandler={deleteAsync} 
    headerItems={['Name', 'Slug']} tableItems={data || []} />
  </Meta> 
}

export default GenreList