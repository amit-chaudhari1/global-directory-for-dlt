import TreeItem from "@material-ui/lab/TreeItem";

const SubTreeItem = ({ items }) => {
  if (items.children.length == 0) {
    return;
  } else {
    return (
      <TreeItem nodeId={items.index} label={items.name}>
        {items.children.forEach((i, index) => {
          console.log(i.children);
          return <SubTreeItem key={index} items={i.children}></SubTreeItem>;
        })}
      </TreeItem>
    );
  }
};
export default SubTreeItem;
