import { Spin } from 'antd';
import { loadingStyle } from './Sidebar/styles';

type Props = {
  fitToHeight?: boolean;
};

function Spinner(props: Props) {
  return (
    <Spin
      tip="Loading"
      size="large"
      style={{ height: props.fitToHeight ? '100%' : undefined }}
    >
      <div className={loadingStyle} />
    </Spin>
  );
}

export default Spinner;
