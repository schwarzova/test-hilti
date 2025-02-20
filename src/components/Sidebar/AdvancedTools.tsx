import { Alert, Button, Divider, Flex } from 'antd';
import {
  newSidebarBoxStyles,
  newSidebarLabel,
  secondaryLabel,
  primarySidebarLabel,
  iconLabel,
} from './styles';
import { Tool } from '../../types';
import { HardHat, LocateFixed } from 'lucide-react';
import { ICON_COLOR_DARK } from '../../constants/consts';
import { Tag as TagIcon } from 'lucide-react';
import ToolImage from './ToolImage';
import Spinner from '../Spinner';

type Props = {
  isFetching: boolean;
  tools: Tool[];
  onToolClick: (tagId: string) => void;
};

function AdvancedTools(props: Props) {
  function renderBody() {
    if (props.isFetching) {
      return <Spinner />;
    }

    if (props.tools.length === 0) {
      return <Alert message="No tools are loaded yet" type="info" showIcon />;
    }

    return (
      <Flex gap="middle" vertical>
        {props.tools.map((tool, index) => (
          <div style={{}} key={tool.id}>
            <Flex>
              <ToolImage src={tool.imgUrl} alt={tool.name} />

              <Flex gap={1} vertical style={{ width: '100%' }}>
                <span className={primarySidebarLabel}>{tool.name}</span>
                <span
                  className={secondaryLabel}
                  style={{ marginBottom: '8px' }}
                >
                  {tool.model}
                </span>
                <div style={{ width: '100%' }}>
                  <Flex>
                    <Flex gap="2px" align="center">
                      <TagIcon size="14px" color={ICON_COLOR_DARK} />
                      <span className={iconLabel}>{tool.tagId}</span>
                    </Flex>
                    <Divider type="vertical" style={{ height: '20px' }} />
                    <Flex gap="2px" align="center">
                      <HardHat size="16px" color={ICON_COLOR_DARK} />
                      <span className={iconLabel}>{tool.runTime}</span>
                    </Flex>
                  </Flex>
                  <Flex
                    style={{
                      width: '100%',
                      justifyContent: 'end',
                      marginTop: '8px',
                    }}
                  >
                    <Button
                      onClick={() => props.onToolClick(tool.tagId)}
                      style={{ minWidth: '100px', width: '100px' }}
                      size="small"
                      icon={
                        <LocateFixed size="16px" style={{ marginTop: '2px' }} />
                      }
                    >
                      Localize
                    </Button>
                  </Flex>
                </div>
              </Flex>
            </Flex>

            {index !== props.tools.length - 1 && (
              <Divider
                type="horizontal"
                style={{ width: '100%', margin: '8px 0px' }}
              />
            )}
          </div>
        ))}
      </Flex>
    );
  }
  return (
    <div className={newSidebarBoxStyles}>
      <h3 className={newSidebarLabel}>Available tools</h3>
      {renderBody()}
    </div>
  );
}

export default AdvancedTools;
