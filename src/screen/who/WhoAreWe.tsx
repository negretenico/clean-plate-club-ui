import useMd from "../../hooks/useMd";
import MarkdownComponenet from "../../components/shared/MarkdownComponent";
import who from './who.md'
function WhoAreWe(){
    const {content} = useMd(who);
    return(
        <>
            <MarkdownComponenet md={content.md} />
        </>
    );
}
export default WhoAreWe;