import { Slider } from 'antd'
import React, { memo, useEffect, useMemo, useState } from 'react'

type RangeSliderProp  = {
    minValue:number,
    maxValue:number,
    tooltipFormatter?: (value?: number) => React.ReactNode;
    Reset?:boolean ; 
    handleChangeRangeSlider(val:[number,number]):void ; 
}



const RangeSlider = ({minValue , maxValue ,tooltipFormatter,Reset, handleChangeRangeSlider}:RangeSliderProp) => {
    const [rangeValueSlider , setRangeValueSlider] = useState<[number,number]>([minValue,maxValue]) ; 
    const resetSlider = useMemo(()=>Reset,[Reset]) ; 
    
    useEffect(()=>{
      if(resetSlider){
        setRangeValueSlider([minValue,maxValue]) ; 
      }
    },[minValue,maxValue,resetSlider])
  return (
    <Slider 
    className='w-full'  
    range 
    onChange={(val) => setRangeValueSlider(val as [number, number])}
    onChangeComplete={(val)=>handleChangeRangeSlider(val as [number,number])}
    value={rangeValueSlider}
    min={minValue} 
    max={maxValue}
    tooltip={{formatter:tooltipFormatter}}
    />
  )
}

export default memo(RangeSlider)