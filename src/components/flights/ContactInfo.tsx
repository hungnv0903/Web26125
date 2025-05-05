import { InfoCircleOutlined } from '@ant-design/icons'
import { Col, Form, Input, Row } from 'antd'
import React from 'react'

type ContactInfo = {
  GivenName: string;
  Phone: string;
  Email: string;
  Address?:string;
};

const ContactInfo = () => {
  return (
    <div className='shadow-custom rounded-md overflow-hidden'>
              <div className='mb-3'>
                <h3 className='capitalize text-lg text-start font-semibold bg-blue-400 text-white px-2 py-1.5'>
                  <InfoCircleOutlined className='me-2' />
                  Contact information (Tickets/Receipts Delivery)
                  </h3>
              </div> 
              <Row gutter={24} className='p-3'>
                <Col xs={24} sm={12}>
                <Form.Item<ContactInfo>
                  label="Full name"
                  name="GivenName"
                  rules={[{ required: true, message: 'Please input your full name!' }]}
                  >
                  <Input size="large" />
                </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                <Form.Item<ContactInfo>
                  label="Phone number"
                  name="Phone"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                  >
                  <Input size="large" />
                </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                <Form.Item<ContactInfo>
                  label="Email"
                  name="Email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                  <Input size="large" />
                </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item<ContactInfo>
                    label="Address"
                    name="Address"
                    >
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
  )
}

export default ContactInfo