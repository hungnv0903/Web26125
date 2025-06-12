import React, { memo,useEffect,useMemo,useState } from 'react'

interface TimeFilterProp {
    ID:number ; 
    Label: string ; 
    Time:number[] ; 
}

interface SelectTimeFilterProp {
    TimeFilter:TimeFilterProp ; 
    Reset?:boolean;
    selectTimeFilter(id:number,event:string) : void ; 
}

const TimeFlightFilter = ({Reset,TimeFilter,selectTimeFilter}:SelectTimeFilterProp) => {
  const {ID,Label,Time} = TimeFilter ; 
  const [activeTimeFilter , setActiveTimeFilter] = useState<boolean>(false) ; 
  const resetTimeFlight = useMemo(()=>Reset,[Reset]) ; 
  useEffect(()=>{
    if(resetTimeFlight){
      setActiveTimeFilter(false) ; 
    }
  },[resetTimeFlight])

  const handleSelectTimeFilter = ()=>{
    if(!activeTimeFilter){
        selectTimeFilter(ID,'Select') ; 
    }else{
        selectTimeFilter(ID,'Remove') ; 
    }
    setActiveTimeFilter(!activeTimeFilter) ; 
  }
  return (
    <>
    <div onClick={handleSelectTimeFilter} className={`${activeTimeFilter ? "active-time-filter" :""} time-filter py-2 border border-gray-300 rounded-md transition-all duration-500 ease-in-out`}>
        <div className='text-gray-500'>{Label}</div>
        <div className='font-bold text-blue-400'>{String(Time[0]).padStart(2, '0')}:00 - {String(Time[1]).padStart(2,'0')}:00</div>
    </div>
    </>
  )
}

export default memo(TimeFlightFilter);