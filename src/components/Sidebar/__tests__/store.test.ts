import { beforeEach, expect, test, vi } from 'vitest';
import { useSidebarStore } from '../../Sidebar/store';
import { MOCKED_TOOLS } from '../../../mocks/mocks';

beforeEach(() => {
  useSidebarStore.setState({ tools: [], isFetchingTools: false });
});

test('fetchTools', async () => {
  useSidebarStore.getState().fetchTools();

  expect(useSidebarStore.getState().isFetchingTools).toBe(true);

  await vi.waitUntil(
    () => useSidebarStore.getState().isFetchingTools === false,
    1500,
  );

  expect(useSidebarStore.getState().tools).toEqual(MOCKED_TOOLS);
  expect(useSidebarStore.getState().isFetchingTools).toBe(false);
});
