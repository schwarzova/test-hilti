import { css } from '../../../styled-system/css';

export const viewerWrapClass = css({
  width: '100%',
  height: '100%',
  position: 'relative',
});

export const tagClass = css({
  zIndex: 1,
  position: 'absolute',
  width: 'tagSize',
  height: 'tagSize',
  backgroundColor: 'viewer.tag',
  borderRadius: '50%',
});

export const tagErrorClass = css({
  zIndex: 0,
  borderColor: 'viewer.tag',
  opacity: 0.2,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export const anchorClass = css({
  position: 'absolute',
  zIndex: 1,
  height: 'anchorSize',
  width: 'anchorSize',
  backgroundColor: 'viewer.anchor',
  borderRadius: '50%',
});

export const anchorLabelClass = css({
  fontSize: '10px',
  position: 'absolute',
  color: 'viewer.anchor',
});

export const tagLabelClass = css({
  fontSize: '10px',
  position: 'relative',
  color: 'viewer.tag',
  bottom: '10px',
  left: '14px',
});

export const tooltipClass = css({
  position: 'absolute',
  backgroundColor: 'background.tooltip',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '5px',
  pointerEvents: 'none',
  transformOrigin: 'top left',
  zIndex: 999999,
});

export const measuredPointClass = css({
  position: 'absolute',
  zIndex: 1,
  height: 'referencePoint',
  width: 'referencePoint',
  backgroundColor: 'viewer.measuredPoint',
  borderRadius: '50%',
});

export const groundTruthPointClass = css({
  height: 'groundTruthPoint',
  width: 'groundTruthPoint',
  backgroundColor: 'viewer.groundTruthPoint',
});

export const measuredPointLabelClass = css({
  fontSize: '10px',
  position: 'absolute',
  color: 'viewer.groundTruthPoint',
});

export const tooltipLabelClass = css({
  display: 'flex',
  paddingBottom: '4px',
});

export const advancedTooltipLabelClass = css({
  display: 'flex',
});

export const tooltipEmphasizedLabelClass = css({
  color: 'text.highlighted',
});

export const tooltipNotEmphasizedLabelClass = css({
  fontStyle: 'normal',
  marginLeft: '2px',
});

export const tagImageClass = css({
  zIndex: 1,
  position: 'absolute',
  height: 'auto',
  width: '20px',
});

export const lineOfSightClass = css({
  position: 'absolute',
  height: '1px',
  backgroundColor: 'viewer.lineOfSight',
  transformOrigin: '0 0',
});
