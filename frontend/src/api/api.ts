import axios from 'axios'


export const myAxios = axios.create({
    baseURL: '/',
})

export interface Position{
     lat: number;
     lng: number;
}

interface BusInfo{
    position: Position;
    estimated_time: number;
}

interface BusStopInfo {
    postition: Position;
    name: string;
}

export interface BusesInfo{
    bus_stop: BusStopInfo;
    buses: BusInfo[];
}
export const getBusesInfo = ()=>{
    return myAxios.get<BusesInfo>('/data');
}
