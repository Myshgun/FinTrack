import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { logout } from "../../redux/actions";
import { selectUser } from "../../redux/selectors";

import styled from "styled-components";

const NavItem = styled.a`
	display: flex;
	align-items: center;
	width: 190px;
	height: 40px;
	padding: 0 20px;
	margin: 0 auto 30px;
	font-size: 18px;
	font-weight: 500;
	border-radius: 10px;
	background-color: ${({ active }) => (active ? "#20222f" : "#2a2d3e")};

	&:hover {
		background-color: #20222f;
	}
`;

const Img = styled.img`
	width: 50px;
	border-radius: 50%;
`;

const NavbarContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { session } = JSON.parse(localStorage.getItem("userData"));

	const { photoUrl } = useSelector(selectUser);

	const onLogout = () => {
		dispatch(logout(session));
		localStorage.removeItem("userData");
		navigate("/");
	};

	return (
		<div className={className}>
			<div className="main-block">
				<Logo
					fontSize="32px"
					iconSize="50px"
					margin="20px auto"
					redirectLink="/dashboard"
				/>
				<nav>
					<div>
						<NavItem onClick={() => navigate("/dashboard")}>
							Дашборд
						</NavItem>
						<NavItem onClick={() => navigate("/operations")}>
							Операции
						</NavItem>
						<NavItem onClick={() => navigate("/accounts")}>
							Счета
						</NavItem>
					</div>
					<NavItem className="exit-block" onClick={onLogout}>
						Выход
					</NavItem>
				</nav>
			</div>
			<div className="footer-block">
				Финансовый трекер <br /> info@fintrack.ru
			</div>
			<div
				className="profile-link-block"
				onClick={() => navigate("/profile")}
			>
				<Img src={photoUrl || null} alt="Аватар" />
			</div>
		</div>
	);
};

export const Navbar = styled(NavbarContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 250px;
	height: 100vh;
	margin-right: 20px;
	background-color: #2a2d3e;

	& .main-block {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	& nav {
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
		margin-top: 10px;
		align-items: center;
	}

	& .footer-block {
		margin: 0px auto 30px;
	}

	& .profile-link-block {
		position: absolute;
		top: 10px;
		right: 35px;
		height: 50px;
		width: 50px;
		border-radius: 50%;
		background-color: #ffffff;
		cursor: pointer;
	}
`;
