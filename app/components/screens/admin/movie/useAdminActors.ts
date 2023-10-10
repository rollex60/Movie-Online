
import { ActorService } from '@/services/actor.service';

import { useQuery } from 'react-query';
import { toastError } from '@/utils/toast-error';
import { IOption } from '@/ui/select/select.interface';

export const useAdminActors = () => {
  const queryData = useQuery('List of actor', () => 
  ActorService.getAll(), {
    select: ({ data }) => data.map(
      (actor): IOption => ({
        label: actor.name,
        value: actor._id,
      })
    ),

    onError: (error) => {
      toastError(error, 'Actor list');
    }
  })

  return queryData;
}