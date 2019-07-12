interface EditorState {
	settings: Settings;
	texts: Text[];
}

interface Settings {
	defaultColor: number[];
	defaultStyle: string;
}

interface Text {
	text: string;
	color: string;
	style: string;
	edit?: boolean;
}

export {
	EditorState,
	Settings,
	Text,
};
