import { create } from 'zustand';

import { Anchor, Plan, SvgParsedData, Tag } from '../../types';
import {
  mockedAnchors,
  mockedPlans,
  mockedTags1,
  PLAN_ANCHORS_MOCKED_MAP,
} from '../../mocks/mocks';
import { parseSvg } from './utils';
import { REST_API_URL } from '../../constants/consts';
import axios from 'axios';

export type PlanState = {
  anchors: Anchor[];
  isFetching: boolean;
  isFetchingTags: boolean;
  plans: Plan[];
  parsedSvgData: SvgParsedData;
  selectedPlan?: Plan;
  selectedPlanSvgUrl?: string;
  tags: Tag[];
  svgScaleX: number;
  svgScaleY: number;
  fetchAnchors: () => Promise<void>;
  fetchPlans: () => Promise<void>;
  fetchPlanSvgUrl: (plan: Plan) => Promise<void>;
  resetSelectedPlan: () => void;
  setSelectedPlan: (plan: Plan) => void;
  quickInit: () => void;
  setSvgScale: (svgScaleX: number, svgScaleY: number) => void;
  isSocketConnected: boolean;
  socketReal: WebSocket | null;
  connectFetchTags: () => void;
  disconnectFetchTags: () => void;
  allTags: Tag[];
  isLoadingAllTags: boolean;
  fetchAllTags: () => void;
};

const initialParsed: SvgParsedData = {
  referencePoints: [],
  transformMatrix: [0, 0, 0, 0, 0, 0],
  realDistance: 0,
  svgDistance: 0,
  tlsDistance: 0,
  scale: 1,
};

export const usePlanStore = create<PlanState>((set, get) => ({
  parsedSvgData: initialParsed,
  svgScaleX: 1,
  svgScaleY: 1,
  // this is for quick floor plan load for debugging anchors and tags
  quickInit: () => {
    set({
      selectedPlanSvgUrl: '/assets/floorplan.svg',
      anchors: mockedAnchors,
      tags: mockedTags1,
      selectedPlan: mockedPlans[0],
      plans: mockedPlans,
    });
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
      parsedSvgData: initialParsed,
      svgScaleX: 1,
      svgScaleY: 1,
      allTags: [],
      tags: [],
    }),

  isFetching: false,
  anchors: [],
  fetchAnchors: async () => {
    set({ isFetching: true });
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    set((state) => ({
      anchors: state.selectedPlan?.id
        ? PLAN_ANCHORS_MOCKED_MAP[state.selectedPlan.id]
        : [],
    }));
    set({ isFetching: false });
  },

  isFetchingTags: false,
  tags: [],
  socket: null,

  fetchPlanSvgUrl: async (plan) => {
    set({ isFetching: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const planSvgUrl = `/assets/${plan.url}`;

    set({ selectedPlanSvgUrl: planSvgUrl });
    set({ isFetching: false });

    // Parse the SVG and extract metadata
    const response = await fetch(planSvgUrl);
    const text = await response.text();

    const parsedData: SvgParsedData | null = parseSvg(text);
    if (parsedData) {
      set({ parsedSvgData: parsedData });
    }
  },
  setSvgScale: (svgScaleX, svgScaleY) => set({ svgScaleX, svgScaleY }),

  isSocketConnected: false,
  socketReal: null,

  connectFetchTags: () => {
    if (get().socketReal) return; // Prevent duplicate connections

    const socket = new WebSocket(
      'wss://3csw55e5tj.execute-api.eu-west-1.amazonaws.com/production/',
    );

    socket.onopen = () => {
      console.log('WebSocket connected!');
      setInterval(
        () =>
          socket.send(
            JSON.stringify({
              action: 'getLatestTags',
              jobsite: get().selectedPlan?.id,
            }),
          ),
        1000,
      ); // Test message
      set({ socketReal: socket, isSocketConnected: true });
    };

    socket.onmessage = (event) => {
      const data: Tag[] = JSON.parse(event.data);
      console.log('Received data:', data);
      set({ tags: data });
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  },
  disconnectFetchTags: () => {
    const socketReal = get().socketReal;
    console.log('disconnectFetchTags', socketReal);
    if (socketReal) {
      socketReal.close();
      set({ socketReal: null, isSocketConnected: false });
    }
  },

  allTags: [],
  isLoadingAllTags: false,
  fetchAllTags: async () => {
    set({ isLoadingAllTags: true });
    const plan = get().selectedPlan;
    try {
      const response = await axios.get(`${REST_API_URL}/getAllTags`, {
        params: { jobSite: plan?.id },
      });

      const data = response.data.body;
      const resultTags =
        typeof data === 'string' ? JSON.parse(data) : undefined;

      set({ allTags: resultTags, isLoadingAllTags: false });
    } catch (error) {
      console.error('Error fetching all tags:', error);
      set({ isLoadingAllTags: false });
    }
  },
}));
