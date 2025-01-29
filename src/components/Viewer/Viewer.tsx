import { useEffect, useState } from 'react';
import { ReactSVGPanZoom, Tool, TOOL_PAN, Value } from 'react-svg-pan-zoom';
import { ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader';

import Spinner from '../Spinner';
import { Anchor, Point, Tag } from '../../types';
import { viewerWrapClass } from './styles';
import AnchorLayer from './AnchorLayer';
import { useViewerRef } from '../../hooks/useViewerRef';
import TagTooltip from './TagTooltip';
import { TAG_ZOOM_SCALE } from '../../constants/consts';

type Props = {
  anchors: Anchor[];
  measuredPoints: Point[];
  isFetching: boolean;
  planHeight: number;
  planSvgUrl: string;
  planWidth: number;
  tags: Tag[];
  svgScaleX: number;
  onSvgScaleSet: (scaleX: number, scaleY: number) => void;
};

function Viewer(props: Props) {
  const viewerRef = useViewerRef();
  const [tool, onChangeTool] = useState<Tool>(TOOL_PAN);
  const [value, onChangeValue] = useState<Value>({} as Value);

  const [tooltipTag, setTooltipTag] = useState<Tag | undefined>(undefined);
  const currentZoom = viewerRef?.current?.getValue().d || 1;

  useEffect(() => {
    const svgEl = document.getElementsByClassName('injected-svg')[0];

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
                    showTagImage={currentZoom >= TAG_ZOOM_SCALE}
                    tags={props.tags}
                    measuredPoints={props.measuredPoints}
                    onTooltipVisibilityChange={handleTooltipVisibilityChange}
                    focusedTag={tooltipTag}
                  />
                </foreignObject>
              </>
            </svg>
          </ReactSVGPanZoom>
        )}
      />
      {tooltipTag && (
        <TagTooltip
          style={{
            position: 'absolute',
            top: tooltipTag.position.y + 10,
            left: tooltipTag.position.x + 10,
          }}
          tag={tooltipTag}
        />
      )}
    </div>
  );
}

export default Viewer;
