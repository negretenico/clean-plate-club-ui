import ReactMarkdown from 'react-markdown';
import React from 'react';
interface MarkdownComponenetProps {
  md: string
}

function MarkdownComponenet ({ md }: MarkdownComponenetProps): JSX.Element {
  return (
    <>
      <ReactMarkdown >
        {md}
      </ReactMarkdown>
    </>
  );
}
export default MarkdownComponenet;
