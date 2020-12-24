import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import AppRouter from "components/Router";
import { authService } from "firedb";

const StyledAppWrapper = styled.div`
	display: flex;
	margin: 0;
	padding: 0;
`;

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [init, setInit] = useState(false);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			setIsLoggedIn(user ? true : false);
		});
		setInit(true);
	}, []);

	return (
		<StyledAppWrapper>
			{init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
		</StyledAppWrapper>
	);
}
