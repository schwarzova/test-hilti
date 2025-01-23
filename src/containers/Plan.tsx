import { css } from '../../styled-system/css';

import Viewer from '../components/Plan/Viewer';
import { usePlanStore } from '../components/Plan/store';
import PlanSelection from '../components/Plan/PlanSelection';
import { Plan as PlanType } from '../types';
import { useRef } from 'react';

const planWrapStyles = css({
  marginLeft: 'basePx',
  width: '80%',
  borderRadius: '10px',
});

function Plan() {
  const planRef = useRef<HTMLDivElement>(null);
  const fetchPlans = usePlanStore((state) => state.fetchPlans);
  const isFetching = usePlanStore((state) => state.isFetching);
  const plans = usePlanStore((state) => state.plans);
  const selectedPlan = usePlanStore((state) => state.selectedPlan);
  const setSelectedPlan = usePlanStore((state) => state.setSelectedPlan);
  const fetchAnchors = usePlanStore((state) => state.fetchAnchors);
  const anchors = usePlanStore((state) => state.anchors);
  const tags = usePlanStore((state) => state.tags);
  const fetchSvgUrl = usePlanStore((state) => state.fetchPlanSvgUrl);
  const selectedPlanSvgUrl = usePlanStore((state) => state.selectedPlanSvgUrl);

  function handlePlansLoad() {
    fetchPlans();
  }

  function handlePlanSelect(plan: PlanType) {
    setSelectedPlan(plan);
    fetchAnchors();
    fetchSvgUrl(plan.id);
  }

  return (
    <div className={planWrapStyles} ref={planRef}>
      {selectedPlan && selectedPlanSvgUrl && planRef.current ? (
        <Viewer
          anchors={anchors}
          isFetching={isFetching}
          planSvgUrl={selectedPlanSvgUrl}
          planWidth={planRef.current.getBoundingClientRect().width}
          planHeight={planRef.current.getBoundingClientRect().height}
          tags={tags}
        />
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
