import { Plan } from '../../types';
import Spinner from '../Spinner';
import { listItemStyles, listWrapStyles, selectBtnStyles } from './styles';

type Props = {
  isFetching: boolean;
  onPlansLoad: () => void;
  onPlanSelect: (plan: Plan) => void;

  plans: Plan[];
};

function PlanSelection(props: Props) {
  if (props.isFetching) {
    return <Spinner />;
  }

  if (props.plans.length === 0) {
    return (
      <button className={selectBtnStyles} onClick={props.onPlansLoad}>
        Select Plan
        <div>+</div>
      </button>
    );
  }

  return (
    <div className={listWrapStyles}>
      <ul>
        {props.plans.map((p) => (
          <li key={p.id} className={listItemStyles}>
            <button onClick={() => props.onPlanSelect(p)}>{p.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlanSelection;
