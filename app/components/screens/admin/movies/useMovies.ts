import { useDebounce } from "@/hooks/useDebounce"
import { MovieService } from "@/services/movie.service"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface';
import { getAdminUrl } from "configs/url.config";
import { convertMongoDate } from "@/utils/date/convertMongoDate";
import { toastError } from '../../../../utils/toast-error';
import { toastr } from 'react-redux-toastr';
import { getGenreList } from "@/utils/movie/getGenresList";
import { useRouter } from "next/router";


export const useMovies = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(
    ['movie list', debouncedSearch],
    () => MovieService.getAll(debouncedSearch),
    {
      select: ({ data }) => data.map((movie):ITableItem => ({
        _id: movie._id,
        editUrl: getAdminUrl(`movie/edit/${movie._id}`),
        items: [movie.title, getGenreList(movie.genres), String(movie.rating)],
      })
      ),
      onError: (error) => {
        toastError(error, 'movie list')
      },
    }
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const {push} = useRouter()

  const {mutateAsync: createAsync} = useMutation(
    'create movie',
    (genreId:string) => MovieService.create(),
    {
      onError: (error) => {
        toastError(error, 'Create movie')
      },
      onSuccess: ({data:_id}) => {
        toastr.success( 'Create movie', 'create was successful')
        push(getAdminUrl(`movie/edit/${_id}`))
      },
    }
  )

  const {mutateAsync: deleteAsync} = useMutation(
    'delete movie',
    (movieId:string) => MovieService.delete(movieId),
    {
      onError: (error) => {
        toastError(error, 'Delete movie')
      },
      onSuccess: () => {
        toastr.success( 'Delete movie', 'delete was successful')
        queryData.refetch()
      },
    }
  )

  return useMemo(() => ({
    handleSearch, ...queryData, searchTerm, deleteAsync, createAsync
  }), [queryData, searchTerm, deleteAsync, createAsync])
}