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

export const newSidebarBoxStyles = css({
  flex: '1',
  mb: 'basePy',
  px: 'basePx',
  py: 'basePy',
  backgroundColor: 'background.light',
  color: 'text.primary',
  _last: { mb: 0 },
  boxShadow: '0 0 .625rem #00000026',
});

export const newSidebarLabel = css({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: 'text.highlighted',
  textTransform: 'uppercase',
  marginBottom: '16px',
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


export const secondaryLabel = css({
  fontSize: '0.8rem',
  color: 'text.secondary'
});

export const primarySidebarLabel = css({
  fontSize: '0.9rem',
  color: 'text.primary'
});

export const loadingStyle = css({
  padding: 50,
  borderRadius: 4,
  width: '100%',
  height: '200px',
  display: 'flex',
  justifyContent: 'center',
})


export const iconLabel = css({
  fontSize: '0.8rem',
  color: 'text.secondary',
});
