import React from 'react';
import { Drawer, Button, Grid } from 'antd';
import './index.scss';

export interface CommonDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  width?: number | string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  closable?: boolean;
  footer?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  okButtonProps?: React.ComponentProps<typeof Button>;
  cancelButtonProps?: React.ComponentProps<typeof Button>;
  destroyOnClose?: boolean; // Thêm prop này
}

const { useBreakpoint } = Grid;

const CommonDrawer: React.FC<CommonDrawerProps> = ({
  open,
  onClose,
  title,
  children,
  placement = 'right',
  width=null,
  closable = true,
  footer,
  okText = 'OK',
  cancelText = 'Cancel',
  onOk,
  onCancel,
  okButtonProps,
  cancelButtonProps,
  destroyOnClose = false, // Giá trị mặc định
}) => {
  const screens = useBreakpoint();
  let responsiveWidth:string | number = 400 ; 
  if (screens.xxl) responsiveWidth = '30%';
  else if (screens.xl) responsiveWidth = '40%';
  else if (screens.lg) responsiveWidth = '60%';
  else if (screens.md) responsiveWidth = '80%';
  else if (screens.sm) responsiveWidth = '90%';
  else if (screens.xs) responsiveWidth = '100%';

  const defaultFooter = (
    <div style={{ textAlign: 'right' }}>
      <Button
        onClick={onCancel || onClose}
        style={{ marginRight: 8 }}
        {...cancelButtonProps}
      >
        {cancelText}
      </Button>
      <Button
        type="primary"
        onClick={onOk}
        {...okButtonProps}
      >
        {okText}
      </Button>
    </div>
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title}
      width={width || responsiveWidth}
      placement={placement}
      closable={closable}
      footer={footer !== undefined ? footer : defaultFooter}
      destroyOnClose={destroyOnClose} // Truyền prop này vào Drawer
    >
      {children}
    </Drawer>
  );
};

export default CommonDrawer;