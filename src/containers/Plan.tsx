import { useEffect } from 'react';
import { css } from '../../styled-system/css';

import { usePlanStore } from '../components/Plan/store';
import PlanSelection from '../components/Plan/PlanSelection';
import { Plan as PlanType } from '../types';
import { useSidebarStore } from '../components/Sidebar/store';
import Viewer from '../components/Viewer/Viewer';
import {
  getConvertedAnchors,
  getConvertedGroundTruthPoints,
  getConvertedTags,
} from '../components/Plan/selectors';

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
  const anchors = usePlanStore(getConvertedAnchors);
  const fetchSvgUrl = usePlanStore((state) => state.fetchPlanSvgUrl);
  const selectedPlanSvgUrl = usePlanStore((state) => state.selectedPlanSvgUrl);
  const tags = usePlanStore(getConvertedTags);
  const groundTruthPoints = usePlanStore(getConvertedGroundTruthPoints);
  const fetchSidebarTools = useSidebarStore((state) => state.fetchTools);

  const fetchAllTags = usePlanStore((state) => state.fetchAllTags);
  const connectFetchTags = usePlanStore((state) => state.connectFetchTags);
  const disconnectFetchTags = usePlanStore(
    (state) => state.disconnectFetchTags,
  );

  useEffect(() => {
    if (selectedPlan) {
      fetchAllTags();
    }
  });

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

  useEffect(() => {
    if (selectedPlan) {
      connectFetchTags();
    }

    return () => {
      disconnectFetchTags();
    };
  }, [connectFetchTags, disconnectFetchTags, selectedPlan]);

  function handlePlansLoad() {
    fetchPlans();
  }

  function handlePlanSelect(plan: PlanType) {
    setSelectedPlan(plan);
    fetchAnchors();
    fetchSvgUrl(plan);
    fetchSidebarTools();
  }

  return (
    <div className={planWrapStyles}>
      {selectedPlan && selectedPlanSvgUrl ? (
        <Viewer
          anchors={anchors}
          groundTruthPoints={groundTruthPoints}
          isFetching={isFetching}
          planSvgUrl={selectedPlanSvgUrl}
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
