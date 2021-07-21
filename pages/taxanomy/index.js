import { buildGraph } from "../../lib/resolvePaths";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SubTreeItem from "../../components/subTreeItem";
import Hello from "../../components/hello";
import { TreeItem } from "@material-ui/lab";

const taxonomy = ({ items }) => {
  return (
    <main>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="0" label={items.name}>
          {console.log(items)}
          <SubTreeItem items={items.children} />
        </TreeItem>
      </TreeView>
      <Hello />
    </main>
  );
};
export async function getStaticProps() {
  const files = buildGraph("public/taxanomy");

  return {
    props: {
      items: files,
    },
  };
}
export default taxonomy;
