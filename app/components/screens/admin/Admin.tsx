import { FC } from 'react'
import Statistics from './home/Statistics/Statistics';
import { Meta } from '@/utils/meta/Meta';
import Heading from '@/ui/heading/Heading';
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation';

const Admin: FC = () => {
 return <Meta title='Admin panel'>
    <AdminNavigation />
      <Heading title='Some statistics' />
    <Statistics />
 </Meta>
}

export default Admin