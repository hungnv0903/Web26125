import { IResponseAllFlight } from "../types/flightModel";
import { IPostFlightData } from "../types/searchModel";
import request from "./config";


const getFlightsApi = {
    search:async(data:IPostFlightData):Promise<IResponseAllFlight>=>{
        try {
            const responseAllFlight:IResponseAllFlight = await request.post("/flight/search",data);
            return responseAllFlight ; 
        }catch(error:unknown){
            console.error("Error fetching flight data:", error);
            throw error ; 
        }
    }
}

export default getFlightsApi;