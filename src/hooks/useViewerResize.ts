import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import { usePlanStore } from '../components/Plan/store';
import { useViewerRef } from './useViewerRef';

export function useViewerResize() {
  const viewerRef = useViewerRef();
  const svgScaleX = usePlanStore((state) => state.svgScaleX);
  const setSvgScale = usePlanStore((state) => state.setSvgScale);

  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

  function handleResize() {
    const svgEl = document.getElementsByClassName('injected-svg')[0];
    if (svgEl && originalWidth && originalHeight) {
      const newWidth = svgEl.getBoundingClientRect().width;
      const newHeight = svgEl.getBoundingClientRect().height;
      setSvgScale(newWidth / originalWidth, newHeight / originalHeight);
    }
  }

  // wait for 2s until svg is resized
  const handleResizeDebounced = debounce(handleResize, 2000);

  useEffect(() => {
    window.addEventListener('resize', handleResizeDebounced);

    return () => window.removeEventListener('resize', handleResizeDebounced);
  }, [handleResizeDebounced]);

  function resizeInitialSvg() {
    const svgEl = document.getElementsByClassName('injected-svg')[0];

    if (svgScaleX === 1 && svgEl) {
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

  return { resizeInitialSvg };
}
