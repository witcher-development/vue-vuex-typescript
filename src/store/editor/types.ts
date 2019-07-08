interface EditorState {
  settings: Settings;
  texts: Text[];
}

interface Settings {
  defaultColor: string;
  defaultStyle: string;
}

interface Text {
  text: string;
  color: string;
  style: string;
}

export {
  EditorState,
  Settings,
  Text,
};
