import type { PageServerLoad } from './$types';
import { orGuages } from '$lib/helpers/gauges/OR';

const popularSites = "14064500,14092500,14046500,14046000,14159000,14361500,14361500";

const popularSites2 = "14046000,14046500,14361500,14092500,13333000,14377100"

export const load = (async () => {
    // const getNowStreamData = async () => {
    //     const res = await fetch("https://waterservices.usgs.gov/nwis/iv/?sites=" + popularSites + "&parameterCd=00060&siteStatus=all&format=json")
    //     const data = await res.json()
    //     return data.value
    // }
    // const getSevenDayStreamData = async () => {
    //     const res = await fetch("https://waterservices.usgs.gov/nwis/iv/?sites=14046500&parameterCd=00060&period=P7D&siteStatus=all&format=json")
    //     const data = await res.json();
    //     const data2 = data.value;
    //     const formattedData = data2.timeSeries[0].values[0].value;

    //     return formattedData
    // } 
    const getChartData = async () => {
        const res = await fetch("https://waterservices.usgs.gov/nwis/iv/?sites=" + popularSites2 + "&parameterCd=00060&period=P7D&siteStatus=all&format=json")
        const data = await res.json();
        return data.value.timeSeries;
        // const data2 = data.value;
        // const formattedData = data2.timeSeries[0].values[0].value;

        // return formattedData
    } 
    return {
        // streamflow: getNowStreamData(),
        // formattedData: getSevenDayStreamData(),
        chartdata: getChartData(),
    };
}) satisfies PageServerLoad;