import { Button,Form, FormProps,} from 'antd'
import React, { Fragment } from 'react'
import PassengerInfo from '../../components/flights/PassengerInfo';
import { FieldType, ListTypePassengerProp } from '../../types/contactModel';
import ContactInfo from '../../components/flights/ContactInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { Encrypt} from '../../utils/crypto';




const Contact = () => {
  const navigate = useNavigate();
  const {Adt,Chd,Inf} = useSelector((state:RootState)=>state.searchFormReducer) ; 
  console.log(Adt , Chd,Inf) ; 
  const listTypePassenger: ListTypePassengerProp[] = [
    ...Array(Adt).fill('ADT').map((ps:string,index:number)=>({Type:ps,Name:'Adult',Index:index+1})),
    ...Array(Chd).fill('CHD').map((ps:string,index:number)=>({Type:ps,Name:'Child',Index:index+1})),
    ...Array(Inf).fill('INF').map((ps:string,index:number)=>({Type:ps,Name:'Infant',Index:index+1})),
  ];
  
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    const encrypted = Encrypt(values,import.meta.env.VITE_KEY_CRYPTO);
    navigate(`/select-service?data=${encrypted}`) ; 
  };

  
  
  return (
    <Fragment>
        <div className='flex justify-between items-center'> 
            <h3 className='capitalize text-lg md:text-2xl text-start font-medium text-orange-400'> Enter information</h3>
        </div>
        <div className='my-5'>
          <Form
            layout="vertical"
            name='ContactForm'
            onFinish={onFinish}
            initialValues={{
              ListPassenger: listTypePassenger.map(() => ({ Gender: true })),
            }}
          >
            <ContactInfo />
            <PassengerInfo ListTypePassengerProp={listTypePassenger} />
            <div className='w-full mt-5'>
              <Form.Item label={null}>
                <Button type="primary" variant="solid" size='large' className='w-52' htmlType="submit">
                  Next
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
    </Fragment>
  )
}

export default Contact