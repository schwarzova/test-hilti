import { create } from 'zustand';
import { Tool } from '../../types';
import { mockedTools } from '../../mocks/mocks';

type SidebarState = {
  tools: Tool[];
  isFetchingTools: boolean;
  fetchTools: () => Promise<void>;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  tools: [],
  isFetchingTools: false,
  fetchTools: async () => {
    set({ isFetchingTools: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ tools: mockedTools });
    set({ isFetchingTools: false });
  },
}));
