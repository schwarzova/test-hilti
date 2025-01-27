import { CSSProperties } from 'react';
import { Tag } from '../../types';
import {
  tooltipClass,
  tooltipLabelClass,
  tooltipEmphasizedLabelClass,
  tooltipNotEmphasizedLabelClass,
} from './styles';
import { convertMillisecondsToMinutesAndSeconds } from '../Plan/utils';
import { cx } from '../../../styled-system/css';

type Props = {
  tag: Tag;
  style?: CSSProperties;
};

type LabelProps = {
  children: React.ReactNode;
};

type EmphasizedLabelProps = LabelProps & {
  isEmphasized?: boolean;
};

function TooltipLabel(props: LabelProps) {
  return <span className={tooltipLabelClass}>{props.children}</span>;
}

function EmphasizedLabel(props: EmphasizedLabelProps) {
  return (
    <em
      className={cx(
        tooltipNotEmphasizedLabelClass,
        props.isEmphasized && tooltipEmphasizedLabelClass,
      )}
    >
      {props.children}
    </em>
  );
}

function TagTooltip(props: Props) {
  const time = new Date(Number(props.tag.timestamp)).getTime();
  const now = new Date().getTime();

  const [minutes, seconds] = convertMillisecondsToMinutesAndSeconds(now - time);

  function getHeight(): string {
    let special: string = '';
    if (props.tag.position.z < 0.3) {
      special = 'Ground';
    } else if (props.tag.position.z < 0.5) {
      special = 'Seating height';
    } else if (props.tag.position.z < 1) {
      special = 'Table height';
    } else if (props.tag.position.z > 2) {
      special = 'Ceiling';
    }

    const heightString = `${props.tag.position.z}`;
    if (special.length === 0) {
      return heightString;
    }

    return `${special} (${heightString})`;
  }

  return (
    <div
      className={tooltipClass}
      style={{
        ...props.style,
      }}
    >
      <TooltipLabel>{props.tag.tagId}</TooltipLabel>
      <br />
      <TooltipLabel>Last seen: {minutes} min</TooltipLabel>

      <TooltipLabel>Height: {getHeight()}</TooltipLabel>
      <TooltipLabel>
        Battery level:{' '}
        <EmphasizedLabel isEmphasized={props.tag.batteryLevel < 21}>
          {props.tag.batteryLevel}%
        </EmphasizedLabel>
      </TooltipLabel>
    </div>
  );
}

export default TagTooltip;
