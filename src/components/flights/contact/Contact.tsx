import { Button,Form, FormProps} from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { IContactForm, INewListSelectFlight, ListTypePassengerProp } from '@/types/contactModel';
import { handleFlightConfirm } from '@/redux/flights/flightConfirmSlice';
import { groupListFlightValue } from '@/utils/helper';
import { FlightConfirm, IResponseConfirmPice, IResponseConfirmPriceQHA } from '@/types/flightConfirmModel';
import { AppDispatch, RootState } from '@/redux/store';
import getFlightsApi from '@/services/flightService';
import { handleSaveContactForm } from '@/redux/flights/contactFormSlice';
import ContactInfo from './ContactInfo';
import PassengerInfo from './PassengerInfo';




const Contact:React.FC = () => {
  const dispatch = useDispatch<AppDispatch>() ;
  const [form] = Form.useForm(); 
  const {Adt,Chd,Inf} = useSelector((state:RootState)=>state.flights.searchFormReducer) ; 
  const contactForm = useSelector((state:RootState)=>state.flights.contactFormReducer) ; 
  const ListSelectFlight = useSelector((state:RootState)=>state.flights.chooseFlightReducer.ListSelectFlight) ; 
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const listTypePassenger: ListTypePassengerProp[] = [
    ...Array(Adt).fill('ADT').map((ps:string,index:number)=>({Type:ps,Name:'Adult',Index:index+1})),
    ...Array(Chd).fill('CHD').map((ps:string,index:number)=>({Type:ps,Name:'Child',Index:index+1})),
    ...Array(Inf).fill('INF').map((ps:string,index:number)=>({Type:ps,Name:'Infant',Index:index+1})),
  ];

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };
  

  useEffect(() => {
    if(contactForm.ListPassenger.length !==0){
      form.setFieldsValue({
        Contact:contactForm.Contact,
        ListPassenger:contactForm.ListPassenger.map((ps)=>({
          ...ps,
          Birthday: dayjs(ps.Birthday, 'DDMMYYYY'),
        })),
      })
    }
  }, [contactForm.Contact,contactForm.ListPassenger,form]);

  const handleConfirmPrice = (dataConfirm:INewListSelectFlight[])=>{
    if(dataConfirm.length===0) return null ; 
    const newDataConfirm = groupListFlightValue(dataConfirm) ; 
    return newDataConfirm.map(item=>getFlightsApi.select(item))
  }

  const handleResponseConfirmPrice = (responseConfirm:IResponseConfirmPice[] | null , listSelectFlight:INewListSelectFlight[])=>{
    if(responseConfirm){
      const checkConfirm = responseConfirm?.some(item=>!item.Status || item.Session==='') ;  
      if(checkConfirm) return null ; 

      const flightConifirm:FlightConfirm = {
        ListFlightConfirm:listSelectFlight,
        Confirm:responseConfirm.map(item=>({Session:item.Session,TotalPrice:item.TotalPrice})),
      }

      return flightConifirm ; 
    }else{
      return null ; 
    }
  }

  
  const handleConfirmPriceQHA = (dataConfirmQHA:INewListSelectFlight[],formData:IContactForm)=>{
    if(dataConfirmQHA.length===0) return null ; 
    const newDataConfirmQHA = {
      System:'QHA',
      ListFlightValue:dataConfirmQHA.flatMap(item=>item.ListFlight.map(e=>e.FlightValue)),
      ...formData,
    }
    return getFlightsApi.selectQHA(newDataConfirmQHA) ; 
  }

  const handleResponseConfirmPriceQHA = (responseConfirmQHA:IResponseConfirmPriceQHA | null,listSelectFlight:INewListSelectFlight[])=>{
    if(responseConfirmQHA && responseConfirmQHA.Status && responseConfirmQHA.NewFlightValue!==''){
      const flightConfirm:FlightConfirm = {
        ListFlightConfirm:listSelectFlight,
        Confirm:{Session:responseConfirmQHA.NewFlightValue , TotalPrice:responseConfirmQHA.TotalPrice},
      }
      return flightConfirm ; 
    }else{
      return null ; 
    }

  }



  const onFinish: FormProps<IContactForm>['onFinish'] = async (values) => {
    const newListSelectFlight:INewListSelectFlight[] = ListSelectFlight.map(item=>{
      return {
        System:item.System,
        ListFlight:item.ListOption[0].ListFlight,
      }
    })

    const formData = {
      Contact:{
        ...values.Contact,
        SurName: " ",
        GivenName:values.Contact.GivenName.trim(),
      },
      ListPassenger:values.ListPassenger.map((ps,index)=>({
        Gender:ps.Gender,
        Index:index,
        Type:listTypePassenger[index].Type,
        FirstName:ps.FirstName.trim(),
        LastName:ps.LastName.trim(),
        Birthday: dayjs(ps.Birthday).format('DDMMYYYY'),
      }))
    }

    const selectFlightNormal = newListSelectFlight.filter(item=>item.System !== 'QHA')
    const selectFlightQHA = newListSelectFlight.filter(item=>item.System === 'QHA')

    const confirmPrice = handleConfirmPrice(selectFlightNormal) ; 
    const confirmQHA =  handleConfirmPriceQHA(selectFlightQHA, formData) ; 
    enterLoading(0);
    const resultConfirm = await Promise.all([(confirmPrice ? Promise.all(confirmPrice) : null),confirmQHA])
    setLoadings([]) ; 
    const listDataFlightConfirm:(FlightConfirm | null)[] = [] ;
    const dataFlightConfirm =  handleResponseConfirmPrice(resultConfirm[0],selectFlightNormal) ; 
    const dataFlightConfirmQHA = handleResponseConfirmPriceQHA(resultConfirm[1],selectFlightQHA) ; 
    listDataFlightConfirm.push(dataFlightConfirm) ; 
    listDataFlightConfirm.push(dataFlightConfirmQHA)
    
    dispatch(handleSaveContactForm(formData)) ; 
    dispatch(handleFlightConfirm(listDataFlightConfirm))

  };


  return (
    <Fragment>
        <div> 
            <h3 className='capitalize text-lg md:text-2xl text-start font-medium text-orange-400'> Enter information</h3>
        </div>
        <div className='my-5'>
          <Form
            form={form}
            layout="vertical"
            name='ContactForm'
            onFinish={onFinish}
            initialValues={{
              Contact:{
                Address:'',
              },
              ListPassenger: listTypePassenger.map(() => ({ Gender: true })),
            }}
          >
            <ContactInfo />
            <PassengerInfo ListTypePassengerProp={listTypePassenger} />
            <div className='w-full mt-5'>
              <Form.Item label={null}>
                 <Button type="primary" loading={loadings[0]} variant="solid" size='large' className='w-52' htmlType="submit" >
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