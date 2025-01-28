import { Tool } from '../../types';
import Spinner from '../Spinner';
import {
  listItemStyles,
  sidebarBoxStyles,
  listItemBtnStyles,
  toolImageStyles,
} from './styles';

type Props = {
  isFetching: boolean;
  tools: Tool[];
  onToolClick: (tagId: string) => void;
};

function Tools(props: Props) {
  if (props.isFetching) {
    return (
      <div className={sidebarBoxStyles}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={sidebarBoxStyles}>
      <h3>Available Tools</h3>
      <ul>
        {props.tools.map((t) => (
          <li key={t.id} className={listItemStyles}>
            <button
              className={listItemBtnStyles}
              onClick={() => props.onToolClick(t.tagId)}
            >
              <img src={t.imgUrl} alt={t.name} className={toolImageStyles} />
              {t.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tools;
