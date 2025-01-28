import { create } from 'zustand';
import { WebSocket as MockWebSocket, Server } from 'mock-socket';

import { Anchor, Plan, SvgParsedData, Tag } from '../../types';
import { mockedAnchors, mockedPlans, mockedTags } from '../../mocks/mocks';
import { parseSvg } from './utils';

type PlanState = {
  anchors: Anchor[];
  isFetching: boolean;
  isFetchingTags: boolean;
  plans: Plan[];
  parsedSvgData: SvgParsedData;
  selectedPlan?: Plan;
  selectedPlanSvgUrl?: string;
  tags: Tag[];
  socket: MockWebSocket | null;
  svgScaleX: number;
  svgScaleY: number;
  fetchAnchors: () => Promise<void>;
  fetchPlans: () => Promise<void>;
  fetchPlanSvgUrl: (planId: string) => Promise<void>;
  fetchTags: () => MockWebSocket | null;
  resetSelectedPlan: () => void;
  setSelectedPlan: (plan: Plan) => void;
  quickInit: () => void;
  setSvgScale: (svgScaleX: number, svgScaleY: number) => void;
};

const initialParsed: SvgParsedData = {
  referencePoints: [],
  transformMatrix: [0, 0, 0, 0, 0, 0],
  originOfTSL: { xSvg: 0, ySvg: 0, yReal: 0, xReal: 0 },
  scale: 1,
  angle: 0,
};

export const usePlanStore = create<PlanState>((set, get) => ({
  originPoint: { x: 0, y: 0 },
  parsedSvgData: initialParsed,
  svgScaleX: 1,
  svgScaleY: 1,
  // this is for quick floor plan load for debugging anchors and tags
  quickInit: () => {
    set({
      selectedPlanSvgUrl: '/src/assets/floorplan3withGCS.svg',
      anchors: mockedAnchors,
      tags: mockedTags,
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
    }),

  isFetching: false,
  anchors: [],
  fetchAnchors: async () => {
    set({ isFetching: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    set({ anchors: mockedAnchors });
    set({ isFetching: false });
  },

  isFetchingTags: false,
  tags: mockedTags,
  socket: null,
  fetchTags: () => {
    if (get().socket) return null;

    // Mocked server
    const mockServer = new Server('wss://mockserver.com/socket');

    mockServer.on('connection', (socket) => {
      // Send random tags coordinates each 200ms
      setInterval(() => {
        const originTagPos = mockedTags[0].position;
        const prevTag = get().tags[0];
        const randomSignX = Math.random() < 0.5 ? -0.1 : 0.1;
        const randomSignY = Math.random() < 0.5 ? -0.1 : 0.1;
        const newX = prevTag.position.x + randomSignX;
        const newY = prevTag.position.y + randomSignY;

        const mockUpdatedTags: Tag[] = [
          {
            ...mockedTags[0],
            position: {
              x: newX < 1300 && newX > 0 ? newX : originTagPos.x,
              y: newY < 350 && newY > 0 ? newY : originTagPos.y,
              z: mockedTags[0].position.z,
            },
          },
        ];
        socket.send(JSON.stringify({ tags: mockUpdatedTags }));
      }, 200);
    });

    // Create mocked socket connected to server
    const socket = new MockWebSocket('wss://mockserver.com/socket');
    set({ socket });

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.tags) {
        set({ tags: data.tags });
      }
    };

    return socket;
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
        set({ parsedSvgData: parsedData });
      }
    }
    set({ isFetching: false });
  },
  setSvgScale: (svgScaleX, svgScaleY) => set({ svgScaleX, svgScaleY }),
}));
