import Link from 'next/link';
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
import classnames from 'classnames';
import MenuItem from './MenuItem';
import styles from './styles/aside.module.scss';
import classNames from 'classnames';
import MenuIcon from './MenuIcon';

export default function Sidebar(props) {
  const { collapsed, setCollapsed, shown } = props;

  return (
    <aside
      className={classNames({
        'sidebar-nav p-2 fixed': true,
        collapsed: collapsed,
      })}
    >
      <div
        className={
          'sidebar-content bg-purple-700 dark:bg-gray-950 rounded-md dark:text-white h-full'
        }
      >
        <div
          className={classnames({
            'flex flex-col items-center': true,
            'p-4 justify-center': !collapsed,
            'py-4 justify-center': collapsed,
          })}
        >
          <button
            className={classnames({
              'flex justify-center align-center ': true,
              'w-10 h-10 rounded-full ': true,
            })}
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
            <MenuIcon href="/admin" icon={<BiHomeAlt />} />
            <MenuIcon href="/orders" icon={<BiCalendarCheck />} />
            <MenuIcon href="/addorder" icon={<BiMessageAltAdd />} />
            <MenuIcon href="/editorder" icon={<BiMessageAltEdit />} />
            <MenuIcon href="/removeorder" icon={<BiMessageAltX />} />
            <MenuIcon href="/clients" icon={<BiUser />} />
            <MenuIcon href="/addclient" icon={<BiMessageSquareAdd />} />
            <MenuIcon href="/editclient" icon={<BiMessageSquareEdit />} />
            <MenuIcon href="/removeclient" icon={<BiMessageSquareX />} />
          </ul>
        </div>
        {!collapsed && (
          <ul className={`list-none px-6 ${styles.menu}`}>
            <MenuItem icon={<BiHomeAlt />} label="Home" href="/admin" />
            <MenuItem
              icon={<BiCalendarCheck />}
              label="Orders"
              href="/orders"
              submenu={[
                <MenuItem
                  key="0"
                  icon={<BiMessageAltAdd />}
                  label="Add order"
                  href="/addorder"
                />,
                <MenuItem
                  key="1"
                  icon={<BiMessageAltEdit />}
                  label="Edit order"
                  href="/editorder"
                />,
                <MenuItem
                  key="2"
                  icon={<BiMessageAltX />}
                  label="Remove order"
                  href="/removeorder"
                />,
              ]}
            />
            <MenuItem
              icon={<BiUser />}
              label="Clients"
              href="/clients"
              submenu={[
                <MenuItem
                  key="0"
                  icon={<BiMessageSquareAdd />}
                  label="Add client"
                  href="/addclient"
                />,
                <MenuItem
                  key="1"
                  icon={<BiMessageSquareEdit />}
                  label="Edit client"
                  href="/editclient"
                />,
                <MenuItem
                  key="2"
                  icon={<BiMessageSquareX />}
                  label="Remove client"
                  href="/removeclient"
                />,
              ]}
            />
          </ul>
        )}
      </div>
    </aside>
  );
}
