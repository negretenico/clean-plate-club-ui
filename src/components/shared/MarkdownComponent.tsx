import ReactMarkdown from 'react-markdown'

type MarkdownComponenetProps={
    md:string
}

function MarkdownComponenet({md}:MarkdownComponenetProps){
    return(
        <>
            <ReactMarkdown  >
                {md}
            </ReactMarkdown>
        </>
    );
}
export default MarkdownComponenet;