import { memo, useEffect, useState } from 'react';
import { ReactSVGPanZoom, Tool, TOOL_PAN, Value } from 'react-svg-pan-zoom';
import { ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader';

import Spinner from '../Spinner';
import {
  Anchor,
  MeasurementPoint,
  PlanMode,
  Point,
  SimpleTooltip,
  Tag,
} from '../../types';
import { tooltipClass, viewerWrapClass } from './styles';
import AnchorLayer from './AnchorLayer';
import { useViewerRef } from '../../hooks/useViewerRef';
import { TAG_ZOOM_SCALE } from '../../constants/consts';
import { useViewerResize } from '../../hooks/useViewerResize';
import AdvancedTagTooltip from './AdvancedTagTooltip';
import Toolbar from './Toolbar';

type Props = {
  anchors: Anchor[];
  groundTruthPoints: MeasurementPoint[];
  isFetching: boolean;
  onLiveUpdateClick: () => void;
  onPopoverOpenChange: () => void;
  planMode?: PlanMode;
  planSvgUrl?: string;
  tags: Tag[];
};

function Viewer(props: Props) {
  const viewerRef = useViewerRef();
  const { planHeight, planWidth } = useViewerResize();
  const [tool, onChangeTool] = useState<Tool>(TOOL_PAN);
  const [value, onChangeValue] = useState<Value>({} as Value);
  const [currentZoom, setCurrentZoom] = useState(1);

  const [tooltipTag, setTooltipTag] = useState<Tag | undefined>(undefined);
  const [simpleTooltip, setSimpleTooltip] = useState<SimpleTooltip | undefined>(
    undefined,
  );

  useEffect(() => {
    setCurrentZoom(viewerRef?.current?.getValue().d || 1);
  }, [value, viewerRef]);

  function handleTooltipVisibilityChange(tag?: Tag) {
    setTooltipTag(tag);
  }

  function handleSimpleTooltipVisibilityChange(point?: Point, text?: string) {
    if (point && text) {
      setSimpleTooltip({ point, text });
    } else {
      setSimpleTooltip(undefined);
    }
  }

  function getTooltipOffset() {
    if (value?.d < 3.5) {
      return 10;
    }

    if (value?.d < 10) {
      return 7;
    }

    return 5;
  }

  if (!planWidth || !planHeight) {
    return <Spinner />;
  }

  return (
    <div className={viewerWrapClass}>
      <ReactSvgPanZoomLoader
        src={props.planSvgUrl}
        render={(content) => (
          <ReactSVGPanZoom
            ref={viewerRef}
            detectAutoPan={false}
            width={planWidth}
            height={planHeight}
            value={value}
            onChangeValue={onChangeValue}
            tool={tool}
            onChangeTool={onChangeTool}
            defaultTool="none"
            customToolbar={memo(({ tool, onChangeTool }) => (
              <Toolbar
                planMode={props.planMode}
                onChangeTool={onChangeTool}
                onPopoverOpenChange={props.onPopoverOpenChange}
                onLiveUpdateClick={props.onLiveUpdateClick}
                tool={tool}
                viewer={viewerRef}
              />
            ))}
          >
            <svg width={planWidth} height={planHeight}>
              <>
                {content}
                <foreignObject width={planWidth} height={planHeight}>
                  <AnchorLayer
                    anchors={props.anchors}
                    focusedTag={tooltipTag}
                    groundTruthPoints={props.groundTruthPoints}
                    onTooltipVisibilityChange={handleTooltipVisibilityChange}
                    onSimpleTooltipVisibilityChange={
                      handleSimpleTooltipVisibilityChange
                    }
                    showTagImage={currentZoom >= TAG_ZOOM_SCALE}
                    tags={props.tags}
                  />

                  {simpleTooltip && (
                    <div
                      className={tooltipClass}
                      style={{
                        top: simpleTooltip.point.y + getTooltipOffset(),
                        transform: `scale(${1 / value?.d || 1})`,
                        left: simpleTooltip.point.x + getTooltipOffset(),
                      }}
                    >
                      {simpleTooltip.text}
                    </div>
                  )}
                  {tooltipTag && (
                    <AdvancedTagTooltip
                      style={{
                        top: tooltipTag.position.y + getTooltipOffset(),
                        left: tooltipTag.position.x + getTooltipOffset(),
                        transform: `scale(${1 / value?.d || 1})`,
                      }}
                      tag={tooltipTag}
                      planMode={props.planMode}
                    />
                  )}
                </foreignObject>
              </>
            </svg>
          </ReactSVGPanZoom>
        )}
      />
    </div>
  );
}

export default Viewer;
