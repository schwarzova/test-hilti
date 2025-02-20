import { Card, ConfigProvider, TimePicker } from 'antd';
import { useState } from 'react';
import type { Dayjs } from 'dayjs';

const theme = {
  token: {
    colorPrimary: '#ff4d4f', // main brand
    colorBgBase: '#141414', // Background color
    colorTextBase: '#ffffff', // Primary text color
    colorBorder: '#424242', // Border color
    colorSuccess: '#52c41a', // Success messages
    colorWarning: '#faad14', // Warnings
    colorError: '#ff4d4f', // Errors    
    colorBgContainer: '#1f1f1f', // Input background
    colorTextPlaceholder: '#bfbfbf', // Placeholder text
    colorBgElevated: '#262626', // DatePicker dropdown bg
    colorTextSecondary: '#bfbfbf', // Secondary text color
    colorBorderSecondary: '#303030', // Secondary borders
    colorFillAlter: '#2a2a2a', // Hover background
    colorFillContent: '#1890ff', // Selected date bg
  },
};

type Props = {
  onClose: () => void;
};

function HistoryReplayConfig(props: Props) {
    const [value, setValue] = useState<Dayjs | null>(null);

    function onChange  (time: Dayjs)  {
      setValue(time);
    };


  return (
    <ConfigProvider theme={theme}>
      <Card
        size="small"
        title="History replay settings "
        extra={
          <button style={{ color: '#ff0000' }} onClick={props.onClose}>
            Close
          </button>
        }
        style={{
          width: 300,
          position: 'absolute',
          top: 260,
          right: 80,
          zIndex: 9999999,
          borderRadius: 0,
        }}
      >
        <p><TimePicker value={value} onChange={onChange} /></p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </ConfigProvider>
  );
}

export default HistoryReplayConfig;
