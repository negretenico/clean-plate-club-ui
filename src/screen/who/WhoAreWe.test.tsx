import { render, screen, cleanup, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { type ReactElement, type JSXElementConstructor, type ReactFragment, type ReactPortal } from 'react';
import WhoAreWe from './WhoAreWe';
import React from 'react';
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

describe('Shows the Menu page', () => {
  it('Renders', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ text: 'Do you deliver?' }));
    const { container } = render(<WhoAreWe/>);
    expect(container).not.toBeEmptyDOMElement();
  });
});
