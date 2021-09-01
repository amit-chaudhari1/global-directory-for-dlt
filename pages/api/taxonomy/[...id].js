import neoDriver from "neo4j-driver";
import { isAssetError } from "next/dist/client/route-loader";

export default async function getNodeById(req, res) {
	const id = req.query.id;

	// TODO: use environment variables.
	const driver = neoDriver.driver(
		"bolt://localhost:7687",
		neoDriver.auth.basic("neo4j", "abc")
	);
	//create a session,
	// TODO: are we using handling the session properly?
	// open it use it then close it, remember session is expensive to create.
	const session = driver.session({
		defaultAccessMode: driver.session.READ,
	});
	let queryResult = new Array();

	let query = await session
		.run(`Match p=(n)-[r]->(s) where id(n) = 0 return p, n, r, s`) // change this query in order to get what you want
		.then((result) => {
			result.records.forEach((record) => {
				queryResult.push(record.get("p"));
			});
		})
		.catch((error) => {
			console.log(error);
		})
		.then(() => session.close());

	//return the current node props (excluding the style props) and the children to the first depth. (immediate Child)
	res.status(200).json(queryResult);
}
