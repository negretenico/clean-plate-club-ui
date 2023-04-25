import { Button } from 'react-bootstrap';
import ControlledCarousel from '../../components/carousel/ControlledCarousel';
import MarkdownComponenet from '../../components/shared/MarkdownComponent';
import useMd from '../../hooks/useMd';
import home from './home.md';
import React from 'react';

function Home (): JSX.Element {
  const { content } = useMd(home);
  return (
    <>
      <h1>You select, we perfect, you heat, bon appetit</h1>
      <br/>
      <div>
        <a href={'/survey'}>Take the survey</a>
      </div>
      <br/>
      <MarkdownComponenet md={content.md}/>
      <br/>
      <h4>Testimonials</h4>
      <ControlledCarousel/>
    </>
  );
}
export default Home;
