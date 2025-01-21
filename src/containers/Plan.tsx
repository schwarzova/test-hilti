import { css } from '../../styled-system/css';

import Viewer from '../components/Plan/Viewer';
import { usePlanStore } from '../components/Plan/store';
import PlanSelection from '../components/Plan/PlanSelection';
import { Plan as PlanType } from '../types';

const planWrapStyles = css({
  marginLeft: 'basePx',
  width: '80%',
  borderRadius: '10px',
});

function Plan() {
  const fetchPlans = usePlanStore((state) => state.fetchPlans);
  const isFetching = usePlanStore((state) => state.isFetching);
  const plans = usePlanStore((state) => state.plans);
  const selectedPlan = usePlanStore((state) => state.selectedPlan);
  const setSelectedPlan = usePlanStore((state) => state.setSelectedPlan);
  const fetchAnchors = usePlanStore((state) => state.fetchAnchors);

  function handlePlansLoad() {
    fetchPlans();
  }

  function handlePlanSelect(plan: PlanType) {
    setSelectedPlan(plan);
    fetchAnchors();
    // todo fetch svg
  }

  return (
    <div className={planWrapStyles}>
      {selectedPlan ? (
        <Viewer isFetching={isFetching} />
      ) : (
        <PlanSelection
          isFetching={isFetching}
          onPlansLoad={handlePlansLoad}
          onPlanSelect={handlePlanSelect}
          plans={plans}
        />
      )}
    </div>
  );
}

export default Plan;
