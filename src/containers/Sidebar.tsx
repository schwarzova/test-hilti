import { css } from '../../styled-system/css';
import { getConvertedTags } from '../components/Plan/selectors';
import { usePlanStore } from '../components/Plan/store';
import AdvancedTools from '../components/Sidebar/AdvancedTools';

import { useSidebarStore } from '../components/Sidebar/store';
import Tasks from '../components/Sidebar/Tasks';
import { TAG_SELECTION_PADDING } from '../constants/consts';
import { useViewerRef } from '../hooks/useViewerRef';

const sidebarStyles = css({
  width: '20%',
  display: 'flex',
  flexDir: 'column',
});

function Sidebar() {
  const viewerRef = useViewerRef();
  const isFetchingTools = useSidebarStore((state) => state.isFetchingTools);
  const tools = useSidebarStore((state) => state.tools);
  const selectedPLan = usePlanStore((state) => state.selectedPlan);
  const tags = usePlanStore(getConvertedTags);

  function handleLocateTool(tagId: string) {
    const toolTag = tags.find((t) => t.tagId === tagId);

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
      <Tasks displayData={Boolean(selectedPLan)} isFetching={isFetchingTools} />
      <AdvancedTools
        isFetching={isFetchingTools}
        onToolClick={handleLocateTool}
        tools={tools}
      />
    </div>
  );
}

export default Sidebar;
