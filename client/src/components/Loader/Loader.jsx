import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	width: 40px;
	height: 40px;
	border: 4px solid #ccc;
	border-top-color: #1d72b8;
	border-radius: 50%;
	animation: ${spin} 1s linear infinite;
`;

const LoaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<Spinner />
		</div>
	);
};

export const Loader = styled(LoaderContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: inherit;
`;
