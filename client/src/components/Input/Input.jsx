import styles from "./input.module.css";

export const Input = ({
	name,
	type,
	label,
	as = "input",
	options = [],
	...props
}) => {
	return (
		<div className={styles.container}>
			<label htmlFor={name}>{label}</label>
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
