import React, { memo, useMemo,} from 'react';
import ListAirport from '../../../api/jsondata/ListAirport.json';
import { removeVietnameseTones } from '../../../utils/master';
import { List } from 'antd';

interface IAirport {
  AirportCode: string;
  AirportName: string;
  CityCode: string;
  CityName: string;
  CountryCode: string;
  CountryName: string;
}

interface IPropSearchValue {
  searchValueProp: string;
  handleSelectAirportCode(code: string): void;
}

const airPortCodePopular = ['HAN', 'SGN', 'DAD', 'HUI', 'BKK', 'DMK', 'SIN', 'KUL', 'ICN', 'TPE'];
const convertAirport = (listAir: IAirport[]): IAirport[] => {
  const priorityMap: Record<string, number> = { HAN: 1, SGN: 2, DAD: 3 };
  return [...listAir].sort((a, b) => {
    const priorityA = priorityMap[a.AirportCode] || Infinity;
    const priorityB = priorityMap[b.AirportCode] || Infinity;
    return priorityA - priorityB;
  });
};

const ListMap = ({ searchValueProp, handleSelectAirportCode }: IPropSearchValue) => {

  const listAirportPopular = useMemo(() => ListAirport.filter(item => airPortCodePopular.includes(item.AirportCode)),[]);
  const filteredAirports = useMemo(() => {
    
    if (!searchValueProp.trim()) {
      return convertAirport(listAirportPopular);
    }
    const normalizedSearch = removeVietnameseTones(searchValueProp).toLowerCase();
    return ListAirport.filter((airport) =>
        Object.values(airport).some((value: string) =>
          removeVietnameseTones(value).toLowerCase().includes(normalizedSearch)
      )
    );
  },[searchValueProp, listAirportPopular]);
   
  const handleSelectPoint = (code:string)=>{
      handleSelectAirportCode(code) ; 
  }

  return (
    <div className="scroll-custom w-96 h-96 overflow-y-auto cursor-pointer">
      <List
        dataSource={filteredAirports}
        className="me-1"
        renderItem={(item) => (
          <List.Item
            className="hover:bg-gray-100"
            onClick={() => handleSelectPoint(item.AirportCode)}
          >
            <div className="flex items-center gap-2">
              <i className="me-2 fa-solid fa-plane"></i>
              <div>
                <div className="flex items-center justify-start">
                  <span className="me-3 font-bold text-base">{item.AirportName}</span>
                  <span className="font-semibold text-base text-gray-500">({item.AirportCode})</span>
                </div>
                <p className="text-sm text-gray-400">
                  {item.CityName}, {item.CountryName}
                </p>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default memo(ListMap);
