// import styled from "styled-components";
import styles from "./input.module.css";

export const Input = ({
	name,
	type,
	children,
	as = "input",
	options = [],
	...props
}) => {
	return (
		<div className={styles.container}>
			<label htmlFor={name}>{children}</label>
			{as === "select" ? (
				<select name={name} id={name} {...props}>
					<option value="" disabled>
						Выберите...
					</option>
					{options.map(({ value, label }) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</select>
			) : (
				<input type={type} name={name} id={name} {...props} />
			)}
		</div>
	);
};

// export const Input = styled(InputContainer).withConfig({
// 	shouldForwardProp: (prop) => !["as", "$options"].includes(prop),
// })`
// 	display: flex;
// 	flex-direction: column;

// 	& label {
// 		font-size: 0.9rem;
// 		margin-bottom: 0.5rem;
// 	}

// 	& input {
// 		font-size: 0.9rem;
// 		padding: 0.5rem;
// 		border-radius: 0.5rem;
// 		border: 1px solid #ccc;
// 	}

// 	& select {
// 		font-size: 0.9rem;
// 		padding: 0.5rem;
// 		border-radius: 0.5rem;
// 		border: 1px solid #ccc;
// 		background: white;
// 		appearance: auto;
// 	}
// `;
