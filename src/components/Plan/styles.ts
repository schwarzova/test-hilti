import { css } from '../../../styled-system/css';

export const selectBtnStyles = css({
  px: 'basePx',
  py: 'basePy',
  height: '100%',
  width: '100%',
  borderRadius: '10px',
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
  borderRadius: '10px',
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