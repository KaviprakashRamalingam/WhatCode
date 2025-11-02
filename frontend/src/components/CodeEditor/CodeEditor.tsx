import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { SupportedLanguage } from "../../types";
import { LANGUAGE_OPTIONS } from "../../utils/languageConfig";
import "./CodeEditor.css";

interface CodeEditorProps {
  code: string;
  language: SupportedLanguage;
  onChange: (value: string | undefined) => void;
  readOnly?: boolean;
  highlightedLine?: number;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language,
  onChange,
  readOnly = false,
  highlightedLine,
}) => {
  const editorRef = useRef<any>(null);

  const languageMode =
    LANGUAGE_OPTIONS.find((opt) => opt.value === language)?.mode || "plaintext";

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Configure editor options
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: "on",
      roundedSelection: false,
      scrollBeyondLastLine: false,
      readOnly: readOnly,
      automaticLayout: true,
    });
  };

  useEffect(() => {
    if (editorRef.current && highlightedLine) {
      // Highlight specific line
      const decorations = editorRef.current.deltaDecorations(
        [],
        [
          {
            range: {
              startLineNumber: highlightedLine,
              startColumn: 1,
              endLineNumber: highlightedLine,
              endColumn: 1000,
            },
            options: {
              isWholeLine: true,
              className: "highlighted-line",
              glyphMarginClassName: "highlighted-line-glyph",
            },
          },
        ]
      );
      return () => {
        editorRef.current?.deltaDecorations(decorations, []);
      };
    }
  }, [highlightedLine]);

  return (
    <div className="code-editor-container">
      <div className="code-editor-header">
        <span className="editor-title">Code Editor</span>
        {readOnly && <span className="read-only-badge">Read Only</span>}
      </div>
      <div className="code-editor-wrapper">
        <Editor
          height="100%"
          language={languageMode}
          value={code}
          onChange={onChange}
          onMount={handleEditorDidMount}
          theme="vs-light"
          options={{
            readOnly: readOnly,
            wordWrap: "on",
            lineNumbers: "on",
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
