import { useRouter } from "next/router";
import Styles from "../../styles/markdown.module.css";
import { useEffect, useState } from "react";
import neoDriver from "neo4j-driver";
import Particles from "react-particles-js";
import {
	Text,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Link,
	Center,
	Heading,
	Stack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function NestedAccordion({ node }) {
	const haschild = node.relatedto?.length > 0;
	if (node._id.low == 0) {
		return (
			<Accordion defaultIndex={[0]} allowMultiple>
				<AccordionItem w="60vw" minW="300px">
					<AccordionButton>
						<Box>
							<Heading size="md" mb={2}>
								{node.name}
							</Heading>
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel>
						<Text>
							{node.description
								? node.description
								: "No description"}
						</Text>

						<Link href={"taxonomy/" + node._id.low} isExternal>
							More about {node.name}
							<ExternalLinkIcon mx="2px" />
						</Link>

						<Stack spacing={4}>
							{node.relatedto?.map((child) => (
								<NestedAccordion node={child} />
							))}
						</Stack>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		);
	} else {
		return (
			<Accordion allowMultiple allowToggle>
				<AccordionItem w="60vw" minW="300px">
					<AccordionButton>
						<Box>
							<Heading size="md" mb={2}>
								{node.name}
							</Heading>
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel>
						<Text>
							{node.description
								? node.description
								: "No description"}
						</Text>

						<Link href={"taxonomy/" + node._id.low} isExternal>
							More about {node.name}
							<ExternalLinkIcon mx="2px" />
						</Link>

						<Stack spacing={4}>
							{node.relatedto?.map((child) => (
								<NestedAccordion node={child} />
							))}
						</Stack>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		);
	}
}

//this page should recieve the id of the taxonomy as astatic prop
const DesciptionPageComponent = ({ resultInStr }) => {
	// Below code is for the case where you have more than one Parent node starting out.
	// let result = new Array();
	// resultInStr.forEach((child) => {
	// 	result.push(JSON.parse(child));
	// });
	// const [res, setRes] = useState(result);
	let arr = new Array();
	// resultInStr.forEach((child) => {
	arr.push(JSON.parse(resultInStr));
	// });
	const [res, setRes] = useState(arr);
	//TODO: BRUH That's a long ass component. Split it up.
	return (
		<>
			<Particles
				params={{
					backgroundMode: {
						enable: true,
						zIndex: -1,
					},
					particles: {
						number: {
							value: 100,
							opacity: 0.5,
							density: {
								enable: true,
							},
						},
						line_linked: {
							enable: true,
							opacity: 0.2,
							color: "#000",
						},
						move: {
							direction: "right",
							speed: 0.05,
						},
						size: {
							value: 2,
						},
						color: {
							value: "#000",
						},
						opacity: {
							anim: {
								enable: true,
								speed: 1,
								opacity_min: 0.05,
							},
						},
					},
					interactivity: {
						events: {
							onclick: {
								enable: true,
								mode: "push",
							},
						},
						modes: {
							push: {
								particles_nb: 1,
							},
						},
					},
					retina_detect: true,
				}}
			/>
			<Center m="auto">
				<Stack spacing="24px">
					{res.map((node) => {
						return <NestedAccordion node={node} />;
					})}
				</Stack>
			</Center>
		</>
	);
};

export async function getServerSideProps(context) {
	let queryResult = new Array();

	const driver = neoDriver.driver(
		"bolt://localhost:7687",
		neoDriver.auth.basic("neo4j", "abc")
	);
	// TODO: are we using handling the session properly?
	const session = driver.session({
		defaultAccessMode: driver.session.READ,
	});

	// TODO: use environment variables.
	// TODO: Add error handling for out of bounds id.
	// TODO: Handle support for nodes who don't have children.
	const query = await session
		.run(
			`
		MATCH p=(n)-[r]->(m)
		WITH COLLECT(p) AS ps
		CALL apoc.convert.toTree(ps) yield value
		RETURN value;
		`
		) // change this query in order to get what you want
		.then((result) => {
			// TODO: we can just log the 0th record because we know there is only one
			// TODO: Investigate on why the below query returns 68 records. (no it is not due to duplicated nodes)
			// result.records.forEach((record) => {
			// 	queryResult.push(JSON.stringify(record.toObject().value));
			// });
			queryResult.push(
				JSON.stringify(result.records[0].toObject().value)
			);
		})
		.catch((error) => {
			console.log(error);
		})
		.then(() => session.close());

	// console.log(parentQueryResult);
	return {
		props: {
			resultInStr: queryResult,
		},
	};
}

export default DesciptionPageComponent;
