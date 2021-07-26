import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>GLobal Scouting for DLT</title>
				<meta
					name="description"
					content="We want to initiate a Decentralised Global Directory of DLT / Blockchain Educational Opportunities, that engages a Community to build and maintain it, and to develop a Tool Kit that supports this collaboration."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Global Scouting for Opportunites in
					<a href="https://wiki.hyperledger.org/display/LMDWG">
						{" "}
						Learning DLT
					</a>
				</h1>

				<p className={styles.description}>
					Get started by looking at our{" "}
					<a href="https://github.com/amitchaudhari9121/global-directory-for-dlt">
						Github Repo{" "}
					</a>
				</p>

				<div className={styles.grid}>
					<a
						href="https://wiki.hyperledger.org/display/LMDWG"
						className={styles.card}
					>
						<h2>Contribute and Learn &rarr;</h2>
						<p>Engage with the Community and Discover Resources.</p>
					</a>

					<a href="/taxonomy" className={styles.card}>
						<h2>Taxonomy &rarr;</h2>
						<p>Browse the Taxonomy for learning Resources !</p>
					</a>

					<a href="/KnowledgeGraph.png" className={styles.card}>
						<h2>Knowledge Graph &rarr;</h2>
						<p>Visually browse the knowledge graph.</p>
					</a>

					<a href="/Roadmaps" className={styles.card}>
						<h2>Developer Roadmaps &rarr;</h2>
						<p>Coming Soon! </p>
					</a>
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{" "}
					<span className={styles.logo}>
						<Image
							src="/vercel.svg"
							alt="Vercel Logo"
							width={72}
							height={16}
						/>
					</span>
				</a>
			</footer>
		</div>
	);
}
