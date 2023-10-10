import { SubmitHandler, UseFormSetValue } from'react-hook-form';
import { IActorEditInput } from './actor-edit.interface';
import { useRouter } from 'next/router';
import { ActorService } from '@/services/actor.service';

import { useQuery } from 'react-query';
import { toastError } from '@/utils/toast-error';
import { getKeys } from '../../../../utils/object/getKeys';
import { useMutation } from 'react-query';
import { getAdminUrl } from 'configs/url.config';
import { toastr } from 'react-redux-toastr';

export const useActorEdit = (setValue:UseFormSetValue<IActorEditInput>) => {
  const {push, query} = useRouter();

  const actorId = String(query.id);

  const {isLoading} = useQuery(['actor', actorId], () => ActorService.getById(actorId), {
    onSuccess: ({data}) => {

      getKeys(data).forEach(key => {
        setValue(key, data[key]);
      })
    },
    onError(error) {
      toastError(error, 'Get actor')
    },
    enabled: !!query.id,
  })

  const {mutateAsync} = useMutation('update Actor', (data:IActorEditInput) => ActorService.update(actorId, data), {
    onError: (error) => {
      toastError(error, 'Update actor')
    },

    onSuccess() {
      toastr.success('Update actor', 'update was successful')
      push(getAdminUrl('actors'))
    }
  })

  const onSubmit:SubmitHandler<IActorEditInput> = async (data) => {
    await mutateAsync(data)
  }

  return { onSubmit, isLoading }
}