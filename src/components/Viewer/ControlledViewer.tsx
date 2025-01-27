import { useEffect, useState } from 'react';
import { ReactSVGPanZoom, Tool, TOOL_PAN, Value } from 'react-svg-pan-zoom';
import { ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader';

import Spinner from '../Spinner';
import { Anchor, SvgParsedData, Tag } from '../../types';
import { viewerWrapClass } from './styles';
import AnchorLayer from './AnchorLayer';
import { useViewerRef } from '../../hooks/useViewerRef';

type Props = {
  anchors: Anchor[];
  isFetching: boolean;
  parsedSvgData: SvgParsedData;
  planHeight: number;
  planSvgUrl: string;
  planWidth: number;
  tags: Tag[];
  svgScale?: number;
  onSvgScaleSet: (scale: number) => void;
};

function ControlledViewer(props: Props) {
  const viewerRef = useViewerRef();
  const [tool, onChangeTool] = useState<Tool>(TOOL_PAN);
  const [value, onChangeValue] = useState<Value>({} as Value);

  useEffect(() => {
    const svgEl = document.getElementsByClassName('injected-svg')[0];

    if (!props.svgScale && svgEl) {
      const originalWidth = svgEl.getBoundingClientRect().width;

      svgEl.setAttribute('width', '100%');
      svgEl.setAttribute('height', '100%');
      svgEl.setAttribute('preserveAspectRatio', 'xMinYMin meet');

      const newWidth = svgEl.getBoundingClientRect().width;
      props.onSvgScaleSet(newWidth / originalWidth);
      viewerRef?.current?.fitToViewer();
    }
  }, [value]);

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
                    tags={props.tags}
                    parsedSvgData={props.parsedSvgData}
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
