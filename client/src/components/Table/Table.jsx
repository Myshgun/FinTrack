import styled from "styled-components";

const TableContainer = ({ className, columns, data, renderRow }) => {
	return (
		<div className={className}>
			<table>
				<thead>
					<tr>
						{columns.map(({ header, key }) => (
							<th key={key}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((item, idx) =>
						renderRow ? (
							renderRow(item, idx)
						) : (
							<tr key={item.id || idx}>
								{columns.map(({ key }) => (
									<td key={key}>{item[key]}</td>
								))}
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	);
};

export const Table = styled(TableContainer)`
	overflow-x: auto;
	width: 100%;

	table {
		border-collapse: collapse;
		width: 100%;
		min-width: 400px;
		font-size: 16px;
		background-color: #1e213a;
		color: #f0f0f0;
		border-radius: 8px;
		overflow: hidden;

		thead {
			background-color: #2a2d3e;
		}

		th,
		td {
			padding: 12px 16px;
			text-align: left;
			border-bottom: 1px solid #44475a;
		}

		tbody tr:hover {
			background-color: #3b3e58;
		}
	}
`;
