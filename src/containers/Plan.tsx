import { useEffect, useState } from 'react';
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
import HistoryReplayConfig from '../components/Plan/HistoryReplayConfig';
import Spinner from '../components/Spinner';

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
  const connectFetchTags = usePlanStore((state) => state.connectFetchTags);
  const changePlanMode = usePlanStore((state) => state.changePlanMode);
  const planMode = usePlanStore((state) => state.planMode);

  const [isPopoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    if (selectedPlan && planMode === undefined) {
      changePlanMode('latest');
    }
  }, [selectedPlan, planMode]);

  useEffect(() => {
    if (selectedPlan && planMode === 'latest') {
      connectFetchTags();
    }
  }, [connectFetchTags, planMode]);

  function handlePlansLoad() {
    fetchPlans();
  }

  function handlePlanSelect(plan: PlanType) {
    setSelectedPlan(plan);
    fetchAnchors();
    fetchSvgUrl(plan);
    fetchSidebarTools();
  }

  function handlePopoverOpenChange() {
    setPopoverOpen(!isPopoverOpen);
  }

  function handleLiveUpdateClick() {
    changePlanMode('latest');
    // start web socked again and switch displayedTags to tags
  }

  return (
    <div className={planWrapStyles}>
      {isFetching || (!selectedPlanSvgUrl && selectedPlan) ? (
        <Spinner />
      ) : selectedPlan && selectedPlanSvgUrl ? (
        <div>
          <Viewer
            anchors={anchors}
            groundTruthPoints={groundTruthPoints}
            isFetching={isFetching}
            planMode={planMode}
            onPopoverOpenChange={handlePopoverOpenChange}
            onLiveUpdateClick={handleLiveUpdateClick}
            planSvgUrl={selectedPlanSvgUrl}
            tags={tags}
          />
          {isPopoverOpen && (
            <HistoryReplayConfig onClose={() => setPopoverOpen(false)} />
          )}
        </div>
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
