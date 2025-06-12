import { IListFareData } from '@/types/flightModel';
import { Collapse } from 'antd'
import React, { memo } from 'react'


interface FareDetailProp {
   ListSelectFlight:IListFareData[] ;
   Adt:number ; 
   Chd:number ;
   Inf:number ; 

}
interface TotalPriceProp {
  TotalPriceAdt:number ; 
  TotalPriceChd:number ; 
  TotalPriceInf:number ; 
  TotalPrice:number ; 
}

const initialTotalPrice:TotalPriceProp = {
  TotalPriceAdt:0,
  TotalPriceChd:0,
  TotalPriceInf:0,
  TotalPrice:0,
}
const FareDetails = ({ListSelectFlight , Adt,Chd,Inf}:FareDetailProp) => {

  const totalPrice = ListSelectFlight.reduce((acc: TotalPriceProp, item) => {
    const newTotalPriceAdt = acc.TotalPriceAdt + item.PriceAdt* Adt;
    const newTotalPriceChd = acc.TotalPriceChd + item.PriceChd * Chd;
    const newTotalPriceInf = acc.TotalPriceInf + item.PriceInf * Inf;
    const newTotalPrice = newTotalPriceAdt + newTotalPriceChd + newTotalPriceInf;

    return {
      TotalPriceAdt: newTotalPriceAdt,
      TotalPriceChd: newTotalPriceChd,
      TotalPriceInf: newTotalPriceInf,
      TotalPrice: newTotalPrice,
    };
  }, initialTotalPrice);

  return (
    <div className='box-price-detail px-3 py-3'>
          <Collapse
              style={{ border: "none", boxShadow: "none" }}
              size="middle"
              expandIconPosition="end"
              items={[{ 
                  
                  label: (
                      <div className="flex items-center justify-between">
                  <div className="font-bold uppercase">SubTotal</div>
                  <div className="font-semibold flex items-center gap-1 text-base">
                      <p className='text-orange-400 font-bold'>{totalPrice.TotalPrice.toLocaleString('vi-VN')}</p>
                      <p className='text-blue-400 font-bold'>VND</p>
                  </div>
                  </div>
              ),
              children: <div>
                <div className='text-base flex items-center justify-between'>
                  <div className='w-1/3 flex justify-between items-center'>
                    <span><i className="me-2 fa-solid fa-person"></i>Adult</span>
                    <span>x {Adt}</span>
                  </div>
                  <div className='font-bold'><span className='text-orange-400'>{totalPrice.TotalPriceAdt.toLocaleString("vi-VN")}</span><span className='ms-2 text-blue-400'>VND</span></div>
                </div>
                {Chd!==0 && (
                    <div className='text-base flex items-center justify-between'>
                      <div className='w-1/3 flex justify-between items-center'>
                        <span><i className="me-2 fa-solid fa-child-dress"></i>Child</span>
                        <span>x {Chd}</span>
                      </div>
                      <div className='font-bold'><span className='text-orange-400'>{totalPrice.TotalPriceChd.toLocaleString("vi-VN")}</span><span className='ms-2 text-blue-400'>VND</span></div>
                    </div>
                )}
                {Inf!==0 && (
                    <div className='text-base flex items-center justify-between'>
                      <div className='w-1/3 flex justify-between items-center'>
                      <span><i className="me-2 fa-solid fa-baby text-sm"></i>Infant</span>
                      <span>x {Inf}</span>
                    </div>
                      <div className='font-bold'><span className='text-orange-400'>{totalPrice.TotalPriceInf.toLocaleString("vi-VN")}</span><span className='ms-2 text-blue-400'>VND</span></div>
                    </div>
                )}
                 <p className='text-sm text-start text-gray-400 mt-3'>The price includes taxes, fees, and VAT invoice.</p>
                </div>
              }]}
              />
    </div>
  )
}

export default memo(FareDetails) ; 