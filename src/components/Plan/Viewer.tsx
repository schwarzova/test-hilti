import { css } from '../../../styled-system/css';
import Spinner from '../Spinner';

const viewerStyles = css({
  fontSize: '16px',
});

type Props = {
  isFetching: boolean;
};

function Viewer(props: Props) {
  if (props.isFetching) {
    return <Spinner />;
  }

  return <div className={viewerStyles}>Plan viewer...</div>;
}

export default Viewer;
