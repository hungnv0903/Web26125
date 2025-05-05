import { ContactsOutlined } from '@ant-design/icons'
import { Col, DatePicker, Form, Input, Radio, Row } from 'antd'
import { ListTypePassengerProp } from '../../types/contactModel';
import dayjs from 'dayjs';

export type PassengerInfo = {
  Gender:boolean ; 
  FirstName:string;
  LastName:string;
  Birthday:string;
}

interface IListTypePassengerProp {
  ListTypePassengerProp:ListTypePassengerProp[] ; 
}

const PassengerInfo = ({ListTypePassengerProp}:IListTypePassengerProp) => {
  const baseDate = dayjs() //tam thoi lay ngày hienj tại.nếu láy ngày chỉ dịnh thì truyen vào dayjs cau trúc ví dụ (4-5-2025)
  const getDisableDatePassenger = (type:string)=>{
    return (current:dayjs.Dayjs)=>{
      if(type==='ADT'){
        return current.isAfter(baseDate.subtract(12,'year'),'day') ; 
      }
      if(type==='CHD'){
        return (
          current.isAfter(baseDate.subtract(3,'year'),'day') || 
          current.isBefore(baseDate.subtract(12,'year'),'day')
        )
      }
      if(type==='INF'){
        return current.isBefore(baseDate.subtract(3,'year'),'day') ; 
      }
      return false ; 
    }
  }

  const getLimitDatePassenger = (type:string)=>{
    if(type==='ADT'){
      return {
        MaxDate: baseDate.subtract(12,'year'),
      }
    }
    if(type==='CHD'){
      return {
        MinDate:baseDate.subtract(12,'year').add(1,'day'),
        MaxDate:baseDate.subtract(3,'year'),
      }
    }
    if(type==='INF'){
      return {
        MinDate:baseDate.subtract(3,'year').add(1,'day'),
        MaxDate:baseDate,
      }
    }
    return {} ; 
  }
  return (
    <div className='shadow-custom rounded-md overflow-hidden mt-7'>
      <div className='mb-3'>
        <h3 className='capitalize text-lg text-start font-semibold bg-blue-400 text-white px-2 py-1.5'>
        <ContactsOutlined className='me-2 text-xl' />
          Passenger Information
          </h3>
      </div>
      <Form.List name="ListPassenger">
        {
          (fields)=>(
            <>
              {fields.map((field,index)=>{
                const ps = ListTypePassengerProp[index] ; 
                return (
                  <div key={field.key}>
                  <div className='my-3'>
                    <h3 className='text-start font-semibold text-base mx-3 px-2 py-1 bg-gray-100'>
                      <i className={`me-2 fa-solid ${ps.Type==='ADT'?'fa-person':ps.Type==='CHD'?'fa-child-dress':'fa-baby'}`}>.</i>
                      {ps.Name} {ps.Index} 
                    </h3>
                  </div>  
                  <Row gutter={24} className='p-3'>
                  <Col sm={24}>
                  <div className='flex items-center gap-10 mb-5'>
                    <div><span className='icon-required'>*</span>Gender</div>
                    <div>
                      <Form.Item
                        name={[field.name,'Gender']}
                        className='text-start'
                        noStyle
                        >
                          <Radio.Group>
                            <Radio value={true}>Made</Radio>
                            <Radio value={false}>Femade</Radio>
                          </Radio.Group>
                      </Form.Item>
                    </div>
                  </div>
                  </Col>
                  <Col xs={24} sm={8}>
                  <Form.Item
                    label="Last Name"
                    name={[field.name,'LastName']}
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                     className='text-start md:text-center'
                    >
                    <Input size="large" />
                  </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                  <Form.Item
                    label="Given Name"
                    name={[field.name,'FirstName']}
                    rules={[{ required: true, message: 'Please input your given name!' }]}
                     className='text-start md:text-center'
                    >
                    <Input size="large" />
                  </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                  <Form.Item
                    label="Date of Birth"
                    name={[field.name,'Birthday']}
                    rules={[{ required: true, message: 'Please input your date of birth!' }]}
                    className='text-start md:text-center'
                    >
                    <DatePicker 
                      size='large' 
                      className='w-full' 
                      placeholder='' 
                      format="DD/MM/YYYY"  
                      disabledDate={getDisableDatePassenger(ps.Type)}
                      minDate={getLimitDatePassenger(ps.Type)?.MinDate}
                      maxDate={getLimitDatePassenger(ps.Type)?.MaxDate}
                      // inputReadOnly
                    />
                  </Form.Item>
                  </Col>
                  </Row>
                  </div>
                )
              })}
            </>
          )
        }
     
      </Form.List> 
    </div>
  )
}

export default PassengerInfo