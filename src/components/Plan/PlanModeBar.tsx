import { usePlanStore } from './store';
import ConfigLabel from './ConfigLabel';
import { formatDateTime } from './utils';
import PlanModeBadge from './PlanModeBadge';
import { modeBar, viewerBarStyles } from './styles';
import { cx } from '../../../styled-system/css';
import { useEffect, useState } from 'react';

function PlanModeBar() {
  const historicalTimeStamp = usePlanStore(
    (state) => state.historicalTimeStamp,
  );
  const planMode = usePlanStore((state) => state.planMode);

  const [date, setDate] = useState<number>(new Date().getTime());

  useEffect(() => {
    if (planMode === 'history' && historicalTimeStamp) {
      setDate(historicalTimeStamp);
    }
  }, [historicalTimeStamp, planMode]);

  if (!planMode) {
    return null;
  }

  return (
    <div className={cx(viewerBarStyles, modeBar)}>
      <PlanModeBadge planMode={planMode} />

      <ConfigLabel bold secondary style={{ marginLeft: '8px' }}>
        {formatDateTime(new Date(date).toDateString(), true, false)}
      </ConfigLabel>
    </div>
  );
}

export default PlanModeBar;
