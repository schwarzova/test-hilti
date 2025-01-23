import { useState } from "react";
import { css } from "../../../styled-system/css";
import {
  UncontrolledReactSVGPanZoom,
  ViewerMouseEvent,
} from "react-svg-pan-zoom";
import { ReactSvgPanZoomLoader } from "react-svg-pan-zoom-loader";

import Spinner from "../Spinner";
import { Anchor as AnchorType, Tag } from "../../types";
import { tagStyles } from "./styles";
import Anchor from "./Anchor";

const viewerWrapStyles = css({
  width: "100%",
  height: "100%",
  position: "relative",
});

type Props = {
  anchors: AnchorType[];
  isFetching: boolean;
  planHeight: number;
  planWidth: number;
  planSvgUrl: string;
  tags: Tag[];
};

function Viewer(props: Props) {
  const [convertedAnchors, setConvertedAnchors] = useState<AnchorType[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function renderAnchors(event: ViewerMouseEvent<any>) {
    const sortedAnchors = props.anchors.sort((a, b) => a.x - b.x || a.y - b.y);
    const mostTopLeftAnchor = sortedAnchors[0];
    const deltaX = mostTopLeftAnchor.x - event.x;
    const deltaY = mostTopLeftAnchor.y - event.y;

    const newAnchors = props.anchors.map((a) => ({
      ...a,
      x: a.x - deltaX,
      y: a.y - deltaY,
    }));
    setConvertedAnchors(newAnchors);
    // todo store anchors for future ?
  }

  if (props.isFetching) {
    return <Spinner />;
  }

  return (
    <div className={viewerWrapStyles}>
      <ReactSvgPanZoomLoader
        src={props.planSvgUrl}
        render={(content) => (
          <UncontrolledReactSVGPanZoom
            width={props.planWidth}
            height={props.planHeight}
            defaultTool="pan"
            onClick={renderAnchors}
          >
            <svg width={props.planWidth} height={props.planHeight}>
              <>
                {content}
                {convertedAnchors.length > 0 && (
                  <foreignObject
                    width={props.planWidth}
                    height={props.planHeight}
                  >
                    {convertedAnchors.map((a) => (
                      <Anchor key={a.id} anchorX={a.x} anchorY={a.y} />
                    ))}
                  </foreignObject>
                )}
                {props.tags.length > 0 && (
                  <foreignObject
                    width={props.planWidth}
                    height={props.planHeight}
                  >
                    {props.tags.map((tag) => (
                      <div
                        className={tagStyles}
                        style={{
                          position: "absolute",
                          top: `${tag.position.y}px`,
                          left: `${tag.position.x}px`,
                        }}
                      ></div>
                    ))}
                  </foreignObject>
                )}
              </>
            </svg>
          </UncontrolledReactSVGPanZoom>
        )}
      />
    </div>
  );
}

export default Viewer;
