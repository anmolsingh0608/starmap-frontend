import { useEffect, useState } from "react";
import Loading from "react-fullscreen-loading";

const Loader = ({time}) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, time)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Loading loading={loading} background="#ffffffde" loaderColor="#3498db" />
}

export default Loader;