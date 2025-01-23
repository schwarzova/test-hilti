import { css } from '../../styled-system/css';

import Viewer from '../components/Viewer/Viewer';
import { usePlanStore } from '../components/Plan/store';
import PlanSelection from '../components/Plan/PlanSelection';
import { Plan as PlanType } from '../types';
import { useEffect, useRef, useState } from 'react';

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
  const scale = usePlanStore((state) => state.scale);
  const originPoint = usePlanStore((state) => state.originPoint);
  
  // uncomment for quick init
  // const quickInit = usePlanStore((state) => state.quickInit);
  // const [isDone, setDone] = useState(false);

  // useEffect(() => {
  //   if (!isDone){
  //     quickInit();
  //     fetchSvgUrl('3')
  //     setDone(true);
  //   }
    
  // }, [isDone, fetchSvgUrl, quickInit])

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
          originPoint={originPoint}
          isFetching={isFetching}
          planSvgUrl={selectedPlanSvgUrl}
          planWidth={planRef.current.getBoundingClientRect().width}
          planHeight={planRef.current.getBoundingClientRect().height}
          tags={tags}
          scale={scale}
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
