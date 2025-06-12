import React from 'react'

const BaggageItem = () => {
  return (
    <div className='w-1/2 sm:w-1/3 p-2 sm:p-3'>
      <div className='rounded-xl p-4 shadow-md hover:border-2 hover:border-green-400 '>
          <div className='w-10 mx-auto'>
              <img className='w-full' src="src\assets\icon\baggage-item.png" alt="baggage-item" />
          </div>
          <div className='font-semibold text-center mt-3'>Gói 20kg</div>
          <div className='font-bold text-base flex items-center justify-center gap-2'>
              <div className='text-orange-400'>200.000</div>
              <div className='text-blue-400'>VND</div>
          </div>
      </div>
    </div>
  )
}

export default BaggageItem