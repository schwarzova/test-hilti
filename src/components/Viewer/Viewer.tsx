import {
  UncontrolledReactSVGPanZoom,
} from "react-svg-pan-zoom";
import { ReactSvgPanZoomLoader } from "react-svg-pan-zoom-loader";

import Spinner from "../Spinner";
import { Anchor, Point, Tag } from "../../types";
import {  viewerWrapClass } from "./styles";
import AnchorLayer from "./AnchorLayer";

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

function Viewer(props: Props) {
  if (props.isFetching) {
    return <Spinner />;
  }

  return (
    <div className={viewerWrapClass}>
      <ReactSvgPanZoomLoader
        src={props.planSvgUrl}
        render={(content) => (
          <UncontrolledReactSVGPanZoom
            width={props.planWidth}
            height={props.planHeight}
            defaultTool="pan"
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
                    originPoint={props.originPoint}
                    scale={props.scale}
                    tags={props.tags}
                  />
                </foreignObject>
              </>
            </svg>
          </UncontrolledReactSVGPanZoom>
        )}
      />
    </div>
  );
}

export default Viewer;
