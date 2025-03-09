import { ReloadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Collapse, GetProp } from 'antd'
import React, { Fragment } from 'react'

const Filter = () => {
    const options = [
        { label: '1 Direct', value: 1 },
        { label: '2 Transit(s)', value: 2 },
        { label: '+2 transits', value: 3 },
      ];
    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        console.log('checked = ', checkedValues);
      };


  return (
    <Fragment>
        <div className='mt-3 p-1'> 
            <div className='flex justify-between items-center mb-3'>
                <div className='font-bold text-base'>Filter</div>
                <Button><ReloadOutlined ></ReloadOutlined></Button>
            </div>
            <div className='flex flex-col gap-3'>
                 <Collapse
                    style={{ border: "none", boxShadow: "none" }}
                    // bordered={false}
                    // ghost={true}
                    size="small"
                    expandIconPosition="end"
                    items={[{ 
                         key: '1',
                         label: (
                            <p className='text-start text-base'>No. of Transit</p>
                         ),
                         children: <Checkbox.Group className='flex flex-col w-full gap-3 font-semibold' options={options} defaultValue={['Pear']} onChange={onChange} /> }]}
                  />
                  <Collapse
                    style={{ border: "none", boxShadow: "none" }}
                    // bordered={false}
                    // ghost={true}
                    size="small"
                    expandIconPosition="end"
                    items={[{ 
                         key: '1',
                         label: (
                            <p className='text-start text-base'>Airline</p>
                         ),
                         children: <Checkbox.Group  className='flex flex-col w-full gap-3 font-semibold' options={options} defaultValue={['Pear']} onChange={onChange} /> }]}
                  />
                  <Collapse
                    style={{ border: "none", boxShadow: "none" }}
                    // bordered={false}
                    // ghost={true}
                    size="small"
                    expandIconPosition="end"
                    items={[{ 
                         key: '1',
                         label: (
                            <p className='text-start text-base'>Time</p>
                         ),
                         children: <div>

                         </div> }]}
                  />
                  <Collapse
                    style={{ border: "none", boxShadow: "none" }}
                    // bordered={false}
                    // ghost={true}
                    size="small"
                    expandIconPosition="end"
                    items={[{ 
                         key: '1',
                         label: (
                            <p className='text-start text-base'>Price/passenger</p>
                         ),
                         children: <div>
                          
                         </div> }]}
                  />
            </div>
        </div>
    </Fragment>
  )
}

export default Filter