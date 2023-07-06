import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles/aside.module.scss';

export default function MenuIcon(props) {
  const { href, icon, title } = props;
  const router = useRouter();

  return (
    <li title={title}
      className={`${styles.item} ${router.pathname == href ? styles.active : ""}`}
    >
      <Link href={href}>{icon}</Link>
    </li>
  );
}
