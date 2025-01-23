import { create } from 'zustand';
import { Anchor, GCP, Plan, Tag } from '../../types';
import { mockedAnchors, mockedPlans, mockedTags } from '../../mocks/mocks';

type PlanState = {
  anchors: Anchor[];
  gcps: GCP[];
  isFetching: boolean;
  isFetchingTags: boolean;
  plans: Plan[];
  selectedPlan?: Plan;
  selectedPlanSvgUrl?: string;
  tags: Tag[];
  fetchAnchors: () => Promise<void>;
  fetchPlans: () => Promise<void>;
  fetchPlanSvgUrl: (planId: string) => Promise<void>;
  fetchTags: () => Promise<void>;
  resetSelectedPlan: () => void;
  setSelectedPlan: (plan: Plan) => void;
};

export const usePlanStore = create<PlanState>((set) => ({
  isFetching: false,
  isFetchingTags: false,
  tags: [],
  plans: [],
  anchors: [],
  gcps: [],
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
      gcps: [],
    }),

  fetchAnchors: async () => {
    set({ isFetching: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ anchors: mockedAnchors });
    set({ isFetching: false });
  },

  fetchTags: async () => {
    set({ isFetchingTags: true });
    await new Promise((resolve) => setTimeout(resolve, 100));
    set({ tags: mockedTags });
    set({ isFetchingTags: false });
  },

  fetchPlanSvgUrl: async (planId) => {
    set({ isFetching: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (planId === '1') {
      set({ selectedPlanSvgUrl: '/src/assets/floorplan.svg' });
    } else if (planId === '2') {
      set({ selectedPlanSvgUrl: '/src/assets/floorplan2.svg' });
    } else {
      set({ selectedPlanSvgUrl: '/src/assets/floorplan3withGCS.svg' });

      // Parse the SVG and extract metadata
      const response = await fetch('/src/assets/floorplan3withGCS.svg');
      const text = await response.text();
      const parser = new DOMParser();
      const svgDocument = parser.parseFromString(text, 'image/svg+xml');
      const metadataElement = svgDocument.querySelector('metadata');
      const gcpElements = metadataElement?.querySelectorAll('gcp');

      if (gcpElements) {
        const gcps: GCP[] = Array.from(gcpElements).map((gcp) => ({
          xSvg: Number(gcp.getAttribute('x_svg')!),
          ySvg: Number(gcp.getAttribute('y_svg')!),
          xReal: Number(gcp.getAttribute('x_real')!),
          yReal: Number(gcp.getAttribute('y_real')!),
        }));
        set({ gcps });
      }
    }
    set({ isFetching: false });
  },
}));
