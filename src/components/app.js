import { h, Component } from 'preact';
import { Router, Route } from 'preact-router';
import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Profile from '../routes/profile';
import baseroute from '../baseroute';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router>
					<Home path={`/${baseroute}`} />
					<Profile path={`/${baseroute}credit-view`} />
				</Router>
			</div>
		);
	}
}
