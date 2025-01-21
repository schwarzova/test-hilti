import { create } from 'zustand';
import { Anchor, Plan } from '../../types';
import { mockedAnchors, mockedPlans } from '../../mocks/mocks';

type PlanState = {
  isFetching: boolean;
  plans: Plan[];
  fetchPlans: () => Promise<void>;
  selectedPlan?: Plan;
  setSelectedPlan: (plan: Plan) => void;
  resetSelectedPlan: () => void;
  anchors: Anchor[];
  fetchAnchors: () => Promise<void>;
  selectedPlanSvgUrl?: string;
  fetchPlanSvgUrl: (planId: string) => Promise<void>;
};

export const usePlanStore = create<PlanState>((set) => ({
  isFetching: false,
  plans: [],
  fetchPlans: async () => {
    set({ isFetching: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ plans: mockedPlans });
    set({ isFetching: false });
  },
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  resetSelectedPlan: () =>
    set({
      selectedPlan: undefined,
      anchors: [],
      selectedPlanSvgUrl: undefined,
    }),
  anchors: [],
  fetchAnchors: async () => {
    set({ isFetching: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ anchors: mockedAnchors });
    set({ isFetching: false });
  },
  fetchPlanSvgUrl: async (planId) => {
    set({ isFetching: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (planId === '1') {
      set({ selectedPlanSvgUrl: '/src/assets/floorplan.svg' });
    } else {
      set({ selectedPlanSvgUrl: '/src/assets/floorplan2.svg' });
    }
    set({ isFetching: false });
  },
}));
