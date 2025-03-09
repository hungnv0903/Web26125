import React, { useEffect, useMemo, useState } from "react";
import { PassengerProp } from "../../../types/searchModel";

interface IPassenger {
  handlePassengerProp:(ps:PassengerProp)=>void ; 
}

const Passenger = ({handlePassengerProp}:IPassenger) => {
  const passengerArr = ["Adult", "Child", "Infant"];
  const [Adt, setAdt] = useState<number>(1);
  const [Chd, setChd] = useState<number>(0);
  const [Inf, setInf] = useState<number>(0);

  
  const passenger:PassengerProp = useMemo(()=>{
    return {"Adt":Adt,"Chd":Chd,"Inf":Inf}
  },[Adt,Chd,Inf]) ; 
 
  useEffect(()=>{
    handlePassengerProp(passenger) ; 
  },[passenger]) ;

  const handleIncrease = (type: string) => {
    if (type === "Adult" && Adt<9) setAdt(Adt + 1);
    if (type === "Child" && Chd<7) setChd(Chd + 1);
    if (type === "Infant" && Inf<2) setInf(Inf + 1);
  };

  const handleDecrease = (type: string) => {
    if (type === "Adult" && Adt > 1) setAdt(Adt - 1);
    if (type === "Child" && Chd > 0) setChd(Chd - 1);
    if (type === "Infant" && Inf > 0) setInf(Inf - 1);
  };

  return (
    <>
      <div className="w-60 sm:w-96 xl:w-64 cursor-pointer">
        {passengerArr.map((passenger) => (
          <div key={passenger} className="flex items-center justify-between my-4">
            <label htmlFor="adult" className="font-semibold text-base">
              {passenger}
            </label>
            <div className="w-1/2 flex justify-between items-center">
              <button
                onClick={() => handleDecrease(passenger)}
                className="bg-blue-500 rounded-full hover:bg-pink-500 w-6 h-6 text-sm flex justify-center items-center text-white"
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <span className="w-10 text-center border-b-2 text-lg border-b-gray-400">
                {passenger === "Adult" ? Adt : passenger === "Child" ? Chd : Inf}
              </span>
              <button
                onClick={() => handleIncrease(passenger)}
                className="bg-blue-500 rounded-full hover:bg-pink-500 w-6 h-6 text-sm flex justify-center items-center text-white"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(Passenger);
