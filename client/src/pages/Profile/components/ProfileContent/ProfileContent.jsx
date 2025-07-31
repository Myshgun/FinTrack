import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon } from "../../../../components";
import { selectUser } from "../../../../redux/selectors";

import styled from "styled-components";

const InfoBlock = styled.div`
	width: 290px;
	height: 40px;
	margin: 0 10px;
	padding: 0 15px;

	border-radius: 10px;
	background-color: #20222f;
`;

const Img = styled.img`
	width: 130px;
	border-radius: 50%;
`;

const ProfileConentContainer = ({ className }) => {
	const navigate = useNavigate();

	const {
		firstName,
		lastName,
		middleName,
		email,
		phoneNumber,
		createdAt,
		photoUrl,
	} = useSelector(selectUser);

	return (
		<div className={className}>
			<div className="main-block">
				<div className="info-block">
					<Img src={photoUrl || null} alt="Аватар" />
					<div className="fullname-block">
						<div>
							Фамилия <InfoBlock>{lastName}</InfoBlock>
						</div>
						<div>
							Имя <InfoBlock>{firstName}</InfoBlock>
						</div>
						<div>
							Отчество <InfoBlock>{middleName}</InfoBlock>
						</div>
					</div>
				</div>
				<Icon
					id="fa-pencil-square-o"
					size="30px"
					inactive={false}
					onClick={() => navigate("/profile/edit")}
				/>
			</div>
			<div className="contacts-block">
				<div>
					Email <InfoBlock>{email}</InfoBlock>
				</div>
				<div>
					Телефон <InfoBlock>{phoneNumber}</InfoBlock>
				</div>
			</div>
			<div className="registered-at-block">
				Дата регистрации <InfoBlock>{createdAt}</InfoBlock>
			</div>
		</div>
	);
};

export const ProfileContent = styled(ProfileConentContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& .main-block {
		display: flex;
		justify-content: space-between;
		align-items: start;
		margin-bottom: 30px;
		width: 100%;
	}

	& .info-block {
		display: flex;
		justify-content: start;
		align-items: center;
		width: 100%;
		line-height: 2;
	}

	& .fullname-block {
		margin-left: 40px;
	}

	& .fullname-block > div,
	.contacts-block > div,
	.registered-at-block {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}

	& .contacts-block,
	.registered-at-block {
		line-height: 2;
		align-self: start;
	}

	& .contacts-block {
		margin-bottom: 50px;
	}
`;
