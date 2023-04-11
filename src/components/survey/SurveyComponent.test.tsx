import { render,screen } from "@testing-library/react";
import SurveyComponent from "./SurveyComponent";

describe('Tests the survey component',()=>{
    it('Shows `Are you male or female`',()=>{
        render(<SurveyComponent />);
        expect(screen.getByText(/male or female/)).toBeInTheDocument();
    });
});