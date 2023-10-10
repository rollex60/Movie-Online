import { FC } from 'react'

import { FieldError, UseFormRegister } from 'react-hook-form';

import styles from './SlugField.module.scss'
import Field from '@/components/ui/form-elements/Field';

interface ISlugField {
  error?: FieldError
  register: UseFormRegister<any>
  generate: () => void

}

const SlugField: FC<ISlugField> = ({generate, register, error}) => {
 return <div className='relative'>
  <Field {...register('slug', {
        required: 'Slug is required!',
      })}
      placeholder='Slug'
      error={error}
      />

      <div className={styles.badge} onClick={generate}>generate</div>
 </div>
}

export default SlugField