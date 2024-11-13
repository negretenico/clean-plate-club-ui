import { render, screen, cleanup, act } from '@testing-library/react';
import Faq from './Faq';
import fetchMock from 'jest-fetch-mock';
import React from 'react';

import { type ReactElement, type JSXElementConstructor, type ReactFragment, type ReactPortal } from 'react';
jest.mock('../../components/shared/MarkdownComponent', () => {
  return function MockMarkdownComponent (props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined }) {
    return <div>{props.children}</div>;
  };
});

beforeAll(() => {
  fetchMock.enableMocks();
});

afterAll(() => {
  fetchMock.disableMocks();
});

describe('Shows the FAQ page', () => {
  it('Renders', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ text: 'Do you deliver?' }));
    const { container } = render(<Faq/>);
    expect(container).not.toBeEmptyDOMElement();
  });
});
