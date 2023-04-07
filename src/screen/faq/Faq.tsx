import useMd from "../../hooks/useMd";
import MarkdownComponenet from "../../components/shared/MarkdownComponent";
import faq from "./faq.md"
function Faq(){
    const {content} = useMd(faq);
    return(
        <>
            <MarkdownComponenet md={content.md} />
        </>
    );
}
export default Faq;