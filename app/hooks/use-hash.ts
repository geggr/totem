import {useEffect, useState} from "react";

export const useHash = (initial = "") => {
    const [ hash, setHash ] = useState(
        (window.location.hash !== "")
            ? window.location.hash.substring(1)
            : initial
    )

    useEffect(() => {
        const handleHashChange = () => setHash(window.location.hash.substring(1))

        window.addEventListener("hashchange", handleHashChange)

        return () => window.removeEventListener("hashchange", handleHashChange)
    }, []);

    return [ hash ]
}