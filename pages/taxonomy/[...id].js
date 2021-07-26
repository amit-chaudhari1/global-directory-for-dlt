import { useRouter } from "next/router";
import Styles from "../../styles/markdown.module.css";
import { useEffect, useState, getContent } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ReactMarkdown from "react-markdown";
import ReactMarkdownComponents from "../../lib/ReactMarkdownComponents";
import Link from "next/link";

const Comment = () => {
	const router = useRouter();
	if (router.query.id) {
		let slug = router.query.id.join("/");
	} else {
		let slug = "";
	}
	const [content, setContent] = useState({});
	useEffect(() => {
		getContent();
	}, []);
	async function getContent() {
		var data = await fetch(`/api/${slug}`);
		setContent(await data.json());
	}
	return (
		<div className={Styles.layout}>
			<Link href="/taxonomy">
				<a className={Styles.back}>
					<ArrowBackIcon /> Back to List
				</a>
			</Link>

			<ReactMarkdown
				// children={content.data}
				components={ReactMarkdownComponents(content.data)}
			>
				{content.data}
			</ReactMarkdown>
		</div>
	);
};

export default Comment;
