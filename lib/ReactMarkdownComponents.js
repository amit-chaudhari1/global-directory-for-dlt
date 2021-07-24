export default function ReactMarkdownComponents() {
  return {
    // eslint-disable-next-line react/display-name
    p: ({ children }) => <p>{children}</p>,
    // eslint-disable-next-line react/display-name
    a: ({ children, href }) => (
      <a target="_blank" href={href} rel="noreferrer">
        {children}
      </a>
    ),
  };
}
