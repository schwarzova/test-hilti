import { type ThemeConfig } from 'antd';

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#595959', // Neutral grey as the primary color
    colorBgBase: '#141414', // Background color
    colorTextBase: '#ffffff', // Primary text color
    colorBorder: '#424242', // Border color

    colorBgContainer: '#1f1f1f', // Input background
    colorTextPlaceholder: '#bfbfbf', // Placeholder text
    colorBgElevated: '#262626', // DatePicker dropdown bg
    colorTextSecondary: '#bfbfbf', // Secondary text color
    colorBorderSecondary: '#303030', // Secondary borders
    colorFillAlter: '#2a2a2a', // Hover background
    colorFillContent: '#595959', // Selected date bg changed to grey

    // buttons
    colorPrimaryHover: '#4d4d4d', // Darker on hover
    colorPrimaryActive: '#404040', // Even darker when clicked (focused)
    colorPrimaryText: '#ffffff', // Keep contrast
    colorPrimaryBorder: '#8c8c8c', // Border in a neutral grey
    controlItemBgActive: '#0f0f0f', // Darker background for selected time

    // Picker's link buttons (Date Picker / Time Picker)
    colorLink: '#ff0000',
    colorLinkHover: '#ff3333',
    colorLinkActive: '#cc0000',

    // Type
    colorSuccess: '#52c41a', // Success messages
    colorWarning: '#faad14', // Warnings
    colorError: '#ff4d4f', // Errors
  },
};
