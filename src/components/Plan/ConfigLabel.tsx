import { ICON_COLOR_LIGHT } from '../../constants/consts';

type Props = {
  children?: React.ReactNode;
  bold?: boolean;
  secondary?: boolean;
};

function ConfigLabel(props: Props) {
  return (
    <span
      style={{
        fontWeight: props.bold ? 'bold' : undefined,
        color: props.secondary ? ICON_COLOR_LIGHT : undefined,
      }}
    >
      {props.children}
    </span>
  );
}

export default ConfigLabel;
