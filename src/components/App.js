import React, { useState } from "react";
import styled from "@emotion/styled";

import AppRouter from "components/Router";
import { authService } from "firedb";

const StyledAppWrapper = styled.div`
	display: flex;
	margin: 0;
	padding: 0;
`;

export default function App() {
	const currentUser = authService.currentUser;
	const [isLoggedIn, setIsLoggedIn] = useState(currentUser);
	return (
		<StyledAppWrapper>
			<AppRouter isLoggedIn={isLoggedIn} />
		</StyledAppWrapper>
	);
}
