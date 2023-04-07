import useMd from "../../hooks/useMd";
import MarkdownComponenet from "../../components/shared/MarkdownComponent";
import menu from './menu.md'
function Menu(){
    const {content} = useMd(menu);
    return(
        <>
            <MarkdownComponenet md={content.md} />
        </>
    );
}
export default Menu;