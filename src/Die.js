export default function Die(props) {
  return (
    <p
      className="die"
      style={{ backgroundColor: props.isHeld ? "#59E391" : "white" }}
      onClick={props.toggleHold}
    >
      {props.children}
    </p>
  );
}
