import { FC } from 'react'
import { IMoviePage } from '../../../../pages/movie/[slug]'
import Meta from '@/utils/meta/Meta'
import Banner from '@/components/ui/banner/Banner'
import SubHeading from '@/ui/heading/SubHeading';
import Gallery from '@/ui/gallery/Gallery';
import Content from './Content/Content';
import dynamic from 'next/dynamic';
import { useUpdateCountOpened } from './useUpdateCountOpened';

const DynamicPlayer = dynamic(() => import('@/ui/video-player/VideoPlayer'), {
  ssr: false,
})

const DynamicRateMovie = dynamic(() => import('./RateMovie/RateMovie'), {
  ssr: false,
})

const SingleMovie: FC<IMoviePage> = ({movie, similarMovies}) => {
  useUpdateCountOpened(movie.slug)

 return <Meta title={movie.title} description={`Watch ${movie.title}`}>
  <Banner image={movie.bigPoster} Detail={() => <Content movie={movie} />}
  />

  {/* Video player */}
  <DynamicPlayer slug={movie.slug} videoSource={movie.videoUrl} />

  <div className='mt-12'>
    <SubHeading title='Similar' />
    <Gallery items={similarMovies} />
  </div>

  {/* Rating */}
  <DynamicRateMovie slug={movie.slug} id={movie._id} />

  </Meta>
}

export default SingleMovie