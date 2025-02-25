import {
  Button,
  Card,
  ConfigProvider,
  DatePicker,
  Flex,
  //   Radio,
  Space,
  TimePicker,
} from 'antd';
import type { Dayjs } from 'dayjs';

import { darkTheme } from '../../theme/antTheme';
import { usePlanStore } from './store';
import ConfigLabel from './ConfigLabel';
import {
  CloudDownload,
  LocateFixed,
  Play,
  Square,
  TagIcon,
} from 'lucide-react';
import { getTagsFromSelectedInterval, getUniqueTagCount } from './selectors';
import Spinner from '../Spinner';
import { ICON_COLOR_LIGHT } from '../../constants/consts';

type Props = {
  onClose: () => void;
};

function HistoryReplayConfig(props: Props) {
  const fetchAllTags = usePlanStore((state) => state.fetchAllTags);
  const setReplayDate = usePlanStore((state) => state.setReplayDate);
  const setReplayTime = usePlanStore((state) => state.setReplayTime);
  //   const setReplaySpeed = usePlanStore((state) => state.setReplaySpeed);
  const resetReplay = usePlanStore((state) => state.resetReplay);
  const changePlanMode = usePlanStore((state) => state.changePlanMode);

  const isReplayDataLoaded = usePlanStore((state) => state.isReplayDataLoaded);
  const replayDate = usePlanStore((state) => state.replayDate);
  const replayTime = usePlanStore((state) => state.replayTime);
  //   const replaySpeed = usePlanStore((state) => state.replaySpeed);
  const planMode = usePlanStore((state) => state.planMode);
  const isFetchingAllTags = usePlanStore((state) => state.isFetchingAllTags);

  const filteredTags = usePlanStore(getTagsFromSelectedInterval);
  const uniqueTagsCount = usePlanStore(getUniqueTagCount);

  function onTimeChange(time: Dayjs) {
    if (isReplayDataLoaded) {
      resetReplay();
    }

    setReplayTime(time);
  }

  function handleDateChange(date: Dayjs) {
    if (isReplayDataLoaded) {
      resetReplay();
    }

    setReplayDate(date);
  }

  //   function handleSpeedChange() {}

  function handleDownloadDataClick() {
    fetchAllTags();
  }

  function handlePlayClick() {
    if (planMode === 'history') {
      changePlanMode('latest');
    } else {
      changePlanMode('history');
    }
  }

  return (
    <ConfigProvider theme={darkTheme}>
      <Card
        size="small"
        title="History replay settings "
        extra={
          <button style={{ color: '#ff0000' }} onClick={props.onClose}>
            Close
          </button>
        }
        style={{
          width: 300,
          position: 'absolute',
          top: 260,
          right: 70,
          zIndex: 999,
          borderRadius: 0,
        }}
      >
        <Flex gap={8} justify="space-between">
          <Space direction="vertical" size={2}>
            <ConfigLabel>Select date</ConfigLabel>
            <DatePicker value={replayDate} onChange={handleDateChange} />
          </Space>

          <Space direction="vertical" size={2}>
            <ConfigLabel>Select time</ConfigLabel>
            <TimePicker
              value={replayTime}
              onChange={onTimeChange}
              format="HH:mm"
            />
          </Space>
        </Flex>

        <Flex>
          <Button
            style={{ marginTop: '8px', width: '100%' }}
            onClick={handleDownloadDataClick}
            disabled={!replayDate && !replayTime}
            icon={<CloudDownload size="16px" style={{ marginTop: '2px' }} />}
          >
            Get data
          </Button>
        </Flex>
        <Flex gap={8} vertical style={{ marginTop: '16px' }}>
          <Space direction="vertical" size={8}>
            <ConfigLabel bold>Results</ConfigLabel>
          </Space>
          {isFetchingAllTags && (
            <Flex justify="center" style={{ width: '100%', height: '100px' }}>
              <Spinner />
            </Flex>
          )}
          {isReplayDataLoaded && (
            <Flex gap={8} vertical>
              <Flex justify="space-between" style={{ width: '100%' }}>
                <Flex gap="2px" align="center">
                  <TagIcon size="16px" color={ICON_COLOR_LIGHT} />
                  <ConfigLabel secondary>
                    {uniqueTagsCount} tags found
                  </ConfigLabel>
                </Flex>

                <Flex gap="2px" align="center">
                  <LocateFixed size="16px" color={ICON_COLOR_LIGHT} />
                  <ConfigLabel secondary>
                    {filteredTags.length} measurements
                  </ConfigLabel>
                </Flex>
              </Flex>

              <Flex justify="end" align="end" style={{ width: '100%' }}>
                <Button
                  style={{ marginTop: '8px', width: '100%' }}
                  onClick={handlePlayClick}
                  icon={
                    planMode === 'history' ? (
                      <Square size="16px" style={{ marginTop: '2px' }} />
                    ) : (
                      <Play size="16px" style={{ marginTop: '2px' }} />
                    )
                  }
                >
                  {planMode === 'history' ? 'Stop' : 'Play'}
                </Button>
              </Flex>
            </Flex>
          )}
          {/* <Space direction="vertical">
            <ConfigLabel>Select speed</ConfigLabel>
            <Radio.Group
        options={speedOptions}
        onChange={handleSpeedChange}
        value={replaySpeed}
        optionType="button"
      />
          </Space> */}
        </Flex>
      </Card>
    </ConfigProvider>
  );
}

export default HistoryReplayConfig;
