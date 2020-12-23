import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";

export default ({ isLoggedIn }) => {
	return (
		<Router>
			<Switch>
				{isLoggedIn ? (
					<Route exact path="/">
						<Home></Home>
					</Route>
				) : (
					<Route exact path="/">
						<Auth></Auth>
					</Route>
				)}
			</Switch>
		</Router>
	);
};
