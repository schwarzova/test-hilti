import { ConfigProvider, Flex, Select } from 'antd';
import { css } from '../../styled-system/css';
import logoSrc from '../assets/logo.svg';
import { usePlanStore } from '../components/Plan/store';
import { useSidebarStore } from '../components/Sidebar/store';
import { selectTheme } from '../theme/selectTheme';

const menuStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  px: 'basePx',
  py: 'basePy',
  backgroundColor: 'background.light',
  fontSize: '16px',
  height: '60px',
  boxShadow: '0 -.625rem .625rem .625rem #00000026',
});

function LogoImage() {
  const containerStyle: React.CSSProperties = {
    width: '130px',
    marginRight: '20px',
  };

  const imageStyle: React.CSSProperties = {
    height: '60px',
    objectFit: 'contain',
  };

  return (
    <div style={containerStyle}>
      <img src={logoSrc} alt="Company logo" style={imageStyle} />
    </div>
  );
}

function TopMenu() {
  const plans = usePlanStore((state) => state.plans);
  const selectedPlan = usePlanStore((state) => state.selectedPlan);
  const planMode = usePlanStore((state) => state.planMode);

  const setSelectedPlan = usePlanStore((state) => state.setSelectedPlan);
  const resetSelectedPlan = usePlanStore((state) => state.resetSelectedPlan);
  const resetReplay = usePlanStore((state) => state.resetReplay);
  const setReplayConfigOpen = usePlanStore((state) => state.setReplayConfigOpen);
  const fetchAnchors = usePlanStore((state) => state.fetchAnchors);
  const fetchSvgUrl = usePlanStore((state) => state.fetchPlanSvgUrl);
  const fetchSidebarTools = useSidebarStore((state) => state.fetchTools);
  const stopPollingHistoricalTags = usePlanStore((state) => state.stopPollingHistoricalTags);
  const changePlanMode = usePlanStore((state) => state.changePlanMode);

  function handleChange(value: string) {
    if (planMode === 'history'){
      stopPollingHistoricalTags();
      changePlanMode('latest');
    }

    resetSelectedPlan();
    setReplayConfigOpen(false);
    resetReplay();

    const newPlan = plans.find((p) => p.id === value);

    if (newPlan) {
      setSelectedPlan(newPlan);
      fetchSvgUrl(newPlan);
      fetchAnchors();
      fetchSidebarTools();
    }
  }

  return (
    <div className={menuStyles}>
      <Flex align="center">
        <LogoImage />
        Location-aware Tools | Digital Twin
      </Flex>
      {plans.length > 0 && (
        <ConfigProvider theme={selectTheme}>
          <Select
            style={{ width: 200 }}
            onChange={handleChange}
            options={plans.map((p) => ({ value: p.id, label: p.name }))}
            value={selectedPlan ? selectedPlan.id : null}
          />
        </ConfigProvider>
      )}
    </div>
  );
}

export default TopMenu;
