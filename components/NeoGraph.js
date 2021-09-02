import React, { useEffect, useRef } from "react";
// import useResizeAware from "react-resize-aware";
import Neovis from "neovis.js";

const NeoGraph = (props) => {
	const {
		width,
		height,
		containerId,
		backgroundColor,
		neo4jUri,
		neo4jUser,
		neo4jPassword,
	} = props;

	const visRef = useRef();

	useEffect(() => {
		const config = {
			container_id: visRef.current.id,
			server_url: neo4jUri,
			server_user: neo4jUser,
			server_password: neo4jPassword,
			labels: {
				// this object is specific to the KG.
				node: {
					caption: "name",
					size: "name",
					community: "community",

					title_properties: ["name", "description"],
					// sizeCypher: "test",
					// image: "./test.jpeg",
				},
			},
			relationships: {
				// this object is specific to the KG.
				relatedTo: {
					thickness: "a",
					caption: true,
				},
			},
			// encrypted?: "ENCRYPTION_OFF" | "ENCRYPTION_ON",
			// trust?: "TRUST_ALL_CERTIFICATES" | "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES",
			// hierarchical: true,
			// arrows: true,
			// heirarchical_sort_method: "directed",
			// console_debug: true,
			initial_cypher: "MATCH (p)-[r]->(s) RETURN *",
		};
		const vis = new Neovis(config);
		console.log(vis);
		vis.render();
	}, [neo4jUri, neo4jUser, neo4jPassword]);

	return (
		<div
			id={containerId}
			ref={visRef}
			style={{
				width: `${width}vw`,
				height: `${height}vh`,
				backgroundColor: `${backgroundColor}`,
			}}
		/>
	);
};

export default NeoGraph;

// TODO: DIY the responsiveness listener and make sure that the
// diy react6 resize aware
