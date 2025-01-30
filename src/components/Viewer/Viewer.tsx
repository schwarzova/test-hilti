import { useEffect, useState } from 'react';
import { ReactSVGPanZoom, Tool, TOOL_PAN, Value } from 'react-svg-pan-zoom';
import { ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader';

import Spinner from '../Spinner';
import {
  Anchor,
  MeasurementPoint,
  Point,
  SimpleTooltip,
  Tag,
} from '../../types';
import { tooltipClass, viewerWrapClass } from './styles';
import AnchorLayer from './AnchorLayer';
import { useViewerRef } from '../../hooks/useViewerRef';
import TagTooltip from './TagTooltip';
import { TAG_ZOOM_SCALE } from '../../constants/consts';
type Props = {
  anchors: Anchor[];
  groundTruthPoints: MeasurementPoint[];
  isFetching: boolean;
  measuredPoints: Point[];
  onSvgScaleSet: (scaleX: number, scaleY: number) => void;
  planHeight: number;
  planSvgUrl: string;
  planWidth: number;
  svgScaleX: number;
  tags: Tag[];
};

function Viewer(props: Props) {
  const viewerRef = useViewerRef();
  const [tool, onChangeTool] = useState<Tool>(TOOL_PAN);
  const [value, onChangeValue] = useState<Value>({} as Value);
  const [currentZoom, setCurrentZoom] = useState(1);

  const [tooltipTag, setTooltipTag] = useState<Tag | undefined>(undefined);
  const [simpleTooltip, setSimpleTooltip] = useState<SimpleTooltip | undefined>(
    undefined,
  );

  useEffect(() => {
    const svgEl = document.getElementsByClassName('injected-svg')[0];
    setCurrentZoom(viewerRef?.current?.getValue().d || 1);

    if (props.svgScaleX === 1 && svgEl) {
      const originalWidth = svgEl.getBoundingClientRect().width;
      const originalHeight = svgEl.getBoundingClientRect().height;

      svgEl.setAttribute('width', '100%');
      svgEl.setAttribute('height', '100%');
      svgEl.setAttribute('preserveAspectRatio', 'xMinYMin meet');

      const newWidth = svgEl.getBoundingClientRect().width;
      const newHeight = svgEl.getBoundingClientRect().height;
      props.onSvgScaleSet(newWidth / originalWidth, newHeight / originalHeight);
      viewerRef?.current?.fitToViewer();
    }
  }, [value]);

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

  if (props.isFetching) {
    return <Spinner />;
  }

  return (
    <div className={viewerWrapClass}>
      <ReactSvgPanZoomLoader
        src={props.planSvgUrl}
        render={(content) => (
          <ReactSVGPanZoom
            ref={viewerRef}
            width={props.planWidth}
            height={props.planHeight}
            value={value}
            onChangeValue={onChangeValue}
            tool={tool}
            onChangeTool={onChangeTool}
            defaultTool="none"
          >
            <svg width={props.planWidth} height={props.planHeight}>
              <>
                {content}
                <foreignObject
                  width={props.planWidth}
                  height={props.planHeight}
                >
                  <AnchorLayer
                    anchors={props.anchors}
                    focusedTag={tooltipTag}
                    groundTruthPoints={props.groundTruthPoints}
                    measuredPoints={props.measuredPoints}
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
                    <TagTooltip
                      style={{
                        top: tooltipTag.position.y + getTooltipOffset(),
                        left: tooltipTag.position.x + getTooltipOffset(),
                        transform: `scale(${1 / value?.d || 1})`,
                      }}
                      tag={tooltipTag}
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
