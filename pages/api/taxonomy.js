import neoDriver from "neo4j-driver";

export default async function taxonomyList(req, res) {
	// TODO: use environment variables.
	// TODO: pagination?
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

	await session
		.run(`Match (n) return (n)`) // change this query in order to get what you want
		.then((result) => {
			result.records.forEach((record) => {
				queryResult.push(record);
				// TODO: Filter the result properly, currently this will overfetch
			});
		})
		.catch((error) => {
			//TODO: Handle error
			console.log(error);
		})
		.then(() => session.close());
	const content = queryResult;
	res.json(queryResult);
}
