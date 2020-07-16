import queryString from 'query-string';    
import { useLocation } from "react-router-dom";
import { useState } from 'react';

export const useQrStrLocation = () => {

    //const location = useLocation();

    const [query, setQuery] = useState('');

    const handleQrStrLocationChange = (location) => {

        const { search } = location;
        console.log(`useQrStrLocation.handleQtStrLocationChange->location: "${location}"`);
        //console.log(history);
        console.log(`useQrStrLocation.handleQtStrLocationChange->search: "${search}"`);
        // console.log(`useQrStrLocation->queryString: "${queryString.parse(search)}"`);

        const { q } = queryString.parse(search);
        console.log(`useQrStrLocation.handleQtStrLocationChange->q: ${q}`);
        setQuery(q);
    };

    return [query, handleQrStrLocationChange];
}
