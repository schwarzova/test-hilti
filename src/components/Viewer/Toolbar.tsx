import {
  ReactSVGPanZoom,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  TOOL_PAN,
  TOOL_NONE,
} from 'react-svg-pan-zoom';

import { Divider, Flex } from 'antd';
import {
  selectedToolbarButton,
  toolbar,
  toolbarButton,
  viewerBarStyles,
} from '../Plan/styles';
import ToolButton from './ToolButton';
import { Fullscreen, History, Radio } from 'lucide-react';
import { memo } from 'react';
import { PlanMode } from '../../types';
import { cx } from '../../../styled-system/css';
import { PLAN_ICON_STROKE_WIDTH } from '../../constants/consts';

type Props = {
  onChangeTool: (tool: string) => void;
  onLiveUpdateClick: () => void;
  onPopoverOpenChange: () => void;
  planMode?: PlanMode;
  tool: string;
  viewer?: React.RefObject<ReactSVGPanZoom>;
};

const Toolbar = memo((props: Props) => {
  return (
    <Flex className={cx(viewerBarStyles, toolbar)} vertical align="center">
      <Flex vertical align="center" style={{ padding: '12px 4px 6px' }}>
        <ToolButton
          tool={TOOL_NONE}
          onClick={props.onChangeTool}
          isSelected={props.tool === TOOL_NONE}
        />
        <ToolButton
          tool={TOOL_PAN}
          onClick={props.onChangeTool}
          isSelected={props.tool === TOOL_PAN}
        />
        <ToolButton
          tool={TOOL_ZOOM_IN}
          onClick={props.onChangeTool}
          isSelected={props.tool === TOOL_ZOOM_IN}
        />
        <ToolButton
          tool={TOOL_ZOOM_OUT}
          onClick={props.onChangeTool}
          isSelected={props.tool === TOOL_ZOOM_OUT}
        />
        <Divider
          type="horizontal"
          style={{
            width: '90%',
            margin: '2px',
            padding: '0px 2px',
            backgroundColor: 'grey',
          }}
        />
      </Flex>

      <Flex vertical align="center" style={{ padding: '0px 4px 0px' }}>
        <button
          className={toolbarButton}
          onClick={() => props.viewer?.current?.reset()}
          title="Resize to fit"
        >
          <Fullscreen strokeWidth={PLAN_ICON_STROKE_WIDTH} />
        </button>
        <Divider
          type="horizontal"
          style={{
            width: '90%',
            margin: '2px',
            padding: '0px 2px',
            backgroundColor: 'grey',
          }}
        />
      </Flex>
      <Flex vertical align="center" style={{ padding: '6px 4px 6px' }}>
        <button
          className={cx(
            toolbarButton,
            props.planMode === 'history' && selectedToolbarButton,
          )}
          style={{}}
          onClick={props.onPopoverOpenChange}
          title="History playback"
        >
          <History strokeWidth={PLAN_ICON_STROKE_WIDTH} />
        </button>

        <button
          className={cx(
            toolbarButton,
            props.planMode === 'latest' && selectedToolbarButton,
          )}
          onClick={props.onLiveUpdateClick}
          title="Live update"
        >
          <Radio strokeWidth={PLAN_ICON_STROKE_WIDTH} />
        </button>
      </Flex>
    </Flex>
  );
});

export default Toolbar;
