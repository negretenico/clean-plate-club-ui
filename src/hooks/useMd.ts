/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from 'react';
function useMd (filePath: string): { content: { md: string } } {
  const [content, setContent] = useState({ md: '' });
  useEffect(() => {
    fetch(filePath)
      .then(async (res) => {
        console.log(res);
        return await res.text();
      })
      .then((md) => {
        setContent({ md });
      });
  }, [filePath]);
  return { content };
}
export default useMd;
