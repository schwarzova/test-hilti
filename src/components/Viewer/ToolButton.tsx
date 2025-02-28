import {
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  TOOL_PAN,
  TOOL_NONE,
} from 'react-svg-pan-zoom';

import { CSSProperties } from 'react';
import { Hand, MousePointer, ZoomIn, ZoomOut } from 'lucide-react';
import { selectedToolbarButton, toolbarButton } from '../Plan/styles';
import { cx } from '../../../styled-system/css';
import { PLAN_ICON_STROKE_WIDTH } from '../../constants/consts';

type Props = {
  tool: string;
  style?: CSSProperties;
  onClick: (tool: string) => void;
  isSelected: boolean;
};

function ToolButton(props: Props) {
  function renderIcon() {
    switch (props.tool) {
      case TOOL_NONE:
        return (
          <MousePointer strokeWidth={PLAN_ICON_STROKE_WIDTH} size={'1.3em'} />
        );
      case TOOL_PAN:
        return <Hand strokeWidth={PLAN_ICON_STROKE_WIDTH} size={'1.3em'} />;
      case TOOL_ZOOM_IN:
        return <ZoomIn strokeWidth={PLAN_ICON_STROKE_WIDTH} />;
      case TOOL_ZOOM_OUT:
        return <ZoomOut strokeWidth={PLAN_ICON_STROKE_WIDTH} />;
    }
  }

  function getTitle() {
    switch (props.tool) {
      case TOOL_NONE:
        return 'Selection';
      case TOOL_PAN:
        return 'Move';
      case TOOL_ZOOM_IN:
        return 'Zoom in';
      case TOOL_ZOOM_OUT:
        return 'Zoom out';
    }
  }

  return (
    <button
      className={cx(toolbarButton, props.isSelected && selectedToolbarButton)}
      title={getTitle()}
      onClick={() => props.onClick(props.tool)}
    >
      {renderIcon()}
    </button>
  );
}

export default ToolButton;
