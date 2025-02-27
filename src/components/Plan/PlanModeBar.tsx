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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (planMode === 'history' && historicalTimeStamp) {
      setDate(historicalTimeStamp);
    }
  }, [historicalTimeStamp, planMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (!planMode) {
    return null;
  }

  return (
    <div className={cx(viewerBarStyles, modeBar)}>
      <PlanModeBadge planMode={planMode} />
      <ConfigLabel bold secondary style={{ marginLeft: '8px' }}>
        {formatDateTime(
          planMode === 'history' ? date : currentTime.getTime(),
          true,
          true,
        )}
      </ConfigLabel>
    </div>
  );
}

export default PlanModeBar;
