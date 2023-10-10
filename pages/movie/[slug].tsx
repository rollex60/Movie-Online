import { MovieService } from '@/services/movie.service';

import { IMovie } from '@/shared/types/movie.types';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error404 from '../404';
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface';
import SingleMovie from '@/components/screens/single-movie/SingleMovie';
import { getMovieUrl } from 'configs/url.config';

export interface IMoviePage {
  movie: IMovie;
  similarMovies: IGalleryItem[]
}

const MoviePage: NextPage<IMoviePage> = ({similarMovies, movie}) => {
 return movie ? <SingleMovie similarMovies={similarMovies || []} movie={movie} />
         : <Error404 />
}

export const getStaticPaths:GetStaticPaths = async () => {
  try {

    const {data:movies} = await MovieService.getAll();
    const paths = movies.map((a) => ({
      params:{slug: a.slug},
    }))

    return {paths, fallback: 'blocking'}

  } catch (error) {
    return {
      paths: [],
      fallback: false
    }
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    const {data:movie} = await MovieService.getBySlug(String(params?.slug));

    const {data:dataSimilarMovies} = await MovieService.getByGenres(movie.genres.map(g => g._id));

    const similarMovies:IGalleryItem[] = dataSimilarMovies.filter(m => m._id !== movie._id).map((m) => ({
      name: m.title,
      posterPath: m.poster,
      link: getMovieUrl(m.slug),
    }))

    return {
      props: {
        similarMovies,
        movie,
      },
    }

  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default MoviePage