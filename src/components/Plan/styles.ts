import { css } from '../../../styled-system/css';

export const selectBtnStyles = css({
  px: 'basePx',
  py: 'basePy',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDir: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'boxBg',
  color: 'text.primary',
  '&:hover': {
    bg: 'boxBgHover',
  },
});

export const listWrapStyles = css({
  height: '100%',
  width: '100%',
  backgroundColor: 'boxBg',
  display: 'flex',
  flexDir: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'text.primary',
});

export const listItemStyles = css({
  borderBottom: '1px solid #ccc',
  px: 'basePx',
  py: 'basePy',
  _hover: {
    color: 'neutral.dark',
  },
});

export const viewerBarStyles = css({
  backgroundColor: 'background.toolbar',
  borderRadius: '2px',
});

export const toolbar = css({
  position: 'absolute',
  top: ' 8px',
  right: '8px',
});

export const modeBar = css({
  position: 'absolute',
  bottom: ' 8px',
  right: '31px',
  padding: '4px 12px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
});

export const toolbarButton = css({
  marginBottom: '8px',
  height: '24px',
  width: '24px',
  color: 'white',
  _hover: {
    color: 'neutral.main',
  },
});

export const selectedToolbarButton = css({
  color: 'red',
  _hover: {
    color: 'text.highlighted',
  },
});

export const badgeStyle = css({
  backgroundColor: 'red',
  borderRadius: '25px',
  padding: '0px 10px',
  fontSize: 'small',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
});
