import {
  BiHomeAlt,
  BiCalendarCheck,
  BiCaretDown,
  BiUser,
  BiMessageAltAdd,
  BiMessageAltEdit,
  BiMessageAltX,
} from 'react-icons/bi';
import MenuItem from './MenuItem';
import styles from './styles/aside.module.scss';

export default function Sidebar() {

  return (
    <aside className="site-sidebar bg-purple-600 dark:bg-gray-900 py-3 px-8">
      <div className="text-white text-right cursor-pointer">&times;</div>
      <ul className="list-none">
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
    </aside>
  );
}
