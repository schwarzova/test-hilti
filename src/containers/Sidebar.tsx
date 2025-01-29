import { css } from '../../styled-system/css';

import { usePlanStore } from '../components/Plan/store';
import { transformPointWithScale } from '../components/Plan/utils';
import DailyRuntime from '../components/Sidebar/DailyRuntime';
import { useSidebarStore } from '../components/Sidebar/store';
import Tasks from '../components/Sidebar/Tasks';
import Tools from '../components/Sidebar/Tools';
import { TAG_SELECTION_PADDING } from '../constants/consts';
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
  const svgScaleX = usePlanStore((state) => state.svgScaleX);
  const svgScaleY = usePlanStore((state) => state.svgScaleY);
  const { transformMatrix } = usePlanStore((state) => state.parsedSvgData);

  function convertTags(tags: Tag[]): Tag[] {
    return tags.map<Tag>((t) => {
      const newPosition = transformPointWithScale(
        { x: t.position.x, y: t.position.y },
        transformMatrix,
        svgScaleX,
        svgScaleY,
      );

      return {
        ...t,
        position: {
          ...t.position,
          x: newPosition.x,
          y: newPosition.y,
        },
      };
    });
  }

  function handleLocateTool(tagId: string) {
    const convertedTags = convertTags(tags);
    const toolTag = convertedTags.find((t) => t.tagId === tagId);

    if (viewerRef?.current && toolTag) {
      viewerRef.current.fitSelection(
        toolTag.position.x - TAG_SELECTION_PADDING,
        toolTag.position.y - TAG_SELECTION_PADDING,
        TAG_SELECTION_PADDING * 2,
        TAG_SELECTION_PADDING * 2,
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
