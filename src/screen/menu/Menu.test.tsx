import { render ,screen,cleanup,act } from "@testing-library/react";
import fetchMock from 'jest-fetch-mock';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import Menu from "./Menu";
jest.mock('../../components/shared/MarkdownComponent', () => {
    return function MockMarkdownComponent(props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
      return <div>{props.children}</div>;
    };
  });

beforeAll(() => {
  fetchMock.enableMocks();
});

afterAll(() => {
  fetchMock.disableMocks();
});

describe("Shows the Menu page",()=>{
    it("Renders",()=>{
        fetchMock.mockResponseOnce(JSON.stringify({ text: 'Do you deliver?' }));
        const { container } = render(<Menu/>);
        expect(container).not.toBeEmptyDOMElement();
    }); 
});