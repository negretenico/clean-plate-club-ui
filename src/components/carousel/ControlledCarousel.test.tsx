import { render,screen } from "@testing-library/react";
import ControlledCarousel from "./ControlledCarousel"

describe('Tests that the Carousel renders', () => { 
    it('Should have the first image',()=>{
        render(<ControlledCarousel />);
        expect(screen.getByTestId(/img1/)).toBeInTheDocument();
    })
 })