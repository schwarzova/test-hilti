import { useState } from 'react';
import { css } from '../../../styled-system/css';
import {
  UncontrolledReactSVGPanZoom,
  ViewerMouseEvent,
} from 'react-svg-pan-zoom';
import { ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader';

import Spinner from '../Spinner';
import { Anchor } from '../../types';
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

type Position = { top: number; left: number };

function Viewer(props: Props) {
  const [anchorPosition, setAnchorPosition] = useState<Position>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function renderAnchors(event: ViewerMouseEvent<any>) {
    setAnchorPosition({ top: event.y, left: event.x });
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
            onClick={(e) => renderAnchors(e)}
          >
            <svg width={props.planWidth} height={props.planHeight}>
              <>
                {content}
                <foreignObject
                  width={props.planWidth}
                  height={props.planHeight}
                >
                  <canvas
                    id="anchor_canvas"
                    width={props.planWidth}
                    height={props.planHeight}
                  />
                  <img
                    src={anchorImg}
                    className={css({
                      position: 'absolute',
                      zIndex: 1,
                      height: `${anchorSize}px`,
                      width: `${anchorSize}px`,
                    })}
                    style={{
                      left: `calc(${anchorPosition?.left}px - ${anchorSize / 2}px)`,
                      top: `calc(${anchorPosition?.top}px - ${anchorSize / 2}px)`,
                    }}
                    alt="Anchor"
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
