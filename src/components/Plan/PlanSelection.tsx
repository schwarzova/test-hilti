import { css } from '../../../styled-system/css';
import { Plan } from '../../types';
import Spinner from '../Spinner';

const selectBtnStyles = css({
  px: 'basePx',
  py: 'basePy',
  height: '100%',
  width: '100%',
  borderRadius: '10px',
  display: 'flex',
  flexDir: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'boxBg',
  color: 'boxTitleColor',
  '&:hover': {
    bg: 'boxBgHover',
  },
});

const listWrapStyles = css({
  height: '100%',
  width: '100%',
  borderRadius: '10px',
  backgroundColor: 'boxBg',
  display: 'flex',
  flexDir: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'boxTitleColor',
});

const listItemStyles = css({
  borderBottom: '1px solid #ccc',
  px: 'basePx',
  py: 'basePy',
  _hover: {
    color: 'boxTitleColorHover',
  },
});

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
