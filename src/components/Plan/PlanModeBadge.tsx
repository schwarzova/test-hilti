import { Space } from 'antd';

import ConfigLabel from './ConfigLabel';
import { Radio, History } from 'lucide-react';
import { PLAN_ICON_STROKE_WIDTH } from '../../constants/consts';
import { PlanMode } from '../../types';
import { badgeStyle } from './styles';
import { css, cx } from '../../../styled-system/css';

type Props = {
  planMode: PlanMode;
};

const blinkClass = css({ animation: 'blink 2s ease-in-out infinite' });

function PlanModeBadge(props: Props) {
  return (
    <Space className={cx(badgeStyle, blinkClass)} size={2}>
      {props.planMode === 'latest' ? (
        <Radio strokeWidth={PLAN_ICON_STROKE_WIDTH} color="#fff" size="22px" />
      ) : (
        <History
          strokeWidth={PLAN_ICON_STROKE_WIDTH}
          color="#fff"
          size="22px"
        />
      )}
      <ConfigLabel
        style={{ textTransform: 'uppercase', color: '#fff' }}
        secondary
        bold
      >
        {props.planMode === 'latest' ? 'live' : 'replaying'}
      </ConfigLabel>
    </Space>
  );
}

export default PlanModeBadge;
