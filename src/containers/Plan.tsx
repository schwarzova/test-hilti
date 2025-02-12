import { useEffect, useRef } from 'react';
import { css } from '../../styled-system/css';

import { usePlanStore } from '../components/Plan/store';
import PlanSelection from '../components/Plan/PlanSelection';
import { Plan as PlanType } from '../types';
import { useSidebarStore } from '../components/Sidebar/store';
import Viewer from '../components/Viewer/Viewer';
import {
  getConvertedAnchors,
  getConvertedGroundTruthPoints,
  getConvertedMeasuredPoints,
  getConvertedTags,
} from '../components/Plan/selectors';

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
  const anchors = usePlanStore(getConvertedAnchors);
  const fetchSvgUrl = usePlanStore((state) => state.fetchPlanSvgUrl);
  const selectedPlanSvgUrl = usePlanStore((state) => state.selectedPlanSvgUrl);
  const fetchTags = usePlanStore((state) => state.fetchTags);
  const tags = usePlanStore(getConvertedTags);
  const measuredPoints = usePlanStore(getConvertedMeasuredPoints);
  const groundTruthPoints = usePlanStore(getConvertedGroundTruthPoints);
  const fetchSidebarTools = useSidebarStore((state) => state.fetchTools);

  const connectFetchTags = usePlanStore((state) => state.connectFetchTags);
  const disconnectFetchTags = usePlanStore((state) => state.disconnectFetchTags);


  useEffect(() => {
    if (selectedPlan) {
      const socket = fetchTags();

      return () => {
        // temporary solution, with real socket we can have separate action in store to close it
        socket?.close();
      };
    }
  }, [fetchTags, selectedPlan]);

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
    connectFetchTags()

      return () => {
        disconnectFetchTags();
      };
    }
  , [connectFetchTags, disconnectFetchTags]);


  function handlePlansLoad() {
    fetchPlans();
  }

  function handlePlanSelect(plan: PlanType) {
    setSelectedPlan(plan);
    fetchAnchors();
    fetchSvgUrl(plan.id);
    fetchSidebarTools();
  }

  return (
    <div className={planWrapStyles} ref={planRef}>
      {selectedPlan && selectedPlanSvgUrl && planRef.current ? (
        <Viewer
          anchors={anchors}
          groundTruthPoints={groundTruthPoints}
          isFetching={isFetching}
          measuredPoints={measuredPoints}
          planHeight={planRef.current.getBoundingClientRect().height}
          planSvgUrl={selectedPlanSvgUrl}
          planWidth={planRef.current.getBoundingClientRect().width}
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
