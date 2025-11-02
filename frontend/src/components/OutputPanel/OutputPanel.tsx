import React from "react";
import "./OutputPanel.css";

interface OutputPanelProps {
  output: string;
  error?: string;
  isExecuting: boolean;
  executionTime?: number;
}

const OutputPanel: React.FC<OutputPanelProps> = ({
  output,
  error,
  isExecuting,
  executionTime,
}) => {
  return (
    <div className="output-panel">
      <div className="output-header">
        <h3>Output</h3>
        {executionTime !== undefined && (
          <span className="execution-time">Executed in {executionTime}ms</span>
        )}
      </div>
      <div className="output-content">
        {isExecuting ? (
          <div className="output-loading">
            <div className="spinner-small"></div>
            <span>Executing code...</span>
          </div>
        ) : error ? (
          <div className="output-error">
            <span className="error-icon">⚠️</span>
            <pre>{error}</pre>
          </div>
        ) : output ? (
          <pre className="output-text">{output}</pre>
        ) : (
          <div className="output-empty">
            <p>No output yet. Run your code to see the results here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
