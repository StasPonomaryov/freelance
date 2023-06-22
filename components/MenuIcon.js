import Link from 'next/link';

export default function MenuIcon(props) {
  const { href, icon } = props;
  console.log(href, icon);

  return (
    <li className="w-10 h-10 flex justify-center align-center">
      <Link href={href}>
        {icon}
      </Link>
    </li>
  );
}
