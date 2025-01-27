import { RefObject, useRef } from 'react';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';

let viewerRef: RefObject<ReactSVGPanZoom> | null = null;

export const useViewerRef = () => {
  const ref = useRef<ReactSVGPanZoom>(null);

  if (!viewerRef) {
    viewerRef = ref;
  }

  return viewerRef;
};
