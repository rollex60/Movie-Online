import { FC } from 'react'
import ReduxToastrLib from 'react-redux-toastr'

const ReduxToast: FC = () => {
  return (
    <ReduxToastrLib 
    newestOnTop={false}
    preventDuplicates
    progressBar
    closeOnToastrClick
    timeOut={400}
    transitionIn='fadeIn'
    transitionOut='fadeOut'
    />
  )
}

export default ReduxToast