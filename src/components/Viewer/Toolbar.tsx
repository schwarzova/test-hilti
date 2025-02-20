import {
  ReactSVGPanZoom,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  TOOL_PAN,
  TOOL_NONE,
} from 'react-svg-pan-zoom';

import { Divider, Flex } from 'antd';
import { toolbar, toolbarButton } from '../Plan/styles';
import ToolButton, { STROKE_WIDTH } from './ToolButton';
import { Fullscreen, History } from 'lucide-react';
import { memo } from 'react';

type Props = {
  viewer?: React.RefObject<ReactSVGPanZoom>;
  tool: string;
  onChangeTool: (tool: string) => void;
  isPopoverOpen: boolean;
  onPopoverOpenChange: () => void;
};

const Toolbar = memo((props: Props) => {
  return (
    <Flex className={toolbar} vertical align="center">
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
      </Flex>
      <Divider
        type="horizontal"
        style={{
          width: '90%',
          margin: '2px',
          padding: '0px 2px',
          backgroundColor: 'grey',
        }}
      />
      <Flex vertical align="center" style={{ padding: '6px 4px 12px' }}>
        <button
          className={toolbarButton}
          onClick={() => props.viewer?.current?.reset()}
          title="Resize to fit"
        >
          <Fullscreen strokeWidth={STROKE_WIDTH} />
        </button>
        <button
          className={toolbarButton}
          onClick={props.onPopoverOpenChange}
          title="History playback"
        >
          <History strokeWidth={STROKE_WIDTH} />
        </button>
      </Flex>
    </Flex>
  );
});

export default Toolbar;
