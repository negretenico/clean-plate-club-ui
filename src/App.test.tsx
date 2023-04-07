import { render, screen } from '@testing-library/react';
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from "react";
import fetchMock from 'jest-fetch-mock';

import App from './App';
jest.mock('./components/shared/MarkdownComponent', () => {
  return function MockMarkdownComponent(props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
    return <div>Fresh ingredients</div>;
  };
});
beforeAll(() => {
  fetchMock.enableMocks();
});

afterAll(() => {
  fetchMock.disableMocks();
});
test('renders learn react link', () => {
  fetchMock.mockResponseOnce(JSON.stringify({ text: 'Do you deliver?' }));
  const {container}=render(<App />);
  expect(container).not.toBeEmptyDOMElement();
});
