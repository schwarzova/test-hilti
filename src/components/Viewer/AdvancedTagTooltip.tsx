import { CSSProperties } from 'react';
import { PlanMode, Tag } from '../../types';
import {
  tooltipClass,
  tooltipEmphasizedLabelClass,
  tooltipNotEmphasizedLabelClass,
  advancedTooltipLabelClass,
} from './styles';
import {
  getDifferenceTime,
  findToolForTag,
  formatDateTime,
} from '../Plan/utils';
import { cx } from '../../../styled-system/css';
import {
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  Clock,
  Tag as TagIcon,
} from 'lucide-react';
import { ICON_COLOR_LIGHT } from '../../constants/consts';

type Props = {
  tag: Tag;
  style?: CSSProperties;
  planMode?: PlanMode;
};

type LabelProps = {
  children: React.ReactNode;
  style?: CSSProperties;
};

type EmphasizedLabelProps = LabelProps & {
  isEmphasized?: boolean;
};

type IconLabelProps = {
  label: React.ReactNode;
  icon: React.ReactNode;
};

function TooltipLabel(props: LabelProps) {
  return (
    <span style={{ ...props.style }} className={advancedTooltipLabelClass}>
      {props.children}
    </span>
  );
}

function IconLabel(props: IconLabelProps) {
  return (
    <li style={{ padding: '2px 0px', display: 'flex' }}>
      <span style={{ marginRight: '8px', marginTop: '0px' }}>{props.icon}</span>
      {props.label}
    </li>
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

type ImageProps = {
  src?: string;
};

function CircleImage(props: ImageProps) {
  const containerStyle: React.CSSProperties = {
    width: '128px',
    height: '128px',
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  };

  const imageStyle: React.CSSProperties = {
    width: '90px',
    height: '90px',
    objectFit: 'contain',
  };

  return (
    <div style={containerStyle}>
      <img src={props.src} alt="Tool image" style={imageStyle} />
    </div>
  );
}

function HeightImage(props: ImageProps) {
  const containerStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    marginRight: '8px',
  };

  const imageStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
  };

  return (
    <div style={containerStyle}>
      <img src={props.src} alt="height icon" style={imageStyle} />
    </div>
  );
}

function AdvancedTagTooltip(props: Props) {
  const tool = findToolForTag(props.tag.tagId);

  const iconSize = 24;

  function renderHeightIcon() {
    let imageName: string = 'level1';
    if (props.tag.position.z < 0.3) {
      imageName = 'level1';
    } else if (props.tag.position.z < 1.4) {
      imageName = 'level2';
    } else {
      imageName = 'level3';
    }

    return <HeightImage src={`/assets/${imageName}.svg`} />;
  }

  function getLatestTimeLabel() {
    const [days, hours, minutes] = getDifferenceTime(props.tag.timestamp);

    if (days > 0) {
      return `${days} days and ${hours} h ago`;
    }

    if (hours > 0) {
      return `${hours} h and ${minutes} min ago`;
    }

    return `${minutes} min ago`;
  }

  function renderBatteryIcon(batteryLevel: number) {
    const props = { size: iconSize + 4, color: ICON_COLOR_LIGHT };

    if (batteryLevel < 21) {
      return <BatteryLow {...props} />;
    }

    if (batteryLevel < 91) {
      return <BatteryMedium {...props} />;
    }

    return <BatteryFull {...props} />;
  }

  return (
    <div
      className={tooltipClass}
      style={{
        ...props.style,
        padding: '8px 20px 8px',
      }}
    >
      <TooltipLabel
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          paddingBottom: '12px',
        }}
      >
        {tool?.name}
      </TooltipLabel>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ paddingRight: '16px' }}>
          <CircleImage src={tool?.imgUrl} />
        </div>
        <div>
          <IconLabel
            icon={<TagIcon size={iconSize} color={ICON_COLOR_LIGHT} />}
            label={<TooltipLabel>{props.tag.tagId}</TooltipLabel>}
          />
          <IconLabel
            icon={renderBatteryIcon(props.tag.batteryLevel)}
            label={
              <EmphasizedLabel isEmphasized={props.tag.batteryLevel < 21}>
                {props.tag.batteryLevel} %
              </EmphasizedLabel>
            }
          />
          <IconLabel
            icon={<Clock size={iconSize} color={ICON_COLOR_LIGHT} />}
            label={
              <TooltipLabel>
                {props.planMode === 'latest'
                  ? getLatestTimeLabel()
                  : formatDateTime(props.tag.timestamp, true, true)}
              </TooltipLabel>
            }
          />
        </div>
      </div>

      <hr style={{ color: ICON_COLOR_LIGHT, margin: '8px 0px' }} />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {renderHeightIcon()}{' '}
        <TooltipLabel>
          Find this tool at the height of{' '}
          <span style={{ fontWeight: 'bold', marginLeft: '2px' }}>
            {Number(props.tag.position.z).toFixed(2)}m
          </span>
        </TooltipLabel>
      </div>
    </div>
  );
}

export default AdvancedTagTooltip;
