import { css } from '../../styled-system/css';
import { usePlanStore } from '../components/Plan/store';

import DailyRuntime from '../components/Sidebar/DailyRuntime';
import { useSidebarStore } from '../components/Sidebar/store';
import Tasks from '../components/Sidebar/Tasks';
import Tools from '../components/Sidebar/Tools';
import { useViewerRef } from '../hooks/useViewerRef';
import { Tag } from '../types';

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
  const originPoint = usePlanStore((state) => state.originPoint);

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
    const ZOOM_SCALE_TAG = 6;

    const currentZoom = viewerRef?.current?.getValue().d;
    if (viewerRef && toolTag && currentZoom && currentZoom < ZOOM_SCALE_TAG) {
      const scaleFactor = ZOOM_SCALE_TAG - currentZoom;
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
