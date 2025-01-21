import { useState } from 'react';
import { css } from '../../../styled-system/css';
import {
  UncontrolledReactSVGPanZoom,
  ViewerMouseEvent,
} from 'react-svg-pan-zoom';
import { ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader';

import Spinner from '../Spinner';
import { Anchor, Point2d } from '../../types';
import anchorImg from '../../assets/anchor.png';
import { anchorSize } from '../../constants/consts';

const viewerWrapStyles = css({
  width: '100%',
  height: '100%',
  position: 'relative',
});

type Props = {
  anchors: Anchor[];
  isFetching: boolean;
  planHeight: number;
  planWidth: number;
  planSvgUrl: string;
};

function Viewer(props: Props) {
  const [startAnchor, setStartAnchor] = useState<Point2d>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function renderAnchors(event: ViewerMouseEvent<any>) {
    setStartAnchor({ y: event.y, x: event.x });
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
                {startAnchor && (
                  <foreignObject
                    width={props.planWidth}
                    height={props.planHeight}
                  >
                    <img
                      src={anchorImg}
                      className={css({
                        position: 'absolute',
                        zIndex: 1,
                        height: `${anchorSize}px`,
                        width: `${anchorSize}px`,
                      })}
                      style={{
                        left: `calc(${startAnchor.x}px - ${anchorSize / 2}px)`,
                        top: `calc(${startAnchor.y}px - ${anchorSize / 2}px)`,
                      }}
                      alt="Anchor"
                    />
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
