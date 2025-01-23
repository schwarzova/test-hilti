import { css } from '../../../styled-system/css';
import { ANCHOR_SIZE, TAG_SIZE } from '../../constants/consts';

export const viewerWrapClass = css({
  width: "100%",
  height: '100%',
  position: "relative",
  border: '2px solid red',
});

export const tagClass = css({
  zIndex: 1,
  position: "absolute",
  width: TAG_SIZE + 'px',
  height:TAG_SIZE + 'px',
  backgroundColor: "viewer.tag",
  borderRadius: "50%",
});

export const anchorClass = css({
  position: "absolute",
  zIndex: 1,
  height: ANCHOR_SIZE + 'px',
  width:  ANCHOR_SIZE + 'px',
  backgroundColor: 'viewer.anchor',
  borderRadius: "50%",
});

