import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend
);

export const Chart = ({
	type = "line",
	datasets = [],
	labels = [],
	title = "",
	colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4C84FF", "#9966FF"],
	darkMode = false,
	valueType = "absolute",
	showLegend = true,
}) => {
	const textColor = darkMode ? "#FFFFFF" : "#666666";
	const gridColor = darkMode
		? "rgba(255, 255, 255, 0.1)"
		: "rgba(0, 0, 0, 0.1)";

	console.log(datasets);

	const commonOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: showLegend,
				position: type === "pie" ? "right" : "top",
				labels: {
					color: textColor,
					boxWidth: 12,
					padding: 20,
					font: {
						size: 12,
					},
				},
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						if (valueType === "percent") {
							return `${context.label}: ${
								context.raw > 0 ? "+" : ""
							}${context.raw}%`;
						}
						return `${
							context.label
						}: ${context.raw.toLocaleString()} ₽`;
					},
				},
			},
		},
		...(type === "pie" && {
			scales: {},
		}),
		...(type !== "pie" && {
			scales: {
				y: {
					beginAtZero: valueType !== "percent",
					ticks: {
						color: textColor,
						callback: (value) => {
							if (valueType === "percent") {
								return `${value > 0 ? "+" : ""}${value}%`;
							}
							return `${value.toLocaleString()} ₽`;
						},
					},
					grid: { color: gridColor },
				},
				x: {
					ticks: { color: textColor },
				},
			},
		}),
	};

	const chartData = {
		labels,
		datasets: datasets.map((dataset, i) => ({
			...dataset,
			backgroundColor:
				type === "pie"
					? colors.slice(0, dataset.data.length)
					: [colors[i % colors.length]],
			borderColor:
				type === "pie"
					? colors.slice(0, dataset.data.length).map((c) => `${c}CC`)
					: [`${colors[i % colors.length]}CC`],
			borderWidth: 1,
		})),
	};

	const renderChart = () => {
		switch (type) {
			case "line":
				return (
					<Line
						data={chartData}
						options={{
							...commonOptions,
							scales: {
								y: {
									beginAtZero: false,
									ticks: { color: textColor },
									grid: { color: gridColor },
								},
								x: {
									ticks: { color: textColor },
									grid: { color: gridColor },
								},
							},
						}}
					/>
				);
			case "bar":
				return (
					<Bar
						data={chartData}
						options={{
							...commonOptions,
							scales: {
								y: {
									beginAtZero: true,
									ticks: {
										color: textColor,
									},
									grid: { color: gridColor },
								},
								x: {
									ticks: { color: textColor },
									grid: { color: "transparent" },
								},
							},
						}}
					/>
				);
			case "pie":
				return <Pie data={chartData} options={commonOptions} />;
			default:
				return null;
		}
	};

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				minHeight: "250px",
			}}
		>
			{renderChart()}
		</div>
	);
};
