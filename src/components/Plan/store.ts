import { create } from 'zustand';
import { WebSocket as MockWebSocket, Server } from 'mock-socket';

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
  socket: MockWebSocket | null;
  fetchAnchors: () => Promise<void>;
  fetchPlans: () => Promise<void>;
  fetchPlanSvgUrl: (planId: string) => Promise<void>;
  fetchTags: () => MockWebSocket | null;
  resetSelectedPlan: () => void;
  setSelectedPlan: (plan: Plan) => void;
};

export const usePlanStore = create<PlanState>((set, get) => ({
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

  isFetching: false,
  anchors: [],
  fetchAnchors: async () => {
    set({ isFetching: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
        const randomSignX = Math.random() < 0.5 ? -1 : 1;
        const randomSignY = Math.random() < 0.5 ? -1 : 1;
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
