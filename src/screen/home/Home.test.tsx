import { render,screen } from "@testing-library/react";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from "react";
import Home from "./Home";
import fetchMock from 'jest-fetch-mock';
jest.mock('../../components/shared/MarkdownComponent', () => {
    return function MockMarkdownComponent(props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
      return <div>Fresh ingredients</div>;
    };
  });
describe('Tests the `Home` Page',()=>{
    beforeAll(() => {
        fetchMock.enableMocks();
      });
      
      afterAll(() => {
        fetchMock.disableMocks();
      });
    beforeEach(()=>{
        fetchMock.mockResponseOnce(JSON.stringify({ text: 'Do you deliver?' }));

    })
    it('Should have the mantra on it',()=>{
        render(<Home/>);
        expect(screen.getByText(/You select/)).toBeInTheDocument();
    });
    it('Should have the testimonial',()=>{
        render(<Home/>);
        expect(screen.getByTestId("img1")).toBeInTheDocument();
    });
    it('Should have the list',()=>{
        render(<Home/>);
        expect(screen.getByText(/Fresh ingredients/)).toBeInTheDocument();
    })
});