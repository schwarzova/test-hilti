import { css } from '../../styled-system/css';
import { usePlanStore } from '../components/Plan/store';

import DailyRuntime from '../components/Sidebar/DailyRuntime';
import { useSidebarStore } from '../components/Sidebar/store';
import Tasks from '../components/Sidebar/Tasks';
import Tools from '../components/Sidebar/Tools';
import { TAG_ZOOM_SCALE } from '../constants/consts';
import { useViewerRef } from '../hooks/useViewerRef';
import { Point, Tag } from '../types';

const sidebarStyles = css({
  width: '20%',
  display: 'flex',
  flexDir: 'column',
});

function Sidebar() {
  const viewerRef = useViewerRef();
  const isFetchingTools = useSidebarStore((state) => state.isFetchingTools);
  const tools = useSidebarStore((state) => state.tools);
  // needed just for converting tags should be move to one place in future
  const tags = usePlanStore((state) => state.tags);
  const originOfTSL = usePlanStore((state) => state.parsedSvgData).originOfTSL;

  const originPoint: Point = {
    x: originOfTSL.xSvg,
    y: originOfTSL.ySvg,
  };

  function convertTags(tags: Tag[]): Tag[] {
    return tags.map<Tag>((t) => ({
      ...t,
      position: {
        ...t.position,
        x: t.position.x / 0.1 + originPoint.x,
        y: t.position.y / 0.1 + originPoint.y,
      },
    }));
  }

  function handleLocateTool(tagId: string) {
    const convertedTags = convertTags(tags);
    const toolTag = convertedTags.find((t) => t.tagId === tagId);
    const currentZoom = viewerRef?.current?.getValue().d;

    if (viewerRef && toolTag && currentZoom) {
      const scaleFactor = TAG_ZOOM_SCALE / currentZoom;
      viewerRef.current?.zoom(
        toolTag.position.x,
        toolTag.position.y,
        scaleFactor,
      );
    }
  }

  return (
    <div className={sidebarStyles}>
      <Tasks />
      <Tools
        isFetching={isFetchingTools}
        onToolClick={handleLocateTool}
        tools={tools}
      />
      <DailyRuntime />
    </div>
  );
}

export default Sidebar;
