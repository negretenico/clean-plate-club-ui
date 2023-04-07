import MarkdownComponenet from "./MarkdownComponent";
import { render } from "@testing-library/react";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
jest.mock('react-markdown', () => {
    return function MockMarkdownComponent(props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
      return <div>{props.children}</div>;
    };
  });
describe("Creates  a Markdown component",()=>{

    it("Should render",()=>{
        const { container } = render(<MarkdownComponenet md={"foo"}/>);
        expect(container).not.toBeEmptyDOMElement();
    })
})