import { useEffect, useState } from "react";
function useMd(filePath:string):{content:{md:string}}{
    const [ content, setContent] = useState({md: ""});
    useEffect(()=> {
        fetch(filePath)
            .then((res) => {
                console.log(res)
                return res.text()
            })
            .then((md) => {
                setContent({ md })
            })
    }, [filePath])
    return {content};
}
export default useMd;