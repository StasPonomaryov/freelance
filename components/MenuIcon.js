import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import styles from './styles/aside.module.scss';

export default function MenuIcon(props) {
  const { href, icon } = props;
  const router = useRouter();

  return (
    <li
      className={`${styles.item} ${router.pathname == href ? styles.active : ""}`}
    >
      <Link href={href}>{icon}</Link>
    </li>
  );
}
