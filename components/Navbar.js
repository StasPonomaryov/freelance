import styles from './styles/navbar.module.scss';

export default function Navbar(props) {
  const { authUser, signOut } = props;

  return (
    <nav className={'header-content h-full p-2 bg-amber-500 rounded-md dark:bg-gray-900 dark:text-white flex align-center'}>
      <div className={styles.leftside}>
        <div className={`${styles.avatar} rounded-full`}>
          <span>{authUser?.email[0].toUpperCase() || '?'}</span>
        </div>
        <div className={styles.userinfo}>{authUser?.email}</div>
      </div>
      <div className={styles.logout} onClick={signOut}>sign out</div>
    </nav>
  );
}
