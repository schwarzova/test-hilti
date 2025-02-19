import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import { usePlanStore } from '../components/Plan/store';
import { useViewerRef } from './useViewerRef';
import { useWindowSize } from '@react-hook/window-size';

export function useViewerResize() {
  const viewerRef = useViewerRef();
  const [windowWidth, windowHeight] = useWindowSize();
  const svgScaleX = usePlanStore((state) => state.svgScaleX);
  const setSvgScale = usePlanStore((state) => state.setSvgScale);

  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [planWidth, setPlanWidth] = useState(0);
  const [planHeight, setPlanHeight] = useState(0);

  const svgEl = document.getElementsByClassName('injected-svg')[0];

  useEffect(() => {
    resizeInitialSvg();
  }, [svgEl]);

  // wait for 200ms until svg is resized
  const handleRecalculateSvgScaleDebounced = debounce(
    handleRecalculateSvgScale,
    200,
  );

  useEffect(() => {
    const SIDEBAR_WIDTH = 0.8; // 80%
    const X_MARGIN = 45;
    const Y_MARGIN = 65;
    const BORDER = 2;

    setPlanWidth(windowWidth * SIDEBAR_WIDTH - X_MARGIN - BORDER);
    setPlanHeight(windowHeight - Y_MARGIN - BORDER);
    handleRecalculateSvgScaleDebounced();
  }, [windowHeight, windowWidth]);

  function handleRecalculateSvgScale() {
    if (svgEl && originalWidth && originalHeight) {
      const newWidth = svgEl.getBoundingClientRect().width;
      const newHeight = svgEl.getBoundingClientRect().height;
      setSvgScale(newWidth / originalWidth, newHeight / originalHeight);
    }
  }

  function resizeInitialSvg() {
    if (svgScaleX !== 1) return;

    if (svgEl) {
      let svgWidth = 0;
      let svgHeight = 0;

      if (!originalHeight || !originalWidth) {
        svgWidth = svgEl.getBoundingClientRect().width;
        setOriginalWidth(svgWidth);
        svgHeight = svgEl.getBoundingClientRect().height;
        setOriginalHeight(svgHeight);
      }

      svgEl.setAttribute('width', '100%');
      svgEl.setAttribute('height', '100%');
      svgEl.setAttribute('preserveAspectRatio', 'xMinYMin meet');

      const newWidth = svgEl.getBoundingClientRect().width;
      const newHeight = svgEl.getBoundingClientRect().height;
      setSvgScale(newWidth / svgWidth, newHeight / svgHeight);

      viewerRef?.current?.fitToViewer();
    }
  }

  return { planWidth, planHeight };
}
