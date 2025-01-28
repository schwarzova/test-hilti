import { Anchor, Tag } from '../../types';

type Props = {
  tag: Tag;
  anchors: Anchor[];
};

function LinesOfSight(props: Props) {
  const anchorIds = props.tag.los.split(/(?=a)/);

  return (
    <>
      {anchorIds.map((anchorId) => {
        const realId = 'Anchor ' + anchorId.slice(1);
        const anchor = props.anchors.find((a) => a.id === realId);
        if (anchor) {
          const x = props.tag.position.x;
          const y = props.tag.position.y;
          const xi = anchor.x;
          const yi = anchor.y;

          const dx = xi - x;
          const dy = yi - y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);

          return (
            <div
              style={{
                position: 'absolute',
                height: '1px',
                backgroundColor: 'black',
                left: `${x}px`,
                top: `${y}px`,
                width: `${length}px`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: '0 0',
              }}
            />
            // <line
            //   x1={props.tag.position.x}
            //   y1={props.tag.position.y}
            //   x2={anchor.x}
            //   y2={anchor.y}
            //   stroke="black"
            //   stroke-width="2"
            // ></line>
          );
        }
        return null;
      })}
    </>
  );
}

export default LinesOfSight;
