import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import {
  parseSvg,
  convertZToMeters,
  transformPointWithScale,
  getDifferenceTime,
  findToolForTag,
  convertCmToPx,
} from '../utils';
import { Point, ReferencePoint, TransformMatrix } from '../../../types';
import { useSidebarStore } from '../../Sidebar/store';
import { MOCKED_TOOLS } from '../../../mocks/mocks';

beforeEach(() => {
  // tell vitest we use mocked time
  vi.useFakeTimers();
});

afterEach(() => {
  // restoring date after each test run
  vi.useRealTimers();
});

const emptySidebarStore = useSidebarStore.getState();

test('parseSvg', () => {
  // Optics Lab svg
  const svg = `<svg width="700" height="1000" viewBox="0 0 700 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
      <metadata>
    <gcp x_svg="120" y_svg="900" x_real="47.18034652317454" y_real="9.522255565784944" x_tls="-4.5" y_tls="0"/> <!--A2-->
    <gcp x_svg="570" y_svg="160" x_real="47.1804267397777" y_real="9.522210909960766" x_tls="0" y_tls="7.5"/> <!--A3-->
    <gcp x_svg="570" y_svg="900" x_real="47.18038608948719" y_real="9.5222946396311" x_tls="0" y_tls="0"/> <!--Origin and A1-->
  </metadata>
<g clip-path="url(#clip0_1_2)">
<rect width="700" height="1000" fill="white"/>
<rect x="1.5" y="1.5" width="697" height="997" fill="#D9D9D9" stroke="black" stroke-width="3"/>
<path d="M282.951 36.4545C282.951 39.5227 282.397 42.1742 281.289 44.4091C280.181 46.6439 278.661 48.3674 276.729 49.5795C274.798 50.7917 272.591 51.3977 270.11 51.3977C267.629 51.3977 265.423 50.7917 263.491 49.5795C261.559 48.3674 260.039 46.6439 258.931 44.4091C257.823 42.1742 257.269 39.5227 257.269 36.4545C257.269 33.3864 257.823 30.7348 258.931 28.5C260.039 26.2652 261.559 24.5417 263.491 23.3295C265.423 22.1174 267.629 21.5114 270.11 21.5114C272.591 21.5114 274.798 22.1174 276.729 23.3295C278.661 24.5417 280.181 26.2652 281.289 28.5C282.397 30.7348 282.951 33.3864 282.951 36.4545ZM279.542 36.4545C279.542 33.9356 279.121 31.8097 278.278 30.0767C277.444 28.3438 276.313 27.0322 274.883 26.142C273.462 25.2519 271.871 24.8068 270.11 24.8068C268.349 24.8068 266.753 25.2519 265.323 26.142C263.903 27.0322 262.771 28.3438 261.928 30.0767C261.095 31.8097 260.678 33.9356 260.678 36.4545C260.678 38.9735 261.095 41.0994 261.928 42.8324C262.771 44.5653 263.903 45.8769 265.323 46.767C266.753 47.6572 268.349 48.1023 270.11 48.1023C271.871 48.1023 273.462 47.6572 274.883 46.767C276.313 45.8769 277.444 44.5653 278.278 42.8324C279.121 41.0994 279.542 38.9735 279.542 36.4545ZM288.42 59.1818V29.1818H291.658V32.6477H292.056C292.302 32.2689 292.643 31.786 293.079 31.1989C293.524 30.6023 294.158 30.072 294.982 29.608C295.816 29.1345 296.942 28.8977 298.363 28.8977C300.2 28.8977 301.819 29.357 303.221 30.2756C304.622 31.1941 305.716 32.4962 306.502 34.1818C307.288 35.8674 307.681 37.8561 307.681 40.1477C307.681 42.4583 307.288 44.4612 306.502 46.1562C305.716 47.8419 304.627 49.1487 303.235 50.0767C301.843 50.9953 300.238 51.4545 298.42 51.4545C297.018 51.4545 295.896 51.2225 295.053 50.7585C294.21 50.285 293.562 49.75 293.107 49.1534C292.653 48.5473 292.302 48.0455 292.056 47.6477H291.772V59.1818H288.42ZM291.715 40.0909C291.715 41.7386 291.957 43.1922 292.44 44.4517C292.923 45.7017 293.628 46.6818 294.556 47.392C295.484 48.0928 296.621 48.4432 297.965 48.4432C299.367 48.4432 300.536 48.0739 301.474 47.3352C302.421 46.5871 303.131 45.5833 303.604 44.3239C304.087 43.0549 304.329 41.6439 304.329 40.0909C304.329 38.5568 304.092 37.1742 303.619 35.9432C303.155 34.7027 302.449 33.7225 301.502 33.0028C300.565 32.2737 299.386 31.9091 297.965 31.9091C296.602 31.9091 295.456 32.2547 294.528 32.946C293.6 33.6278 292.899 34.5843 292.425 35.8153C291.952 37.0369 291.715 38.4621 291.715 40.0909ZM322.283 29.1818V32.0227H310.977V29.1818H322.283ZM314.272 23.9545H317.624V44.75C317.624 45.697 317.762 46.4072 318.036 46.8807C318.32 47.3447 318.68 47.6572 319.116 47.8182C319.561 47.9697 320.03 48.0455 320.522 48.0455C320.891 48.0455 321.194 48.0265 321.431 47.9886C321.668 47.9413 321.857 47.9034 321.999 47.875L322.681 50.8864C322.454 50.9716 322.137 51.0568 321.729 51.142C321.322 51.2367 320.806 51.2841 320.181 51.2841C319.234 51.2841 318.306 51.0805 317.397 50.6733C316.497 50.2661 315.749 49.6458 315.153 48.8125C314.566 47.9792 314.272 46.928 314.272 45.6591V23.9545ZM327.326 51V29.1818H330.678V51H327.326ZM329.031 25.5455C328.377 25.5455 327.814 25.3229 327.34 24.8778C326.876 24.4328 326.644 23.8977 326.644 23.2727C326.644 22.6477 326.876 22.1127 327.34 21.6676C327.814 21.2225 328.377 21 329.031 21C329.684 21 330.243 21.2225 330.707 21.6676C331.18 22.1127 331.417 22.6477 331.417 23.2727C331.417 23.8977 331.18 24.4328 330.707 24.8778C330.243 25.3229 329.684 25.5455 329.031 25.5455ZM345.682 51.4545C343.636 51.4545 341.875 50.9716 340.398 50.0057C338.92 49.0398 337.784 47.7093 336.989 46.0142C336.193 44.3191 335.795 42.3826 335.795 40.2045C335.795 37.9886 336.203 36.0331 337.017 34.3381C337.841 32.6335 338.987 31.303 340.455 30.3466C341.932 29.3807 343.655 28.8977 345.625 28.8977C347.159 28.8977 348.542 29.1818 349.773 29.75C351.004 30.3182 352.012 31.1136 352.798 32.1364C353.584 33.1591 354.072 34.3523 354.261 35.7159H350.909C350.653 34.7216 350.085 33.8409 349.205 33.0739C348.333 32.2973 347.159 31.9091 345.682 31.9091C344.375 31.9091 343.229 32.25 342.244 32.9318C341.269 33.6042 340.507 34.5559 339.957 35.7869C339.418 37.0085 339.148 38.4432 339.148 40.0909C339.148 41.7765 339.413 43.2443 339.943 44.4943C340.483 45.7443 341.241 46.715 342.216 47.4062C343.201 48.0975 344.356 48.4432 345.682 48.4432C346.553 48.4432 347.344 48.2917 348.054 47.9886C348.764 47.6856 349.366 47.25 349.858 46.6818C350.35 46.1136 350.701 45.4318 350.909 44.6364H354.261C354.072 45.9242 353.603 47.0843 352.855 48.1165C352.116 49.1392 351.136 49.9536 349.915 50.5597C348.703 51.1562 347.292 51.4545 345.682 51.4545ZM374.616 34.0682L371.605 34.9205C371.416 34.4186 371.136 33.9309 370.767 33.4574C370.407 32.9744 369.915 32.5767 369.29 32.2642C368.665 31.9517 367.865 31.7955 366.889 31.7955C365.554 31.7955 364.441 32.1032 363.551 32.7188C362.67 33.3248 362.23 34.0966 362.23 35.0341C362.23 35.8674 362.533 36.5256 363.139 37.0085C363.745 37.4915 364.692 37.8939 365.98 38.2159L369.219 39.0114C371.17 39.4848 372.623 40.2093 373.58 41.1847C374.536 42.1506 375.014 43.3958 375.014 44.9205C375.014 46.1705 374.654 47.2879 373.935 48.2727C373.224 49.2576 372.23 50.0341 370.952 50.6023C369.673 51.1705 368.187 51.4545 366.491 51.4545C364.266 51.4545 362.424 50.9716 360.966 50.0057C359.508 49.0398 358.584 47.6288 358.196 45.7727L361.378 44.9773C361.681 46.1515 362.254 47.0322 363.097 47.6193C363.949 48.2064 365.062 48.5 366.435 48.5C367.997 48.5 369.238 48.1686 370.156 47.5057C371.084 46.8333 371.548 46.0284 371.548 45.0909C371.548 44.3333 371.283 43.6989 370.753 43.1875C370.223 42.6667 369.408 42.2784 368.31 42.0227L364.673 41.1705C362.675 40.697 361.207 39.9631 360.27 38.9688C359.342 37.965 358.878 36.7102 358.878 35.2045C358.878 33.9735 359.223 32.8845 359.915 31.9375C360.616 30.9905 361.567 30.2472 362.77 29.7074C363.982 29.1676 365.355 28.8977 366.889 28.8977C369.048 28.8977 370.743 29.3712 371.974 30.3182C373.215 31.2652 374.096 32.5152 374.616 34.0682ZM394.663 21.9091V51H391.31V21.9091H394.663ZM407.223 51.5114C405.84 51.5114 404.586 51.2509 403.459 50.7301C402.332 50.1998 401.437 49.4375 400.774 48.4432C400.111 47.4394 399.78 46.2273 399.78 44.8068C399.78 43.5568 400.026 42.5436 400.518 41.767C401.011 40.9811 401.669 40.3655 402.493 39.9205C403.317 39.4754 404.226 39.1439 405.22 38.9261C406.224 38.6989 407.232 38.5189 408.246 38.3864C409.571 38.2159 410.646 38.0881 411.47 38.0028C412.304 37.9081 412.91 37.7519 413.288 37.5341C413.677 37.3163 413.871 36.9375 413.871 36.3977V36.2841C413.871 34.8826 413.487 33.7936 412.72 33.017C411.963 32.2405 410.812 31.8523 409.268 31.8523C407.668 31.8523 406.413 32.2027 405.504 32.9034C404.595 33.6042 403.956 34.3523 403.587 35.1477L400.405 34.0114C400.973 32.6856 401.731 31.6534 402.678 30.9148C403.634 30.1667 404.676 29.6458 405.803 29.3523C406.939 29.0492 408.056 28.8977 409.155 28.8977C409.856 28.8977 410.661 28.983 411.57 29.1534C412.488 29.3144 413.374 29.6506 414.226 30.1619C415.088 30.6733 415.803 31.4451 416.371 32.4773C416.939 33.5095 417.223 34.892 417.223 36.625V51H413.871V48.0455H413.7C413.473 48.5189 413.094 49.0256 412.564 49.5653C412.034 50.1051 411.328 50.5644 410.447 50.9432C409.567 51.322 408.492 51.5114 407.223 51.5114ZM407.734 48.5C409.06 48.5 410.178 48.2396 411.087 47.7188C412.005 47.1979 412.696 46.5256 413.161 45.7017C413.634 44.8778 413.871 44.0114 413.871 43.1023V40.0341C413.729 40.2045 413.416 40.3608 412.933 40.5028C412.46 40.6354 411.911 40.7538 411.286 40.858C410.67 40.9527 410.069 41.0379 409.482 41.1136C408.904 41.1799 408.435 41.2367 408.075 41.2841C407.204 41.3977 406.39 41.5824 405.632 41.8381C404.884 42.0843 404.278 42.4583 403.814 42.9602C403.359 43.4527 403.132 44.125 403.132 44.9773C403.132 46.142 403.563 47.0227 404.425 47.6193C405.296 48.2064 406.399 48.5 407.734 48.5ZM423.796 51V21.9091H427.148V32.6477H427.433C427.679 32.2689 428.02 31.786 428.455 31.1989C428.9 30.6023 429.535 30.072 430.359 29.608C431.192 29.1345 432.319 28.8977 433.739 28.8977C435.576 28.8977 437.196 29.357 438.597 30.2756C439.999 31.1941 441.093 32.4962 441.879 34.1818C442.665 35.8674 443.058 37.8561 443.058 40.1477C443.058 42.4583 442.665 44.4612 441.879 46.1562C441.093 47.8419 440.004 49.1487 438.612 50.0767C437.219 50.9953 435.614 51.4545 433.796 51.4545C432.395 51.4545 431.272 51.2225 430.43 50.7585C429.587 50.285 428.938 49.75 428.484 49.1534C428.029 48.5473 427.679 48.0455 427.433 47.6477H427.035V51H423.796ZM427.092 40.0909C427.092 41.7386 427.333 43.1922 427.816 44.4517C428.299 45.7017 429.004 46.6818 429.933 47.392C430.861 48.0928 431.997 48.4432 433.342 48.4432C434.743 48.4432 435.913 48.0739 436.85 47.3352C437.797 46.5871 438.507 45.5833 438.981 44.3239C439.464 43.0549 439.705 41.6439 439.705 40.0909C439.705 38.5568 439.469 37.1742 438.995 35.9432C438.531 34.7027 437.826 33.7225 436.879 33.0028C435.941 32.2737 434.762 31.9091 433.342 31.9091C431.978 31.9091 430.832 32.2547 429.904 32.946C428.976 33.6278 428.275 34.5843 427.802 35.8153C427.328 37.0369 427.092 38.4621 427.092 40.0909Z" fill="black"/>
<circle cx="204" cy="305" r="5" fill="#0084FF"/>
</g>
</svg>
`;
  const referencePoints: ReferencePoint[] = [
    {
      xReal: 47.18034652317454,
      xSvg: 120,
      xTls: -4.5,
      yReal: 9.522255565784944,
      ySvg: 900,
      yTls: 0,
    },
    {
      xReal: 47.1804267397777,
      xSvg: 570,
      xTls: 0,
      yReal: 9.522210909960766,
      ySvg: 160,
      yTls: 7.5,
    },
    {
      xReal: 47.18038608948719,
      xSvg: 570,
      xTls: 0,
      yReal: 9.5222946396311,
      ySvg: 900,
      yTls: 0,
    },
  ];
  const realDistance = 7.776684121600581;
  const svgDistance = 740;
  const tlsDistance = 7.5;
  const scale = 0.01050903259675754;
  const transformMatrix = [
    99.99999999999999, 0, 570, 0, -98.66666666666667, 900,
  ];

  const result = {
    referencePoints,
    realDistance,
    svgDistance,
    tlsDistance,
    scale,
    transformMatrix,
  };
  expect(parseSvg(svg)).toEqual(result);
});

