import { useState } from 'react';
import { ReactSVGPanZoom, Tool, TOOL_PAN, Value } from 'react-svg-pan-zoom';
import { ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader';

import Spinner from '../Spinner';
import { Anchor, Point, Tag } from '../../types';
import { viewerWrapClass } from './styles';
import AnchorLayer from './AnchorLayer';
import { useViewerRef } from '../../hooks/useViewerRef';

type Props = {
  anchors: Anchor[];
  isFetching: boolean;
  planHeight: number;
  planWidth: number;
  planSvgUrl: string;
  tags: Tag[];
  scale: number;
  originPoint: Point;
};

function ControlledViewer(props: Props) {
  const viewerRef = useViewerRef();
  const [tool, onChangeTool] = useState<Tool>(TOOL_PAN);
  const [value, onChangeValue] = useState<Value>({} as Value);

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
                    // showTagImages={viewerRef?.current?.getValue().d > 5} // for decision if display circle or image
                    originPoint={props.originPoint}
                    scale={props.scale}
                    tags={props.tags}
                  />
                </foreignObject>
              </>
            </svg>
          </ReactSVGPanZoom>
        )}
      />
    </div>
  );
}

export default ControlledViewer;
