
import request from "./config";
import { ConfirmPriceQHA, IConfirmPrice, IResponseConfirmPice, IResponseConfirmPriceQHA } from "../types/flightConfirmModel";
import { IResponseFlight } from "@/types/flightModel";
import { IPostFlightData } from "@/types/searchModel";
import { IGetServiceFlight, IResponseAncillary, IResponseBaggage, IResponseSeatMap } from "@/types/serviceModel";


const getFlightsApi = {
    search:async(data:IPostFlightData):Promise<IResponseFlight>=>{
        try {
            const responseAllFlight:IResponseFlight = await request.post("/flight/search",data);
            return responseAllFlight ; 
        }catch(error:unknown){
            console.error("Error fetching flight data:", error);
            throw error ; 
        }
    },
    select:async(data:IConfirmPrice):Promise<IResponseConfirmPice>=>{
        try {
            const responseConfirmPrice:IResponseConfirmPice = await request.post("/flight/select",data) ; 
            return responseConfirmPrice ; 
        } catch (error:unknown) {
            console.error("Error fetching confirm price", error) ; 
            throw error ; 
        }
    },
    selectQHA:async(data:ConfirmPriceQHA):Promise<IResponseConfirmPriceQHA>=>{
        try{
            const responseConfirmPriceQHA:IResponseConfirmPriceQHA = await request.post('/addon/qha/select',data) ; 
            return responseConfirmPriceQHA ; 
        }
        catch(error:unknown){
            console.error("Error fetching confirm price", error) ; 
            throw error ; 
        }
    },
    service:async(dataGetServiceFlight:IGetServiceFlight):Promise<IResponseBaggage | IResponseAncillary | IResponseSeatMap>=>{
        try {
            const {Action,DataGetService} = dataGetServiceFlight ; 
            const responseServiceFlight : IResponseBaggage | IResponseAncillary | IResponseSeatMap 
                = await request.post(`/flight/${Action}`,DataGetService) ; 
            return responseServiceFlight ; 
        } catch (error:unknown) {
            console.error("Error fetching service flight",error) ; 
            throw error ; 
        }
    }
}

export default getFlightsApi;