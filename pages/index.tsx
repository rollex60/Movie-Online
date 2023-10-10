import type { GetStaticProps, NextPage } from "next"
// import { IHome } from '@/screens/home/home.types'
import { getGenreList } from '@/utils/movie/getGenresList'

import Home from "@/components/screens/home/Home"
import { ISlide } from "@/components/ui/slider/slider.types"
import { MovieService } from "@/services/movie.service"

import { IHome } from "@/components/screens/home/home.interface"
import { getActorUrl, getMovieUrl } from "configs/url.config"
import { ActorService } from './../app/services/actor.service';
import { IGalleryItem } from "@/components/ui/gallery/gallery.interface"
import { errorCatch } from 'api/api.helpers';


const HomePage: NextPage<IHome> = (props) => {
    return <Home {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: movies } = await MovieService.getAll()

        const slides: ISlide[] = movies.slice(0, 3).map((m) => ({
            _id: m._id,
            link: getMovieUrl(m.slug),
            bigPoster: m.bigPoster,
            subTitle: getGenreList(m.genres),
            title: m.title,
    }))

    const { data: dataActors } = await ActorService.getAll()

    const actors:IGalleryItem[] = dataActors.slice(0,8).map(a => ({
        name: a.name,
        posterPath: a.photo,
        link: getActorUrl(a.slug),
        content: {
            title: a.name,
            subTitle: `+${a.countMovies} movies`,
        },
    }))

    const dataTrendingMovies = await MovieService.getMostPopularMovies()

    const trendingMovies: IGalleryItem[] = dataTrendingMovies
    .slice(0, 7)
    .map((m) => ({
        name:m.title,
        posterPath: m.poster,
        link: getMovieUrl(m.slug),
        content: {
            title: m.title,
        },
    }))

    return {
        props: {
            actors,
            slides,
            trendingMovies,
        } as IHome,
    }
} catch (error) {
    console.log(errorCatch(error))

    return {
        props: {
            actors: [],
			slides: [],
			trendingMovies: [],
        }
      }
   }
}

export default HomePage