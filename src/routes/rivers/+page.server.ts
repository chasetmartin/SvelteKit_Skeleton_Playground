import type { PageServerLoad } from './$types';

export const load = (async () => {
    const getNowStreamData = async () => {
        const res = await fetch("https://waterservices.usgs.gov/nwis/iv/?sites=14046500&parameterCd=00060&siteStatus=all&format=json")
        const data = await res.json()
        return data.value
    } 
    return {
        streamflow: getNowStreamData(),
    };
}) satisfies PageServerLoad;