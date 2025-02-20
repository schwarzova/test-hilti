import { css } from '../styled-system/css';
import { ConfigProvider } from 'antd';

import TopMenu from './containers/TopMenu';
import Sidebar from './containers/Sidebar';
import Plan from './containers/Plan';
import { Plan as PlanType } from './types';
import { useSidebarStore } from './components/Sidebar/store';
import { usePlanStore } from './components/Plan/store';

const theme = {
  token: {
    colorPrimary: 'text.primary',
  },
};

function App() {
  const plans = usePlanStore((state) => state.plans);
  const selectedPlan = usePlanStore((state) => state.selectedPlan);
  const setSelectedPlan = usePlanStore((state) => state.setSelectedPlan);
  const resetSelectedPlan = usePlanStore((state) => state.resetSelectedPlan);
  const fetchAnchors = usePlanStore((state) => state.fetchAnchors);
  const fetchSvgUrl = usePlanStore((state) => state.fetchPlanSvgUrl);
  const fetchSidebarTools = useSidebarStore((state) => state.fetchTools);

  function handlePlanSelect(plan?: PlanType) {
    if (plan) {
      setSelectedPlan(plan);
      fetchAnchors();
      fetchSvgUrl(plan);
      fetchSidebarTools();
    } else {
      resetSelectedPlan();
    }
  }

  return (
    <ConfigProvider theme={theme}>
      <TopMenu
        onPlanSelect={handlePlanSelect}
        plans={plans}
        selectedPlan={selectedPlan}
      />
      <div
        className={css({
          display: 'flex',
          px: 'basePx',
          py: 'basePy',
          // 64px is height of top menu
          height: '[calc(100vh - 64px)]',
        })}
      >
        <Sidebar />
        <Plan />
      </div>
    </ConfigProvider>
  );
}

export default App;
