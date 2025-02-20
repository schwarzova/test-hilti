import { Alert, Divider, Flex, Progress } from 'antd';
import {
  newSidebarBoxStyles,
  newSidebarLabel,
  secondaryLabel,
  primarySidebarLabel,
} from './styles';
import { MOCKED_TASKS } from '../../mocks/mocks';
import Spinner from '../Spinner';

type Props = {
  displayData: boolean;
  isFetching: boolean;
};

function Tasks(props: Props) {
  function getColor(done: number) {
    if (done < 21) {
      return '#d2051e';
    }
    if (done < 81) {
      return '#DEAA00';
    }
    return '#008000';
  }

  function renderBody() {
    if (!props.displayData) {
      return <Alert message="No tasks are loaded yet" type="info" showIcon />;
    }

    if (props.isFetching) {
      return <Spinner />;
    }

    return (
      <Flex gap="middle" vertical>
        {MOCKED_TASKS.map((task) => (
          <Flex gap="small" align="center">
            <Progress
              percent={task.completion}
              steps={5}
              size={[4, 24]}
              strokeColor={getColor(task.completion)}
              trailColor={'#BDBDBD'}
            />
            <span className={primarySidebarLabel}>{task.name}</span>
            <Divider type="vertical" style={{ height: '22px' }} />
            <span className={secondaryLabel}>{task.place}</span>
          </Flex>
        ))}
      </Flex>
    );
  }

  return (
    <div className={newSidebarBoxStyles} style={{ maxHeight: '260px' }}>
      <h3 className={newSidebarLabel}>Tasks</h3>
      {renderBody()}
    </div>
  );
}

export default Tasks;
