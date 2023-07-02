import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiCaretDown } from 'react-icons/bi';
import styles from './styles/aside.module.scss';

export default function MenuItem(props) {
  const { icon, label, href, submenu } = props;
  const [openedSubmenu, setOpenedSubMenu] = useState(false);
  const router = useRouter();

  return (
    <li
      className={`${styles.item} ${
        router.pathname == href ? styles.active : ''
      }`}
    >
      {icon}
      <Link href={href}>{label}</Link>
      {submenu && (
        <span onClick={() => setOpenedSubMenu(!openedSubmenu)}>
          <BiCaretDown />
        </span>
      )}
      {submenu && openedSubmenu && (
        <ul className={`${styles.submenu} list-none`}>
          {submenu.map((i) => i)}
        </ul>
      )}
    </li>
  );
}
