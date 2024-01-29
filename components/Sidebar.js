import {
  BiHomeAlt,
  BiCalendarCheck,
  BiUser,
  BiMessageAltAdd,
  BiMessageAltEdit,
  BiMessageAltX,
  BiLeftArrowAlt,
  BiRightArrowAlt,
  BiMessageSquareEdit,
  BiMessageSquareX,
  BiMessageSquareAdd,
} from 'react-icons/bi';
import classNames from 'classnames';
import MenuItem from './UI/MenuItem';
import styles from './styles/aside.module.scss';
import MenuIcon from './UI/MenuIcon';

const links = [
  {
    id: 1,
    href: '/admin',
    label: 'Home',
    icon: <BiHomeAlt />,
    root: true,
  },
  {
    id: 2,
    href: '/orders',
    label: 'Orders',
    icon: <BiCalendarCheck />,
    children: [3, 4, 5],
    root: true,
  },
  {
    id: 3,
    href: '/addorder',
    label: 'Add order',
    icon: <BiMessageAltAdd />,
  },
  {
    id: 4,
    href: '/editorder',
    label: 'Edit order',
    icon: <BiMessageAltEdit />,
  },
  {
    id: 5,
    href: '/removeorder',
    label: 'Remove order',
    icon: <BiMessageAltX />,
  },
  {
    id: 6,
    href: '/clients',
    label: 'Clients',
    icon: <BiUser />,
    children: [7, 8, 9],
    root: true,
  },
  {
    id: 7,
    href: '/addclient',
    label: 'Add client',
    icon: <BiMessageSquareAdd />,
  },
  {
    id: 8,
    href: '/editclient',
    label: 'Edit client',
    icon: <BiMessageSquareEdit />,
  },
  {
    id: 9,
    href: '/removeclient',
    label: 'Remove client',
    icon: <BiMessageSquareX />,
  },
];

export default function Sidebar(props) {
  const { collapsed, setCollapsed } = props;

  return (
    <aside
      className={classNames({
        'sidebar-nav p-2 fixed': true,
        collapsed: collapsed,
      })}
    >
      <div className="sidebar-content">
        <div
          className={classNames({
            'flex flex-col items-center': true,
            'p-4 justify-end': !collapsed,
            'py-4 justify-center': collapsed,
          })}
        >
          <button
            className="sidebar-button"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <BiRightArrowAlt color="white" />
            ) : (
              <BiLeftArrowAlt color="white" />
            )}
          </button>
          <ul
            className={classNames({
              hidden: !collapsed,
            })}
          >
            {links.map((i) => {
              return (
                <MenuIcon
                  key={i.id}
                  href={i.href}
                  label={i.label}
                  icon={i.icon}
                />
              );
            })}
          </ul>
        </div>
        {!collapsed && (
          <ul className={`list-none px-6 ${styles.menu}`}>
            {links.map((i) => {
              if (!i.root) return;
              return (
                <MenuItem
                  key={i.id}
                  icon={i.icon}
                  label={i.label}
                  href={i.href}
                  submenu={
                    i.children &&
                    i.children.map((c) => {
                      const child = links.find((l) => l.id === c);
                      return (
                        <MenuItem
                          key={child.id}
                          icon={child.icon}
                          label={child.label}
                          href={child.href}
                        />
                      );
                    })
                  }
                />
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