test('parseSvg - no gcp elements', () => {
  // Optics Lab svg without metadata
  const svg = `<svg width="700" height="1000" viewBox="0 0 700 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_2)">
<rect width="700" height="1000" fill="white"/>
<rect x="1.5" y="1.5" width="697" height="997" fill="#D9D9D9" stroke="black" stroke-width="3"/>
<path d="M282.951 36.4545C282.951 39.5227 282.397 42.1742 281.289 44.4091C280.181 46.6439 278.661 48.3674 276.729 49.5795C274.798 50.7917 272.591 51.3977 270.11 51.3977C267.629 51.3977 265.423 50.7917 263.491 49.5795C261.559 48.3674 260.039 46.6439 258.931 44.4091C257.823 42.1742 257.269 39.5227 257.269 36.4545C257.269 33.3864 257.823 30.7348 258.931 28.5C260.039 26.2652 261.559 24.5417 263.491 23.3295C265.423 22.1174 267.629 21.5114 270.11 21.5114C272.591 21.5114 274.798 22.1174 276.729 23.3295C278.661 24.5417 280.181 26.2652 281.289 28.5C282.397 30.7348 282.951 33.3864 282.951 36.4545ZM279.542 36.4545C279.542 33.9356 279.121 31.8097 278.278 30.0767C277.444 28.3438 276.313 27.0322 274.883 26.142C273.462 25.2519 271.871 24.8068 270.11 24.8068C268.349 24.8068 266.753 25.2519 265.323 26.142C263.903 27.0322 262.771 28.3438 261.928 30.0767C261.095 31.8097 260.678 33.9356 260.678 36.4545C260.678 38.9735 261.095 41.0994 261.928 42.8324C262.771 44.5653 263.903 45.8769 265.323 46.767C266.753 47.6572 268.349 48.1023 270.11 48.1023C271.871 48.1023 273.462 47.6572 274.883 46.767C276.313 45.8769 277.444 44.5653 278.278 42.8324C279.121 41.0994 279.542 38.9735 279.542 36.4545ZM288.42 59.1818V29.1818H291.658V32.6477H292.056C292.302 32.2689 292.643 31.786 293.079 31.1989C293.524 30.6023 294.158 30.072 294.982 29.608C295.816 29.1345 296.942 28.8977 298.363 28.8977C300.2 28.8977 301.819 29.357 303.221 30.2756C304.622 31.1941 305.716 32.4962 306.502 34.1818C307.288 35.8674 307.681 37.8561 307.681 40.1477C307.681 42.4583 307.288 44.4612 306.502 46.1562C305.716 47.8419 304.627 49.1487 303.235 50.0767C301.843 50.9953 300.238 51.4545 298.42 51.4545C297.018 51.4545 295.896 51.2225 295.053 50.7585C294.21 50.285 293.562 49.75 293.107 49.1534C292.653 48.5473 292.302 48.0455 292.056 47.6477H291.772V59.1818H288.42ZM291.715 40.0909C291.715 41.7386 291.957 43.1922 292.44 44.4517C292.923 45.7017 293.628 46.6818 294.556 47.392C295.484 48.0928 296.621 48.4432 297.965 48.4432C299.367 48.4432 300.536 48.0739 301.474 47.3352C302.421 46.5871 303.131 45.5833 303.604 44.3239C304.087 43.0549 304.329 41.6439 304.329 40.0909C304.329 38.5568 304.092 37.1742 303.619 35.9432C303.155 34.7027 302.449 33.7225 301.502 33.0028C300.565 32.2737 299.386 31.9091 297.965 31.9091C296.602 31.9091 295.456 32.2547 294.528 32.946C293.6 33.6278 292.899 34.5843 292.425 35.8153C291.952 37.0369 291.715 38.4621 291.715 40.0909ZM322.283 29.1818V32.0227H310.977V29.1818H322.283ZM314.272 23.9545H317.624V44.75C317.624 45.697 317.762 46.4072 318.036 46.8807C318.32 47.3447 318.68 47.6572 319.116 47.8182C319.561 47.9697 320.03 48.0455 320.522 48.0455C320.891 48.0455 321.194 48.0265 321.431 47.9886C321.668 47.9413 321.857 47.9034 321.999 47.875L322.681 50.8864C322.454 50.9716 322.137 51.0568 321.729 51.142C321.322 51.2367 320.806 51.2841 320.181 51.2841C319.234 51.2841 318.306 51.0805 317.397 50.6733C316.497 50.2661 315.749 49.6458 315.153 48.8125C314.566 47.9792 314.272 46.928 314.272 45.6591V23.9545ZM327.326 51V29.1818H330.678V51H327.326ZM329.031 25.5455C328.377 25.5455 327.814 25.3229 327.34 24.8778C326.876 24.4328 326.644 23.8977 326.644 23.2727C326.644 22.6477 326.876 22.1127 327.34 21.6676C327.814 21.2225 328.377 21 329.031 21C329.684 21 330.243 21.2225 330.707 21.6676C331.18 22.1127 331.417 22.6477 331.417 23.2727C331.417 23.8977 331.18 24.4328 330.707 24.8778C330.243 25.3229 329.684 25.5455 329.031 25.5455ZM345.682 51.4545C343.636 51.4545 341.875 50.9716 340.398 50.0057C338.92 49.0398 337.784 47.7093 336.989 46.0142C336.193 44.3191 335.795 42.3826 335.795 40.2045C335.795 37.9886 336.203 36.0331 337.017 34.3381C337.841 32.6335 338.987 31.303 340.455 30.3466C341.932 29.3807 343.655 28.8977 345.625 28.8977C347.159 28.8977 348.542 29.1818 349.773 29.75C351.004 30.3182 352.012 31.1136 352.798 32.1364C353.584 33.1591 354.072 34.3523 354.261 35.7159H350.909C350.653 34.7216 350.085 33.8409 349.205 33.0739C348.333 32.2973 347.159 31.9091 345.682 31.9091C344.375 31.9091 343.229 32.25 342.244 32.9318C341.269 33.6042 340.507 34.5559 339.957 35.7869C339.418 37.0085 339.148 38.4432 339.148 40.0909C339.148 41.7765 339.413 43.2443 339.943 44.4943C340.483 45.7443 341.241 46.715 342.216 47.4062C343.201 48.0975 344.356 48.4432 345.682 48.4432C346.553 48.4432 347.344 48.2917 348.054 47.9886C348.764 47.6856 349.366 47.25 349.858 46.6818C350.35 46.1136 350.701 45.4318 350.909 44.6364H354.261C354.072 45.9242 353.603 47.0843 352.855 48.1165C352.116 49.1392 351.136 49.9536 349.915 50.5597C348.703 51.1562 347.292 51.4545 345.682 51.4545ZM374.616 34.0682L371.605 34.9205C371.416 34.4186 371.136 33.9309 370.767 33.4574C370.407 32.9744 369.915 32.5767 369.29 32.2642C368.665 31.9517 367.865 31.7955 366.889 31.7955C365.554 31.7955 364.441 32.1032 363.551 32.7188C362.67 33.3248 362.23 34.0966 362.23 35.0341C362.23 35.8674 362.533 36.5256 363.139 37.0085C363.745 37.4915 364.692 37.8939 365.98 38.2159L369.219 39.0114C371.17 39.4848 372.623 40.2093 373.58 41.1847C374.536 42.1506 375.014 43.3958 375.014 44.9205C375.014 46.1705 374.654 47.2879 373.935 48.2727C373.224 49.2576 372.23 50.0341 370.952 50.6023C369.673 51.1705 368.187 51.4545 366.491 51.4545C364.266 51.4545 362.424 50.9716 360.966 50.0057C359.508 49.0398 358.584 47.6288 358.196 45.7727L361.378 44.9773C361.681 46.1515 362.254 47.0322 363.097 47.6193C363.949 48.2064 365.062 48.5 366.435 48.5C367.997 48.5 369.238 48.1686 370.156 47.5057C371.084 46.8333 371.548 46.0284 371.548 45.0909C371.548 44.3333 371.283 43.6989 370.753 43.1875C370.223 42.6667 369.408 42.2784 368.31 42.0227L364.673 41.1705C362.675 40.697 361.207 39.9631 360.27 38.9688C359.342 37.965 358.878 36.7102 358.878 35.2045C358.878 33.9735 359.223 32.8845 359.915 31.9375C360.616 30.9905 361.567 30.2472 362.77 29.7074C363.982 29.1676 365.355 28.8977 366.889 28.8977C369.048 28.8977 370.743 29.3712 371.974 30.3182C373.215 31.2652 374.096 32.5152 374.616 34.0682ZM394.663 21.9091V51H391.31V21.9091H394.663ZM407.223 51.5114C405.84 51.5114 404.586 51.2509 403.459 50.7301C402.332 50.1998 401.437 49.4375 400.774 48.4432C400.111 47.4394 399.78 46.2273 399.78 44.8068C399.78 43.5568 400.026 42.5436 400.518 41.767C401.011 40.9811 401.669 40.3655 402.493 39.9205C403.317 39.4754 404.226 39.1439 405.22 38.9261C406.224 38.6989 407.232 38.5189 408.246 38.3864C409.571 38.2159 410.646 38.0881 411.47 38.0028C412.304 37.9081 412.91 37.7519 413.288 37.5341C413.677 37.3163 413.871 36.9375 413.871 36.3977V36.2841C413.871 34.8826 413.487 33.7936 412.72 33.017C411.963 32.2405 410.812 31.8523 409.268 31.8523C407.668 31.8523 406.413 32.2027 405.504 32.9034C404.595 33.6042 403.956 34.3523 403.587 35.1477L400.405 34.0114C400.973 32.6856 401.731 31.6534 402.678 30.9148C403.634 30.1667 404.676 29.6458 405.803 29.3523C406.939 29.0492 408.056 28.8977 409.155 28.8977C409.856 28.8977 410.661 28.983 411.57 29.1534C412.488 29.3144 413.374 29.6506 414.226 30.1619C415.088 30.6733 415.803 31.4451 416.371 32.4773C416.939 33.5095 417.223 34.892 417.223 36.625V51H413.871V48.0455H413.7C413.473 48.5189 413.094 49.0256 412.564 49.5653C412.034 50.1051 411.328 50.5644 410.447 50.9432C409.567 51.322 408.492 51.5114 407.223 51.5114ZM407.734 48.5C409.06 48.5 410.178 48.2396 411.087 47.7188C412.005 47.1979 412.696 46.5256 413.161 45.7017C413.634 44.8778 413.871 44.0114 413.871 43.1023V40.0341C413.729 40.2045 413.416 40.3608 412.933 40.5028C412.46 40.6354 411.911 40.7538 411.286 40.858C410.67 40.9527 410.069 41.0379 409.482 41.1136C408.904 41.1799 408.435 41.2367 408.075 41.2841C407.204 41.3977 406.39 41.5824 405.632 41.8381C404.884 42.0843 404.278 42.4583 403.814 42.9602C403.359 43.4527 403.132 44.125 403.132 44.9773C403.132 46.142 403.563 47.0227 404.425 47.6193C405.296 48.2064 406.399 48.5 407.734 48.5ZM423.796 51V21.9091H427.148V32.6477H427.433C427.679 32.2689 428.02 31.786 428.455 31.1989C428.9 30.6023 429.535 30.072 430.359 29.608C431.192 29.1345 432.319 28.8977 433.739 28.8977C435.576 28.8977 437.196 29.357 438.597 30.2756C439.999 31.1941 441.093 32.4962 441.879 34.1818C442.665 35.8674 443.058 37.8561 443.058 40.1477C443.058 42.4583 442.665 44.4612 441.879 46.1562C441.093 47.8419 440.004 49.1487 438.612 50.0767C437.219 50.9953 435.614 51.4545 433.796 51.4545C432.395 51.4545 431.272 51.2225 430.43 50.7585C429.587 50.285 428.938 49.75 428.484 49.1534C428.029 48.5473 427.679 48.0455 427.433 47.6477H427.035V51H423.796ZM427.092 40.0909C427.092 41.7386 427.333 43.1922 427.816 44.4517C428.299 45.7017 429.004 46.6818 429.933 47.392C430.861 48.0928 431.997 48.4432 433.342 48.4432C434.743 48.4432 435.913 48.0739 436.85 47.3352C437.797 46.5871 438.507 45.5833 438.981 44.3239C439.464 43.0549 439.705 41.6439 439.705 40.0909C439.705 38.5568 439.469 37.1742 438.995 35.9432C438.531 34.7027 437.826 33.7225 436.879 33.0028C435.941 32.2737 434.762 31.9091 433.342 31.9091C431.978 31.9091 430.832 32.2547 429.904 32.946C428.976 33.6278 428.275 34.5843 427.802 35.8153C427.328 37.0369 427.092 38.4621 427.092 40.0909Z" fill="black"/>
<circle cx="204" cy="305" r="5" fill="#0084FF"/>
</g>
</svg>
`;

  expect(parseSvg(svg)).toEqual(null);
});

