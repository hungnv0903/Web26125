import { Collapse } from 'antd'
import React from 'react'

const FareDetails = () => {
  return (
    <div className='box-price-detail mt-3 px-4 py-3'>
          <Collapse
              style={{ border: "none", boxShadow: "none" }}
              size="large"
              expandIconPosition="end"
              items={[{ 
                  
                  label: (
                      <div className="flex items-center justify-between">
                  <div className="font-bold uppercase">SubTotal</div>
                  <div className="font-semibold flex items-center gap-1 text-base">
                      <p className='text-orange-400 font-bold'>1.000.000</p>
                      <p className='text-blue-400 font-bold'>VND</p>
                  </div>
                  </div>
              ),
              children: <p>Detail Price</p>, 
              }]}
              />
    </div>
  )
}

export default FareDetails