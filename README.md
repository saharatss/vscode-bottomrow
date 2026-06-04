# Bottom Row

Bottom Row is a Visual Studio Code extension that displays the last line of the current file directly inside the editor while you scroll.

It was initially designed for log-tracking tasks, where keeping the newest visible line in view is more useful than repeatedly jumping to the end of the file.

Unlike the status bar, the last line is rendered as an inline decoration near the bottom of the visible editor area, making it easy to monitor how a log or file ends without scrolling all the way down.

## Features

- Displays the last line of the active file inside the editor.
- Updates automatically when the file changes.
- Updates as you scroll.
- Includes a command to jump directly to the last line of the current file.
- Includes a command to toggle the inline decoration on or off.
- Lightweight with no external dependencies.
- Works with any text-based file type supported by VS Code.

## Commands

- `BottomRow: Go to Last Line` moves the cursor to the end of the last line in the active editor.
- `BottomRow: Toggle Inline Decoration` enables or disables the inline last-line hint.

Open the Command Palette and search for `BottomRow` to run either command.

## How It Works

When you scroll through a file, Bottom Row:

1. Detects the bottom visible line in the editor.
2. Retrieves the last line of the current document.
3. Displays that line as an inline decoration near the bottom of the visible viewport.

Example:

```text
...
const data = processItems(items);

↓ Last: export default App;
```

## Usage

1. Open any text file in VS Code.
2. Scroll through the file to see the last line rendered near the bottom of the visible editor area.
3. Run `BottomRow: Toggle Inline Decoration` if you want to hide or restore the inline hint.
4. Run `BottomRow: Go to Last Line` to jump to the end of the file.

## Requirements

No additional requirements.

## Extension Settings

This extension currently does not contribute any custom settings.

## Release Notes

### 0.0.1

Initial release.

Features:

- Display the last line of the current file inside the editor.
- Automatic updates on scroll and document changes.

## Development

Build and package:

```bash
npm run compile
vsce package
code --install-extension bottomrow-0.0.1.vsix
```

## License

MIT
