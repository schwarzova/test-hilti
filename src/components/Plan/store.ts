import { create } from 'zustand';
import { Anchor, Plan, Tag } from '../../types';
import { mockedAnchors, mockedPlans, mockedTags } from '../../mocks/mocks';

type PlanState = {
  isFetching: boolean;
  isFetchingTags: boolean;
  plans: Plan[];
  fetchPlans: () => Promise<void>;
  selectedPlan?: Plan;
  setSelectedPlan: (plan: Plan) => void;
  resetSelectedPlan: () => void;
  anchors: Anchor[];
  tags: Tag[];
  fetchAnchors: () => Promise<void>;
  fetchTags: () => Promise<void>;
  selectedPlanSvgUrl?: string;
  fetchPlanSvgUrl: (planId: string) => Promise<void>;
};

export const usePlanStore = create<PlanState>((set) => ({
  isFetching: false,
  isFetchingTags: false,
  tags: [],
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
  fetchTags: async () => {
    set({ isFetchingTags: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ tags: mockedTags });
    set({ isFetchingTags: false });
  },
  fetchPlanSvgUrl: async (planId) => {
    set({ isFetching: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (planId === '1') {
      set({ selectedPlanSvgUrl: '/src/assets/floorplan.svg' });
    } else {
      set({ selectedPlanSvgUrl: '/src/assets/floorPlan3.svg' });
    }
    set({ isFetching: false });
  },
}));
