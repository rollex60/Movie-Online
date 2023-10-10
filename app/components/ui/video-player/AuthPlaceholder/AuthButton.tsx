import { FC } from 'react'
import Link from 'next/link'

import { getMovieUrl } from 'configs/url.config'


// import styles from './AuthButton.module.scss'

import styles from './AuthPlaceholder.module.scss'

const AuthButton: FC<{slug: string}> = ({slug}) => {
 return <Link legacyBehavior href={`/auth?redirect=${getMovieUrl(slug)}`}>
  <a className={styles.btn}>Sign in</a>
 </Link>
}

export default AuthButton