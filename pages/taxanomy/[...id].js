import { useRouter } from "next/router";
import Styles from "../../styles/markdown.module.css";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ReactMarkdown from "react-markdown";
import ReactMarkdownComponents from "../../lib/ReactMarkdownComponents";
const Comment = () => {
  const router = useRouter();
  let slug = router.query.id.join("/");
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
      <a className={Styles.back} href="/taxanomy">
        <ArrowBackIcon /> Back to List
      </a>

      <ReactMarkdown
        children={content.data}
        components={ReactMarkdownComponents(content.data)}
      ></ReactMarkdown>
    </div>
  );
};

export default Comment;