test('transformPoint', () => {
  const pointTls: Point = { x: 1, y: 1 };
  const transformMatrix: TransformMatrix = [1, 1, 1, 1, 1, 1];
  const svgScaleX = 1;
  const svgScaleY = 1;
  const pointSvg = { x: 3, y: 3 };

  expect(
    transformPointWithScale(pointTls, transformMatrix, svgScaleX, svgScaleY),
  ).toEqual(pointSvg);
});

test('getDifferenceTime', () => {
  const date = new Date(2025, 1, 16, 12);
  vi.setSystemTime(date);
  const tagTimeStamp = '2025-02-15 10:08:36.000000000';

  // access Date.now() will result in the date set above
  expect(getDifferenceTime(tagTimeStamp)).toEqual([1, 1, 51, 24]);
});

test('findToolForTag', () => {
  const tagId = '1111';
  vi.spyOn(useSidebarStore, 'getState').mockReturnValue({
    ...emptySidebarStore,
    tools: MOCKED_TOOLS,
  });
  const tool = MOCKED_TOOLS[2];

  expect(findToolForTag(tagId)).toEqual(tool);
});

test('convertCmToPx', () => {
  const errorCm = 10;
  const svgDistance = 2;
  const realDistance = 1;

  expect(convertCmToPx(errorCm, svgDistance, realDistance)).toEqual(0.2);
});

test('convertZToMeters', () => {
  const anchorOriginZTls = 2;
  const zTls = 0;
  const realDistance = 2;
  const tlsDistance = 1;

  expect(
    convertZToMeters(anchorOriginZTls, zTls, realDistance, tlsDistance),
  ).toEqual(4);
});
