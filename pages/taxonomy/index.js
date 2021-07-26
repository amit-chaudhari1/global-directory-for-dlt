import { buildGraph } from "../../lib/resolvePaths";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { TreeItem } from "@material-ui/lab";
import Styles from "../../styles/taxonomy.module.css";
import Link from "next/link";

const getTreeItemsFromData = (treeItems) => {
	return treeItems.map((treeItemData) => {
		let children = undefined;
		if (treeItemData.children && treeItemData.children.length > 0) {
			children = getTreeItemsFromData(treeItemData.children);
			return (
				<TreeItem
					key={treeItemData.id}
					nodeId={treeItemData.id}
					label={treeItemData.name
						.slice(
							treeItemData.name.lastIndexOf(`${"\\"}`) + 1,
							treeItemData.name.length
						)
						.toUpperCase()}
					children={children}
				/>
			);
		} else {
			return (
				<Link href={`taxonomy/${treeItemData.name}`}>
					<TreeItem
						onClick={() => {}}
						key={treeItemData.id}
						nodeId={treeItemData.id}
						label={treeItemData.name.slice(
							treeItemData.name.lastIndexOf(`${"\\"}`) + 1,
							treeItemData.name.length
						)}
						children={children}
					/>
				</Link>
			);
		}
	});
};
const DataTreeView = (treeItems) => {
	return (
		<TreeView
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
		>
			{getTreeItemsFromData(treeItems.treeItems.children)}
		</TreeView>
	);
};

function taxonomy({ items }) {
	return (
		<div className={Styles.container}>
			<h1 className={Styles.title}>Taxonomy</h1>
			<main className={Styles.main}>
				<DataTreeView treeItems={items} />
			</main>
		</div>
	);
}

export async function getStaticProps() {
	const files = buildGraph("public/taxonomy");

	return {
		props: {
			items: files,
		},
	};
}
export default taxonomy;
