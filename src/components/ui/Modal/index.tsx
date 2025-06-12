import { Modal, Button } from 'antd';
import React from 'react'

type CommonModalProps = {
  open: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  title?: React.ReactNode;
  content?: React.ReactNode;
  confirmLoading?: boolean;
  footer?: React.ReactNode | null;
  okText?: string;
  cancelText?: string;
  buttonSize?: 'small' | 'middle' | 'large';
  okButtonProps?: React.ComponentProps<typeof Button>;
  cancelButtonProps?: React.ComponentProps<typeof Button>;
};

const CommonModal:React.FC<CommonModalProps> = ({
    open,
    onOk,
    onCancel,
    title='Notification',
    content,
    confirmLoading,
    footer,
    okText,
    cancelText,
    buttonSize = 'middle',
    okButtonProps,
    cancelButtonProps
}) => {
  const defaultFooter = footer === undefined ? [
    <Button
      key="cancel"
      size={buttonSize}
      {...cancelButtonProps}
      onClick={onCancel}
    >
      {cancelText || 'Cancel'}
    </Button>,
    <Button
      key="ok"
      type="primary"
      size={buttonSize}
      loading={confirmLoading}
      {...okButtonProps}
      onClick={onOk}
    >
      {okText || 'OK'}
    </Button>
  ] : footer;

  return (
    <>
        <Modal 
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            title={title}
            footer={defaultFooter}
            width={{
                xs: '90%',
                sm: '80%',
                md: '70%',
                lg: '60%',
                xl: '50%',
                xxl: '40%',
            }}
        >
            {content}
        </Modal>
    </>
  )
}

export default CommonModal