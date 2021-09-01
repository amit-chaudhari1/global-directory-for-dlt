import dynamic from "next/dynamic";

const NeoGraph = dynamic(() => import("../../components/NeoGraph"), {
	ssr: false,
});

function ResponsiveNeoGraph() {
	// const [resizeListener, sizes] = useResizeAware();

	//FIXME: The whole component is broken because i cannot send the credentials to the client. and process.env
	// research on how to fix this.
	// create this as an api call and that api call returns a viz obj?

	// const neo4jUri = process.env.SERVER_URL;
	// const neo4jUser = process.env.SERVER_USER;
	// const neo4jPassword = process.env.SERVER_PASSWORD;

	// const side = Math.max(sizes.width, sizes.height) / 2;

	const neoGraphProps = {
		containerId: "viz",
		backgroundColor: "#FFFFFF",
		//TODO: Use environment variables
		// neo4jUri: neo4jUri,
		// neo4jUser: neo4jUser,
		// neo4jPassword: neo4jPassword,
		neo4jUri: "bolt://localhost:7687",
		neo4jUser: "neo4j",
		neo4jPassword: "abc",
		width: 100,
		height: 100,
	};

	// console.log(neo4jPassword);

	return (
		<div style={{ position: "relative" }}>
			<NeoGraph {...neoGraphProps} />
		</div>
	);
}

export default ResponsiveNeoGraph;
