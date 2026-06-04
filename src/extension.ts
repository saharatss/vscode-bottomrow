import * as vscode from "vscode";

let enabled = true;
let decorationType: vscode.TextEditorDecorationType;

export function activate(context: vscode.ExtensionContext) {
  // vscode.window.showInformationMessage("Bottom Row extension is active");

  const goToLastLine = vscode.commands.registerCommand(
    "bottomrow.goToLastLine",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showWarningMessage("No active editor");
        return;
      }

      const doc = editor.document;
      const lastLineIndex = doc.lineCount - 1;
      const lastLine = doc.lineAt(lastLineIndex);
      const lastCharIndex = lastLine.text.length;

      const position = new vscode.Position(lastLineIndex, lastCharIndex);

      editor.selection = new vscode.Selection(position, position);
      editor.revealRange(
        new vscode.Range(position, position),
        vscode.TextEditorRevealType.InCenter,
      );
    },
  );

  const toggleBottomRow = vscode.commands.registerCommand(
    "bottomrow.toggle",
    () => {
      enabled = !enabled;

      vscode.window.showInformationMessage(
        `Bottom Row ${enabled ? "enabled" : "disabled"}`,
      );

      const editor = vscode.window.activeTextEditor;

      if (!enabled && editor) {
        editor.setDecorations(decorationType, []);
      }

      if (enabled) {
        update(editor);
      }
    },
  );

  context.subscriptions.push(goToLastLine, toggleBottomRow);

  const decorationType = vscode.window.createTextEditorDecorationType({
    after: {
      color: new vscode.ThemeColor("editorGhostText.foreground"),
      fontStyle: "italic",
    },
  });

  function update(editor?: vscode.TextEditor) {
    if (!editor) {
      return;
    }

    const doc = editor.document;
    if (doc.lineCount === 0) {
      return;
    }

    const visibleRange = editor.visibleRanges[0];
    if (!visibleRange) {
      return;
    }

    const fileLastLine =
      doc.lineAt(doc.lineCount - 1).text.trim() || "(empty line)";

    const bottomLine = Math.min(visibleRange.end.line, doc.lineCount - 1);

    const bottomText = doc.lineAt(bottomLine).text;

    const decoration: vscode.DecorationOptions = {
      range: new vscode.Range(
        bottomLine,
        bottomText.length,
        bottomLine,
        bottomText.length,
      ),
      renderOptions: {
        after: {
          contentText: ` ↓ Last: ${fileLastLine}`,
        },
      },
    };

    editor.setDecorations(decorationType, [decoration]);
  }

  context.subscriptions.push(
    decorationType,
    vscode.window.onDidChangeActiveTextEditor(update),
    vscode.window.onDidChangeTextEditorVisibleRanges((e) =>
      update(e.textEditor),
    ),
    vscode.workspace.onDidChangeTextDocument((e) => {
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.document === e.document) {
        update(editor);
      }
    }),
  );

  update(vscode.window.activeTextEditor);
}

export function deactivate() {}
