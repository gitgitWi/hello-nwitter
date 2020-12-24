import React from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { authService } from "firedb";

const StyledLogoutButton = styled.button`
	width: 70px;
	height: 30px;

	border: 0;
`;

export default function Profile() {
	const history = useHistory();
	const logoutButtonHandler = () => {
		authService.signOut();
		history.push("/");
	};
	return (
		<StyledLogoutButton onClick={logoutButtonHandler}>
			Logout
		</StyledLogoutButton>
	);
}
