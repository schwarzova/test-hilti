import { css } from '../../../styled-system/css';

export const sidebarBoxStyles = css({
  flex: '1',
  mb: 'basePy',
  px: 'basePx',
  py: 'basePy',
  backgroundColor: 'boxBg',
  borderRadius: '10px',
  textAlign: 'center',
  color: 'text.primary',
  _last: { mb: 0 },
});

export const listItemStyles = css({
  borderBottom: '1px solid #ccc',
  px: 'basePx',
  py: 'basePy',
  _last: {
    borderBottom: 'none',
  },
  _hover: {
    color: 'neutral.dark',
  },
});

export const listItemBtnStyles = css({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const toolImageStyles = css({
  height: 'auto',
  width: '60px',
  mr: 'basePx',
  ml: '-basePx',
});
