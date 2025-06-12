import { handleAirlineFilter,
    handleArrivalTimeFilter,
    handleDepartureTimeFilter,
    handleDurationFilter,
    handlePricePassengerFilter,
    handleResetDataFilter,
    handleTransitFilter } from '@/redux/flights/filterFlightSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { AirlineInfo, optionTimeFlight, optionTransit } from '@/utils/helper';
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Collapse, GetProp } from 'antd';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TimeFlightFilter from './TimeFlightFilter';
import RangeSlider from '../ui/Slider/RangeSlider';




export interface TimeFlightFilterProp {
  ID: number;
  Event: string;
}

const Filter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ListAirline, Duration, PricePassenger } = useSelector(
    (state: RootState) => state.flights.dataCollectionFlightReducer
  );
  const isData = useSelector((state: RootState) => state.flights.searchFlightReducer.isData);

  const [departureTimeIds, setDepartureTimeIds] = useState<number[]>([]);
  const [arrivalTimeIds, setArrivalTimeIds] = useState<number[]>([]);
  const [activeKeysCollapse, setActiveKeysCollapse] = useState<string[]>([]);
  const [checkedAirline, setCheckedAirline] = useState<string[]>([]);
  const [checkedTransit, setCheckedTransit] = useState<number[]>([]);
  const [durationRange, setDurationRange] = useState<[number, number] | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);


  const durationMinHour = useMemo(() => (Duration ? Math.floor(Duration.DurationMin / 60) : 0), [Duration]);
  const durationMaxHour = useMemo(() => (Duration ? Math.ceil(Duration.DurationMax / 60) : 0), [Duration]);
 
  const pricePassengerMin = useMemo(() => PricePassenger.PricePassengerMin, [PricePassenger.PricePassengerMin]);
  const pricePassengerMax = useMemo(() => PricePassenger.PricePassengerMax, [PricePassenger.PricePassengerMax]);

  useEffect(() => {
    if (isData) {
      setActiveKeysCollapse(['1', '2', '3']);
    }
  }, [isData]);

 
  useEffect(() => {
    const listDepartureTime = departureTimeIds.map((id) =>
      optionTimeFlight.find((item) => item.ID === id)?.Time
    );
    dispatch(handleDepartureTimeFilter(listDepartureTime));
    
  }, [departureTimeIds, dispatch]);


  useEffect(() => {
    const listArrivalTime = arrivalTimeIds.map((id) =>
      optionTimeFlight.find((item) => item.ID === id)?.Time
    );

    dispatch(handleArrivalTimeFilter(listArrivalTime));
    
  }, [arrivalTimeIds, dispatch]);

  const onChangeTransit: GetProp<typeof Checkbox.Group, 'onChange'> = useCallback(
    (checkedValues) => {
      dispatch(handleTransitFilter(checkedValues));
      setCheckedTransit(checkedValues as number[]);
    },
    [dispatch]
  );

  const onChangeAirline: GetProp<typeof Checkbox.Group, 'onChange'> = useCallback(
    (airlines) => {
      const airlineList = airlines as string[];
      dispatch(handleAirlineFilter(airlineList));
      setCheckedAirline(airlineList);
    },
    [dispatch]
  );

  const handleDepartureTime = useCallback(
    (selectTime: TimeFlightFilterProp) => {
      if (selectTime.Event === 'Select') {
        setDepartureTimeIds((prev) => [...prev, selectTime.ID]);
      } else if (selectTime.Event === 'Remove') {
        setDepartureTimeIds((prev) => prev.filter((id) => id !== selectTime.ID));
      }
    },[]);

  const handleArrivalTime = useCallback(
    (selectTime: TimeFlightFilterProp) => {
      if (selectTime.Event === 'Select') {
        setArrivalTimeIds((prev) => [...prev, selectTime.ID]);
      } else if (selectTime.Event === 'Remove') {
        setArrivalTimeIds((prev) => prev.filter((id) => id !== selectTime.ID));
      }
    },[]);

  const handleDuration = useCallback(
    (value: [number, number]) => {
      setDurationRange(value);
      dispatch(handleDurationFilter(value));
    },
    [dispatch]
  );

  const handlePricePassenger = useCallback(
    (value: [number, number]) => {
      setPriceRange(value);
      dispatch(handlePricePassengerFilter(value));
    },
    [dispatch]
  );

  const formatTooltipPricePassenger = useCallback((value?: number): React.ReactNode => {
    if (value === undefined) return '';
    return `${value.toLocaleString('vi-VN')} VND`;
  }, []);

  const handleResetFilter = useCallback(() => {
    dispatch(handleResetDataFilter());
    setCheckedAirline([]);
    setCheckedTransit([]);
    setDepartureTimeIds([]);
    setArrivalTimeIds([]);
    setDurationRange(null);
    setPriceRange(null);
  }, [dispatch]);


  return (
    <Fragment>
      <div
        className="mt-3 p-1 max-h-[60vh] overflow-y-auto
                   [&::-webkit-scrollbar]:w-1.5
                   [&::-webkit-scrollbar-track]:rounded-full
                   [&::-webkit-scrollbar-track]:bg-gray-100
                   [&::-webkit-scrollbar-thumb]:rounded-full
                   [&::-webkit-scrollbar-thumb]:bg-gray-300
                   dark:[&::-webkit-scrollbar-track]:bg-white
                   dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300"
      >
        <div className="flex justify-between items-center mb-3">
          <div className="font-bold text-base">Filter</div>
          <Button onClick={handleResetFilter}>
            <ReloadOutlined />
          </Button>
        </div>
        <div className="collapse-filter flex flex-col gap-3">
          <Collapse
            style={{ border: 'none', boxShadow: 'none' }}
            ghost={true}
            size="small"
            expandIconPosition="end"
            activeKey={activeKeysCollapse}
            onChange={(keys) => setActiveKeysCollapse(Array.isArray(keys) ? keys : [keys])}
            items={[
              {
                key: '1',
                label: <p className="text-start text-base">No. of Transit</p>,
                children: (
                  <Checkbox.Group
                    className="flex flex-col w-full gap-3 font-semibold"
                    options={optionTransit}
                    value={checkedTransit}
                    onChange={onChangeTransit}
                  />
                ),
              },
              {
                key: '2',
                label: <p className="text-start text-base">Airline</p>,
                children: (
                  <div>
                    <Checkbox.Group value={checkedAirline} onChange={onChangeAirline} className="flex flex-col w-full gap-3 font-semibold">
                      {ListAirline.map((air) => (
                        <Checkbox value={air.Airline} key={air.Airline}>
                          <div className="flex flex-col items-start gap-0">
                            <div className="flex items-center gap-2">
                              <div className="w-16 hidden md:flex items-center h-5 overflow-hidden">
                                <img
                                  className="w-full h-full object-contain"
                                  src={`http://flynow.vn/Assets/Airline/${air.Airline}.gif`}
                                  alt="logo"
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2 price-airline-filter">
                              <div className="text-gray-400">{AirlineInfo(air.Airline)?.Name}</div>
                              <div className="text-orange-400">
                                {air.MinPrice.toLocaleString('vi-VN')}{' '}
                                <span className="text-blue-400">VND</span>
                              </div>
                            </div>
                          </div>
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </div>
                ),
              },
              {
                key: '3',
                label: <p className="text-start text-base">Time</p>,
                children: (
                  <div>
                    <div>
                      <div className="text-start font-sans text-base">Departure Time</div>
                      <div className="flex flex-wrap my-3">
                        {optionTimeFlight.map((time) => (
                          <div className="w-1/2 p-2" key={time.ID}>
                            <TimeFlightFilter
                              TimeFilter={time}
                              Reset={departureTimeIds.length === 0}
                              selectTimeFilter={(id, event) => handleDepartureTime({ ID: id, Event: event })}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-start font-sans text-base">Arrival Time</div>
                      <div className="flex flex-wrap my-3">
                        {optionTimeFlight.map((time) => (
                          <div className="w-1/2 p-2" key={time.ID}>
                            <TimeFlightFilter
                              TimeFilter={time}
                              Reset={arrivalTimeIds.length === 0}
                              selectTimeFilter={(id, event) => handleArrivalTime({ ID: id, Event: event })}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-start font-sans text-base">Flight Duration</div>
                      <div className="flex flex-wrap my-3">
                        <RangeSlider
                          Reset={!durationRange}
                          minValue={durationMinHour}
                          maxValue={durationMaxHour}
                          handleChangeRangeSlider={handleDuration}
                        />
                        <div className="w-full flex justify-between items-center font-semibold">
                          <div>{durationMinHour}h</div>
                          <div>{durationMaxHour}h</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                key: '4',
                label: <p className="text-start text-base">Price/passenger</p>,
                children: (
                  <div className="flex flex-wrap my-3">
                    <RangeSlider
                      Reset={!priceRange}
                      tooltipFormatter={formatTooltipPricePassenger}
                      minValue={pricePassengerMin}
                      maxValue={pricePassengerMax}
                      handleChangeRangeSlider={handlePricePassenger}
                    />
                    <div className="w-full flex justify-between items-center font-semibold">
                      <div>
                        <span className="text-orange-400 me-1">
                          {pricePassengerMin.toLocaleString('vi-VN')}
                        </span>
                        <span className="text-blue-400 font-semibold">VND</span>
                      </div>
                      <div>
                        <span className="text-orange-400 me-1">
                          {pricePassengerMax.toLocaleString('vi-VN')}
                        </span>
                        <span className="text-blue-400 font-semibold">VND</span>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Filter;
