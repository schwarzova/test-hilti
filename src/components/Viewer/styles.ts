import { css } from '../../../styled-system/css';

export const viewerWrapClass = css({
  width: '100%',
  height: '100%',
  position: 'relative',
  border: '1px solid red',
});

export const tagClass = css({
  zIndex: 1,
  position: 'absolute',
  width: 'tagSize',
  height: 'tagSize',
  backgroundColor: 'viewer.tag',
  borderRadius: '50%',
});

export const anchorClass = css({
  position: 'absolute',
  zIndex: 1,
  height: 'anchorSize',
  width: 'anchorSize',
  backgroundColor: 'viewer.anchor',
  borderRadius: '50%',
});

export const tooltipClass = css({
  position: 'absolute',
  backgroundColor: 'background.tooltip',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '5px',
  pointerEvents: 'none',
});

export const measuredPointClass = css({
  position: 'absolute',
  zIndex: 1,
  height: 'referencePoint',
  width: 'referencePoint',
  backgroundColor: 'viewer.measuredPoint',
  borderRadius: '50%',
});
