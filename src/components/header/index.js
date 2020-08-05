import { h } from 'preact';
import { Link } from 'preact-router/match';
import baseroute from '../../baseroute';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<nav>
			<Link href={`/${baseroute}`}>Home </Link>
			<Link href={`/${baseroute}credit-view`}>Credit View </Link>
		</nav>
	</header>
);

export default Header;
