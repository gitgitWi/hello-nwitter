import React, { useState } from "react";
import styled from "@emotion/styled";
import { firebaseInstance, authService } from "firedb";

const StyledAuthWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	width: 100%;
	height: max-content;
`;

const StyledAuthHeader = styled.div`
	width: 100%;
	height: 60px;
	padding: 10px;

	font-family: "Noto Sans KR", sans-serif;
	font-size: 26px;
	text-align: center;
`;

const StyledLoginForm = styled.form`
	width: 80%;
	max-width: 900px;
`;

const StyledLoginLabel = styled.label`
	width: 100%;
	height: 30px;

	text-align: left;
	font-size: 22px;
`;

const StyledLoginInput = styled.input`
	width: 100%;
	height: 30px;
	margin-bottom: 10px;
`;

const StyledLoginSubmit = styled.input`
	width: 100%;
	height: 35px;
	margin: 10px 0;

	font-size: 22px;
`;

const StyledLoginErrorMessage = styled.p`
	font-size: 14px;
	font-weight: 900;
	color: red;
`;

const StyledOAuthButton = styled.button`
	width: 80%;
	height: 35px;

	font-size: 22px;
`;

export default function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");

	const changeHandler = (e) => {
		const {
			currentTarget: { name, value }
		} = e;

		if (name === "email") setEmail(value);
		if (name === "password") setPassword(value);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const data = newAccount
				? await authService.createUserWithEmailAndPassword(
						email,
						password
				  )
				: await authService.signInWithEmailAndPassword(email, password);
		} catch (e) {
			setError(e.message);
		}
	};

	const toggleAccount = () => setNewAccount((prev) => !prev);

	const onOAuthButtonClick = async (e) => {
		const {
			currentTarget: { name }
		} = e;
		const provider =
			name === "google"
				? new firebaseInstance.auth.GoogleAuthProvider()
				: new firebaseInstance.auth.GithubAuthProvider();
		const data = await authService.signInWithPopup(provider);
	};

	return (
		<StyledAuthWrapper>
			<StyledAuthHeader>Need to Login</StyledAuthHeader>
			<StyledLoginForm onSubmit={submitHandler}>
				<StyledLoginLabel htmlFor="form-email">ID</StyledLoginLabel>
				<StyledLoginInput
					id="form-email"
					name="email"
					type="email"
					required
					value={email}
					onChange={changeHandler}
				/>
				<StyledLoginLabel htmlFor="form-password">
					Password
				</StyledLoginLabel>
				<StyledLoginInput
					id="form-password"
					name="password"
					type="password"
					required
					value={password}
					onChange={changeHandler}
				/>
				<StyledLoginErrorMessage>{error}</StyledLoginErrorMessage>
				<StyledLoginSubmit
					type="submit"
					value={newAccount ? "Create New Account" : "Sign In"}
					onClick={toggleAccount}
				/>
			</StyledLoginForm>

			<StyledOAuthButton name="google" onClick={onOAuthButtonClick}>
				Google
			</StyledOAuthButton>
			<StyledOAuthButton name="github" onClick={onOAuthButtonClick}>
				Github
			</StyledOAuthButton>
		</StyledAuthWrapper>
	);
}
