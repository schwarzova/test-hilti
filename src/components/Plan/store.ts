import { create } from 'zustand';
import { Anchor, GCP, Plan } from '../../types';
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
  gcps: GCP[];
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
      gcps: [],
    }),
  anchors: [],
  fetchAnchors: async () => {
    set({ isFetching: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ anchors: mockedAnchors });
    set({ isFetching: false });
  },
  gcps: [],
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
