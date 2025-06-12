import {Skeleton } from 'antd';
import React from 'react';

const LoadingFlight: React.FC = () => {
  return (
    <>
    <div className="card-flight cursor-pointer rounded-2xl p-3 transition-all duration-500 ease-in-out">
        <div className="flex items-center justify-center md:justify-between gap-3">
            <div className='hidden md:flex items-center overflow-hidden'>
                <Skeleton.Button active size="small" shape="round" style={{ width:90 }} />
            </div>
            <div className='hidden md:block'>
                <Skeleton.Button active size="small" shape="round" style={{ width:80 }} />
            </div>
            <div className="flex flex-col items-center justify-center gap-1 ">
                <Skeleton.Button active shape="round" style={{ width: 250, height: 20, }} />
                <Skeleton.Button active shape="round" style={{ width: 250, height: 20, }} />
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
            <Skeleton.Button active size="small" shape="round" style={{ width:100,height:20 }} />
            <Skeleton.Button active size="small" shape="round" style={{ width:100, height:20 }} />
            </div>
            
        </div>
        <div className="flex justify-end md:justify-between items-center border-t border-t-gray-300 mt-3 pt-3">
        <div className="flex space-x-4">
            <Skeleton.Button active size="small" shape="round" style={{ width: 100 }} />
            <Skeleton.Button active size="small" shape="round" style={{ width: 140 }} />
        </div>
        <div className="flex items-center space-x-3">
            <Skeleton.Button active size="small" shape="round" style={{ width: 140 }} />
            <Skeleton.Button active size="default" shape="round" style={{ width: 96 }} />
        </div>
        </div>
    </div>
    </>
  );
};

export default LoadingFlight;
