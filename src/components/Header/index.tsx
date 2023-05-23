import Link from 'next/link';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { ActiveLink } from '../ActiveLink';
import Image from 'next/image';
export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Image src="/logo.svg" alt="Home Image" width={360} height={360} />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home </a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
      </div>
    </header>
  );
}
