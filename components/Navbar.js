import styles from './styles/navbar.module.scss';

export default function Navbar(props) {
  const { authUser, signOut } = props;

  return (
    <nav className="header-content">
      <div className={styles.leftside}>
        <div className={`${styles.avatar} rounded-full`}>
          <span>{authUser?.email[0].toUpperCase() || '?'}</span>
        </div>
        <div className={styles.userinfo}>{authUser?.email}</div>
      </div>
      <div className={styles.logout} onClick={signOut}>
        sign out
      </div>
    </nav>
  );
}
