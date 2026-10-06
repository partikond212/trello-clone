import { type Dispatch, type FC, type SetStateAction } from "react";
import { HexColorPicker } from "react-colorful";

type ColorPickerProps = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};
const ColorPicker: FC<ColorPickerProps> = ({ color, setColor }) => {
  return <HexColorPicker color={color} onChange={setColor} />;
};

export default ColorPicker;
