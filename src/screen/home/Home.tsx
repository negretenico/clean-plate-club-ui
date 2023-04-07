import ControlledCarousel from "../../components/carousel/ControlledCarousel";
import MarkdownComponenet from "../../components/shared/MarkdownComponent";
import useMd from "../../hooks/useMd";
import home from './home.md'
function Home(){
    const {content} = useMd(home);
    return(
        <>
            <h1>You select, we perfect, you heat, bon appetit</h1>
            <br/>
            <MarkdownComponenet md={content.md}/>
            <br/>
            <h4>Testimonials</h4>
            <ControlledCarousel/>
        </>
    )
}
export default Home;