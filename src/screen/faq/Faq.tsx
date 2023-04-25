import useMd from '../../hooks/useMd';
import MarkdownComponenet from '../../components/shared/MarkdownComponent';
import faq from './faq.md';
import React from 'react';

function Faq (): JSX.Element {
  const { content } = useMd(faq);
  return (
    <>
      <MarkdownComponenet md={content.md} />
    </>
  );
}
export default Faq;
