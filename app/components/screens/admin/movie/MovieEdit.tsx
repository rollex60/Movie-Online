import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { IMovieEditInput } from './movie-edit.interface';
import { useMovieEdit } from './useMovieEdit';
import Meta from '@/utils/meta/Meta';

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import Field from '@/components/ui/form-elements/Field';
import SlugField from '@/components/ui/form-elements/SlugField/SlugField';
import { generateSlug } from '@/utils/string/generateSlug';
import Button from '@/components/ui/form-elements/Button';
import { stripHtml } from 'string-strip-html'

// import formStyles from '@/ui/form-elements/admin-form.module.scss'
import formStyles from '../../../ui/form-elements/admin-form.module.scss';
import dynamic from 'next/dynamic';
import UploadField from '@/components/ui/form-elements/UploadField/UploadField';
import { useAdminActors } from './useAdminActors';
import { useAdminGenres } from './useAdminGenre';

const DynamicSelect = dynamic(() => import('@/components/ui/select/Select'), {
	ssr: false,
})

const DynamicTextEditor = dynamic(() => import('@/ui/form-elements/TextEditor'), {
  ssr: false,
})

const MovieEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useMovieEdit(setValue)

	const { isLoading: isGenresLoading, data:genres } = useAdminGenres();
	const { isLoading: isActorsLoading, data:actors } = useAdminActors();

	return (
		<Meta title="Edit Movie">
			<AdminNavigation />
			<Heading title="Edit movie" />
			{isLoading ? (
				<SkeletonLoader count={3} />
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
					<div className={formStyles.fields}>
						<Field
							{...register('title', {
								required: 'Title is required!',
							})}
							placeholder="Title"
							error={errors.title}
						/>
						<SlugField
							generate={() => setValue('slug', generateSlug(getValues('title')))}
							register={register}
							error={errors.slug}
						/>

						{/* <Field
							{...register('description', {
								required: 'Description is required!',
							})}
							placeholder="Description"
							error={errors.description}
						/> */}

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

            <Field {...register('parameters.country', {
              required: 'Country is required!',
            })}
            placeholder="Country"
            error={errors.parameters?.country}
            style={{ width: '31%' }}
            />

            <Field {...register('parameters.duration', {
              required: 'Duration is required!',
            })}
            placeholder="Duration (min.)"
            error={errors.parameters?.duration}
            style={{ width: '31%' }}
            />

            <Field {...register('parameters.year', {
              required: 'Year is required!',
            })}
            placeholder="Year"
            error={errors.parameters?.year}
            style={{ width: '31%' }}
            />

            {/* React Select */}

						<Controller
							control={control}
							name="actors"
							render={({
								field,
								fieldState: { error },
							}) => (
								<DynamicSelect
									field={field}
									options={actors || []}
									isLoading={isActorsLoading}
									isMulti
									placeholder='Actors'
									error={error}
								/>
							)}
							rules={{
								required: 'Please select at least one actor!',
							}}
						/>

						<Controller
							control={control}
							name="genres"
							render={({
								field,
								fieldState: { error },
							}) => (
								<DynamicSelect
									field={field}
									options={genres || []}
									isLoading={isGenresLoading}
									isMulti
									placeholder='Genres'
									error={error}
								/>
							)}
							rules={{
								required: 'Please select at least one genre!',
							}}
						/>

						<Controller
							control={control}
							name="poster"
              defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									placeholder="Poster"
									error={error}
									folder="movies"
									value={value}
									onChange={onChange}
								/>
							)}
							rules={{
								required: 'Poster is required!',
							}}
						/>

						<Controller
							control={control}
							name="bigPoster"
              defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									placeholder="Big poster"
									error={error}
									folder="movies"
									value={value}
									onChange={onChange}
								/>
							)}
							rules={{
								required: 'Big poster is required!',
							}}
						/>

            <Controller
							control={control}
							name="videoUrl"
              defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									placeholder="Video"
									error={error}
									folder="movies"
									value={value}
									onChange={onChange}
                  style={{ marginTop: -25 }}
                  isNoImage
								/>
							)}
							rules={{
								required: 'Video is required!',
							}}
						/>
					</div>

					<Button>Update</Button>
				</form>
			)}
		</Meta>
	)
}

export default MovieEdit