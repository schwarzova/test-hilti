import { css } from '../../../styled-system/css';

export const viewerWrapClass = css({
  width: '100%',
  height: '100%',
  position: 'relative',
  border: '2px solid red',
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
