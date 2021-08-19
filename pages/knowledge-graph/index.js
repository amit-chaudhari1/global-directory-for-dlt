import dynamic from "next/dynamic";

const NeoGraph = dynamic(() => import("../../components/NeoGraph"), {
	ssr: false,
});

function ResponsiveNeoGraph() {
	// const [resizeListener, sizes] = useResizeAware();

	// const side = Math.max(sizes.width, sizes.height) / 2;
	const neoGraphProps = {
		containerId: "viz",
		backgroundColor: "#FFFFFF",
		neo4jUri: "bolt://localhost:7687",
		neo4jUser: "neo4j",
		neo4jPassword: "abc",
		width: 300,
		height: 600,
	};
	return (
		<div style={{ position: "relative" }}>
			<NeoGraph {...neoGraphProps} />
		</div>
	);
}

export default ResponsiveNeoGraph;
