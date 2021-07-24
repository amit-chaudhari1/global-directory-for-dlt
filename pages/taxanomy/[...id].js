import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    console.log(slug);
    var data = await fetch(`http://localhost:3000/api/${slug}`);
    setContent(await data.json());
  }
  return (
    <div>
      {console.log(content)}
      <ReactMarkdown
        children={content.data}
        components={ReactMarkdownComponents(content.data)}
      ></ReactMarkdown>
    </div>
  );
};

export default Comment;
