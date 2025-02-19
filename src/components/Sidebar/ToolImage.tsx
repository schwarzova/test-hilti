type Props = {
    src: string;
    alt: string;
}

function ToolImage(props: Props) {
  const containerStyle: React.CSSProperties = {
    width: '90px',
    height: '90px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: '12px',
  };

  const imageStyle: React.CSSProperties = {
    width: '90px',
    height: '90px',
    objectFit: 'contain',
  };

  return (
    <div style={containerStyle}>
      <img src={props.src} alt={props.alt} style={imageStyle} />
    </div>
  );

}

export default ToolImage;