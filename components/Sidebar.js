import {
  BiHomeAlt,
  BiCalendarCheck,
  BiUser,
  BiMessageAltAdd,
  BiMessageAltEdit,
  BiMessageAltX,
} from 'react-icons/bi';
import { BsArrowRightSquareFill, BsArrowLeftSquareFill } from 'react-icons/bs';
import cn from 'classnames';
import MenuItem from './MenuItem';
import styles from './styles/aside.module.scss';
import classNames from 'classnames';

export default function Sidebar(props) {
  const { collapsed, setCollapsed, shown } = props;

  return (
    <aside className={classNames({
      "site-sidebar bg-purple-600 dark:bg-gray-900 py-3 px-8": true,
      "fixed md:static md:translate-x-0 h-screen": true,
      "w-[300px]": !collapsed,
      "w-16": collapsed,
      "md:-translate-x-full": !shown,
    })}
    >
      <div
        className={cn({
          'flex flex-col justify-between': true,
        })}
      >
        <div
          className={cn({
            'flex items-end': true,
            'p-4 justify-end': !collapsed,
            'py-4 justify-end': collapsed,
          })}
        >
          <button
            className={cn({
              'grid place-content-center ': true,
              'w-10 h-10 rounded-full ': true,
            })}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <BsArrowRightSquareFill /> : <BsArrowLeftSquareFill />}
          </button>
        </div>
        {!collapsed && (
          <ul className={`list-none flex-grow ${styles.menu}`}>
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
                  icon={<BiMessageAltAdd />}
                  label="Add client"
                  href="/addclient"
                />,
                <MenuItem
                  key="1"
                  icon={<BiMessageAltEdit />}
                  label="Edit client"
                  href="/editclient"
                />,
                <MenuItem
                  key="2"
                  icon={<BiMessageAltX />}
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
