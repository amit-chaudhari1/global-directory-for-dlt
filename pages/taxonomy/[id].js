import { useRouter } from "next/router";
import Styles from "../../styles/markdown.module.css";
import { useEffect, useState } from "react";
import neoDriver from "neo4j-driver";
import {
	Text,
	Link,
	Tag,
	HStack,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Center,
	Heading,
	Stack,
} from "@chakra-ui/react";

//this page should recieve the id of the taxonomy as astatic prop
const DesciptionPageComponent = ({ id, parentResult, childrenResult }) => {
	const [parent, setParent] = useState(JSON.parse(parentResult));
	const parsedChildren = new Array();
	childrenResult.forEach((child) => {
		parsedChildren.push(JSON.parse(child));
	});
	const [children, setChildren] = useState(parsedChildren);

	//TODO: BRUH That's a long ass component. Split it up.
	return (
		<Center m="auto">
			<Stack spacing="24px">
				<Accordion defaultIndex={[0]}>
					<AccordionItem w="60vw" minW="300px">
						<h1>
							<AccordionButton>
								<Box flex="1" textAlign="left">
									<Heading as="h1" size="4xl">
										{parent.name}
									</Heading>
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h1>
						<AccordionPanel pb={4}>
							<Text>
								Description:{" "}
								{parent.description
									? parent.description
									: "No description"}
								{"\n"}
							</Text>
							<Text>
								Curated By:{" "}
								{parent.curatedBy
									? parent.curatedBy
									: "No curator"}
								{"\n"}
							</Text>
							<Text>
								Date Created:{" "}
								{parent?.dateCreated &&
									parent.dateCreated.year.low}{" "}
								-{" "}
								{parent?.dateCreated &&
									parent.dateCreated.month.low}{" "}
								-{" "}
								{parent?.dateCreated &&
									parent.dateCreated.day.low}
								{"\n"}
							</Text>
							<Text>
								Useful Links:{" "}
								{parent.links
									? parent.links.map((link) => {
											return (
												<Text>
													{" "}
													<Link href={link}>
														{link}
													</Link>
													<br />
												</Text>
											);
									  })
									: "No links"}
							</Text>
							<HStack p="6px">
								<Text>Tags: </Text>
								{parent.tags?.map((tag) => {
									return <Tag size="md">{tag}</Tag>;
								})}
							</HStack>

							<Accordion allowToggle allowMultiple>
								{children.map((child) => {
									return (
										<AccordionItem key={child.id}>
											<h2>
												<AccordionButton>
													<Box
														flex="1"
														textAlign="left"
													>
														<Heading
															as="h3"
															size="1xl"
														>
															{
																child.properties
																	.name
															}
														</Heading>
													</Box>
													<AccordionIcon />
												</AccordionButton>
											</h2>
											<AccordionPanel pb={4}>
												<Text>
													Description:{" "}
													{child.properties
														.description
														? child.properties
																.description
														: "No description"}
													{"\n"}
												</Text>
												<Text>
													Curated By:{" "}
													{child.properties.curatedBy
														? child.properties
																.curatedBy
														: "No curator"}
													{"\n"}
												</Text>
												<Text>
													Date Created:{" "}
													{child.properties
														.dateCreated?.year.low
														? child.properties
																.dateCreated
																.year.low
														: "ErrorDate"}{" "}
													-{" "}
													{child.properties
														.dateCreated?.month.low
														? child.properties
																.dateCreated
																.month.low
														: ""}{" "}
													-{" "}
													{child.properties
														.dateCreated?.day.low
														? child.properties
																.dateCreated.day
																.low
														: ""}
													{"\n"}
												</Text>
												<Text>
													Useful Links:{" "}
													{child.properties.links
														? child.properties.links.map(
																(link) => {
																	return (
																		<Text>
																			{" "}
																			<Link
																				href={
																					link
																				}
																			>
																				{
																					link
																				}
																			</Link>
																			<br />
																		</Text>
																	);
																}
														  )
														: "No links"}
												</Text>
												<HStack p="6px">
													child.properties.tags ?{" "}
													<Text>Tags: </Text>
													{child.properties.tags?.map(
														(tag) => {
															return (
																<Tag>{tag}</Tag>
															);
														}
													)}{" "}
													: <Text>No tags</Text>
												</HStack>
											</AccordionPanel>
										</AccordionItem>
									);
								})}
							</Accordion>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>{" "}
			</Stack>
		</Center>
	);
};

export async function getServerSideProps(context) {
	let id = context.query.id;
	let parentQueryResult;
	let childrenQueryResult = new Array();

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
		.run(`Match (n)-[r]->(s) where id(n) = ${id} return n,s`) // change this query in order to get what you want
		.then((result) => {
			parentQueryResult = JSON.stringify(
				result.records[0].toObject().n.properties
			);
			result.records.forEach((record) => {
				// console.log(
				// 	JSON.stringify(record.toObject().n.properties.name)
				// );
				// parentQueryResult.push(
				// 	JSON.stringify(record.toObject().n.properties)
				// );

				childrenQueryResult.push(JSON.stringify(record.toObject().s));
			});
		})
		.catch((error) => {
			console.log(error);
		})
		.then(() => session.close());

	// console.log(parentQueryResult);
	return {
		props: {
			id: context.query.id,
			parentResult: parentQueryResult,
			childrenResult: childrenQueryResult,
		},
	};
}

export default DesciptionPageComponent;
