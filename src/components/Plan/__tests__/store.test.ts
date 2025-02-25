import { beforeEach, expect, test } from 'vitest';
import { usePlanStore } from '../store';
import { Plan } from '../../../types';
import dayjs from 'dayjs';

const emptyPlanStore = usePlanStore.getState();

beforeEach(() => {
  usePlanStore.setState(emptyPlanStore);
});

test('set and reset selected plan', () => {
  const plan: Plan = { id: 'Plan1', name: 'Plan', url: '' };

  usePlanStore.getState().setSelectedPlan(plan);
  expect(usePlanStore.getState().selectedPlan).toEqual(plan);
  usePlanStore.getState().resetSelectedPlan();
  expect(usePlanStore.getState().selectedPlan).toEqual(undefined);
});

test('setSvgScale', () => {
  const svgScaleX = 1;
  const svgScaleY = 2;

  usePlanStore.getState().setSvgScale(svgScaleX, svgScaleY);
  expect(usePlanStore.getState().svgScaleX).toEqual(1);
  expect(usePlanStore.getState().svgScaleY).toEqual(2);
});

test('changePlanMode', () => {
  usePlanStore.getState().changePlanMode('history');
  expect(usePlanStore.getState().planMode).toEqual('history');
});

test('setReplayDate', () => {
  const newDate = dayjs(new Date(2025, 1, 16));

  usePlanStore.setState({ replayDate: undefined });
  usePlanStore.getState().setReplayDate(dayjs(new Date(2025, 1, 16)));
  expect(usePlanStore.getState().replayDate).toEqual(newDate);
});

test('setReplayTime', () => {
  const newTime = dayjs(new Date(2025, 1, 16, 12, 12, 0));

  usePlanStore.getState().setReplayTime(newTime);
  expect(usePlanStore.getState().replayTime).toEqual(newTime);
});

test('setReplaySpeed', () => {
  usePlanStore.getState().setReplaySpeed(500);
  expect(usePlanStore.getState().replaySpeed).toEqual(500);
});

test('resetReplay', () => {
  const dayjsDay = dayjs(new Date(2025, 1, 16, 12, 12, 0));

  usePlanStore.setState({
    replayTime: dayjsDay,
    replaySpeed: 500,
    replayDate: dayjsDay,
    isReplayDataLoaded: true,
  });
  usePlanStore.getState().resetReplay();
  expect(usePlanStore.getState().replayTime).toEqual(undefined);
  expect(usePlanStore.getState().replaySpeed).toEqual(1);
  expect(usePlanStore.getState().isReplayDataLoaded).toEqual(false);
});

// todo test for connectFetchTags, disconnectFetchTags and fetchAllTags
