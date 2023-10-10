import { FC } from 'react'

import { useForm } from 'react-hook-form';
import { IProfileInput } from './profile.interface';
import { useProfile } from './useProfile';
import { Meta } from '@/utils/meta/Meta';
import AuthFields from './../../layout/Navigation/MenuContainer/auth/AuthFields';

import styles from './Profile.module.scss'
import Heading from '@/components/ui/heading/Heading';
import Button from '@/components/ui/form-elements/Button';
import SkeletonLoader from './../../ui/SkeletonLoader';


const Profile: FC = () => {
  const { handleSubmit, register, formState, setValue } = useForm<IProfileInput>({
    mode: 'onChange',
  })

  const { isLoading, onSubmit } = useProfile(setValue)

 return <Meta title='Profile'>

  <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
    <Heading title='Profile' className='mb-6' />
    {isLoading ? <SkeletonLoader count={2} />
     :<AuthFields formState={formState} register={register} />}

      <Button>Update</Button>
  </form>

        </Meta>
}

export default Profile