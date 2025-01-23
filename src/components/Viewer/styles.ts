import { css } from '../../../styled-system/css';
import { TAG_SIZE } from '../../constants/consts';

export const viewerWrapClass = css({
  width: "100%",
  height: `calc(100% - 200px)`,
  position: "relative",
  border: '2px solid red',
});

export const tagClass = css({
  position: "absolute",
  width: `${TAG_SIZE}px`,
  height: `${TAG_SIZE}px`,
  backgroundColor: "viewer.tag",
  borderRadius: "50%",
  zIndex: 1,
});

export const anchorClass = css({
  position: "absolute",
  zIndex: 1,
  height: "5px",
  width: "5px",
  backgroundColor: 'viewer.anchor',
  borderRadius: "50%",
});

