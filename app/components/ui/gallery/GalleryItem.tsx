import { FC } from 'react'
import { IGalleryItemProps } from './gallery.interface'
import Link from 'next/link'
import cn from 'classnames';

import styles from './Gallery.module.scss'
import Image from 'next/image';

const GalleryItem: FC<IGalleryItemProps> = ({item, variant}) => {
 return <Link legacyBehavior href={item.link}>
   <a className={cn(styles.item, {
    [styles.withText]: item.content,
    [styles.horizontal]: variant === 'horizontal',
    [styles.vertical]: variant === 'vertical',
   })}>
    <Image alt={item.name} src={item.posterPath} layout='fill' draggable={false} priority />
    {item.content && (
      <div className={styles.content}>
        <div className={styles.title}>{item.content.title}</div>
        {item.content.subTitle && (
          <div className={styles.subTitle}> {item.content.subTitle}</div>
        )}
      </div>
    )}
   </a>
   </Link>
}

export default GalleryItem