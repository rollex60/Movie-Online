import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { IGenreEditInput } from './genre-edit.interface';
import { useGenreEdit } from './useGenreEdit';
import Meta from '@/utils/meta/Meta';
import { stripHtml } from 'string-strip-html'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import Field from '@/components/ui/form-elements/Field';
import SlugField from '@/components/ui/form-elements/SlugField/SlugField';
import { generateSlug } from '@/utils/string/generateSlug';
import Button from '@/components/ui/form-elements/Button';

// import formStyles from '@/ui/form-elements/admin-form.module.scss'
import formStyles from '../../../ui/form-elements/admin-form.module.scss';
import dynamic from 'next/dynamic';

const DynamicTextEditor = dynamic(() => import('@/ui/form-elements/TextEditor'), {
  ssr: false,
})

const GenreEdit: FC = () => {
  const {handleSubmit, register, formState: {errors}, setValue, getValues, control} = useForm<IGenreEditInput>({
    mode: 'onChange'
  })

  const { isLoading, onSubmit } = useGenreEdit(setValue)
 return <Meta title="Edit Genre" >
  <AdminNavigation />
  <Heading title='Edit Genre' />
  <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
    {isLoading ? <SkeletonLoader count={3} />
    : <>
    <div className={formStyles.fields}>
      <Field {...register('name', {
        required: 'Name is required!',
      })}
      placeholder="Name"
      error={errors.name}
      style={{ width: '31%' }}
      />

      <div style={{ width: '31%'}}>
        
      <SlugField register={register} error={errors.slug} generate={() => {
        setValue('slug', generateSlug(getValues('name')));
      }}/>

      </div>

      <Field {...register('icon', {
        required: 'Icon is required!',
      })}
      placeholder="Icon"
      error={errors.icon}
      style={{ width: '31%' }}
      />

      <Controller 
      control={control} 
      name="description" 
      defaultValue='' 
      render={({
        field: {
          value, onChange
      },
      fieldState: {error}
      }) => <DynamicTextEditor onChange={onChange} value={value} error={error} placeholder="Description" />
      }
      rules={{
        validate: {
          required: (v) =>
          (v && stripHtml(v).result.length > 0) || 'Description is required!',
    }}
    }
      />
      <Button>Update</Button>
    </div>
    </>
  }
  </form>
 </Meta>
}

export default GenreEdit