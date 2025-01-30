import { CSSProperties } from 'react';
import { Tag } from '../../types';
import {
  tooltipClass,
  tooltipLabelClass,
  tooltipEmphasizedLabelClass,
  tooltipNotEmphasizedLabelClass,
} from './styles';
import {
  convertMillisecondsToMinutesAndSeconds,
  findToolForTag,
} from '../Plan/utils';
import { cx } from '../../../styled-system/css';

type Props = {
  tag: Tag;
  style?: CSSProperties;
};

type LabelProps = {
  children: React.ReactNode;
  style?: CSSProperties;
};

type EmphasizedLabelProps = LabelProps & {
  isEmphasized?: boolean;
};

function TooltipLabel(props: LabelProps) {
  return (
    <span style={{ ...props.style }} className={tooltipLabelClass}>
      {props.children}
    </span>
  );
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
  const tool = findToolForTag(props.tag.tagId);
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

    const heightString = `${Number(props.tag.position.z).toFixed(2)}`;
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
      <TooltipLabel style={{ display: 'flex', justifyContent: 'center' }}>
        {tool?.name}
        {`(${props.tag.tagId})`}
      </TooltipLabel>
      <br />
      <TooltipLabel>
        Last seen: {minutes} min {seconds} s
      </TooltipLabel>

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
