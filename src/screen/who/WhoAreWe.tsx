import useMd from '../../hooks/useMd';
import MarkdownComponenet from '../../components/shared/MarkdownComponent';
import who from './who.md';
import React from 'react';
function WhoAreWe (): JSX.Element {
  const { content } = useMd(who);
  return (
    <>
      <MarkdownComponenet md={content.md} />
    </>
  );
}
export default WhoAreWe;
