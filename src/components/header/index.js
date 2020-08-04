import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<nav>
			<Link href="/">Home </Link>
			<Link href="/credit-view">Credit View </Link>
		</nav>
	</header>
);

export default Header;
