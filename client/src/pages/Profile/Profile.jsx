import { useMatch } from "react-router-dom";
import { ProfileContent, ProfileForm } from "./components";

import styled from "styled-components";

const ProfileContainer = ({ className }) => {
	const isEditing = !!useMatch("/profile/edit");

	return (
		<div className={className}>
			<h3>Профиль</h3>
			{isEditing ? (
				<>
					<ProfileForm />
				</>
			) : (
				<>
					<ProfileContent />
				</>
			)}
		</div>
	);
};

export const Profile = styled(ProfileContainer)`
	display: flex;
	flex-direction: column;
	width: calc(100vw - 300px);
	height: calc(100% - 60px);
	padding: 10px 30px;
	font-size: 20px;
	border-radius: 10px;
	background-color: #2a2d3e;

	& h3 {
		text-align: center;
	}
`;
