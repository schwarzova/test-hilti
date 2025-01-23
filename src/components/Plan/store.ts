import { create } from 'zustand';
import { Anchor, Plan, Point, ReferencePoint, SvgParsedData, Tag } from '../../types';
import { mockedAnchors, mockedPlans, mockedTags } from '../../mocks/mocks';
import { parseSvg } from './utils';

type PlanState = {
  anchors: Anchor[];
  isFetching: boolean;
  isFetchingTags: boolean;
  plans: Plan[];
  referencePoints: ReferencePoint[]; // Global Coordinate points
  scale: number;
  selectedPlan?: Plan;
  selectedPlanSvgUrl?: string;
  tags: Tag[];
  originPoint: Point
  fetchAnchors: () => Promise<void>;
  fetchPlans: () => Promise<void>;
  fetchPlanSvgUrl: (planId: string) => Promise<void>;
  fetchTags: () => Promise<void>;
  resetSelectedPlan: () => void;
  setSelectedPlan: (plan: Plan) => void;
  quickInit: () => void;
};

export const usePlanStore = create<PlanState>((set) => ({
  scale: 1,
  originPoint: { x: 0, y: 0 },
  // this is for quick floor plan load for debugging anchors and tags
  quickInit: () => {
    set({
      selectedPlanSvgUrl: '/src/assets/floorplan3withGCS.svg',
      anchors: mockedAnchors,
      tags: mockedTags,
      selectedPlan: mockedPlans[0],
      plans: mockedPlans,
    })
  },
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
      referencePoints: [],
    }),

  isFetching: false,
  anchors: [],
  fetchAnchors: async () => {
    set({ isFetching: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ anchors: mockedAnchors });
    set({ isFetching: false });
  },

  isFetchingTags: false,
  tags: [],
  fetchTags: async () => {
    set({ isFetchingTags: true });
    await new Promise((resolve) => setTimeout(resolve, 100));
    set({ tags: mockedTags });
    set({ isFetchingTags: false });
  },

  referencePoints: [],
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

      const parsedData: SvgParsedData | null = parseSvg(text);
      if (parsedData) {
        set({
          referencePoints: parsedData.referencePoints, scale: parsedData.scale, originPoint: {
            x: parsedData.originOfTSL.xSvg,
            y: parsedData.originOfTSL.ySvg
          }
        });
      }
    }
    set({ isFetching: false });
  },
}));
