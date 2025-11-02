import React, { useState, useEffect } from "react";
import { SupportedLanguage, VisualizationStep } from "../../types";
import {
  DEFAULT_CODE_TEMPLATES,
  LANGUAGE_OPTIONS,
} from "../../utils/languageConfig";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import CodeEditor from "../CodeEditor/CodeEditor";
import EnhancedVisualizationPanel from "../VisualizationPanel/EnhancedVisualizationPanel";
import OutputPanel from "../OutputPanel/OutputPanel";
import apiService from "../../services/api";
import "./CodeVisualizer.css";

const CodeVisualizer: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(
    SupportedLanguage.PYTHON
  );
  const [code, setCode] = useState<string>(
    DEFAULT_CODE_TEMPLATES[SupportedLanguage.PYTHON]
  );
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [visualizationSteps, setVisualizationSteps] = useState<
    VisualizationStep[]
  >([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionTime, setExecutionTime] = useState<number | undefined>();
  const [highlightedLine, setHighlightedLine] = useState<number | undefined>();

  useEffect(() => {
    // Reset visualization when language changes
    setCode(DEFAULT_CODE_TEMPLATES[selectedLanguage]);
    setOutput("");
    setError("");
    setVisualizationSteps([]);
    setCurrentStep(0);
    setHighlightedLine(undefined);
  }, [selectedLanguage]);

  useEffect(() => {
    // Update highlighted line based on current visualization step
    if (visualizationSteps.length > 0 && visualizationSteps[currentStep]) {
      setHighlightedLine(visualizationSteps[currentStep].lineHighlight);
    } else {
      setHighlightedLine(undefined);
    }
  }, [currentStep, visualizationSteps]);

  const handleLanguageChange = (language: SupportedLanguage) => {
    setSelectedLanguage(language);
  };

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleExecute = async () => {
    if (!code.trim()) {
      setError("Please enter some code to execute.");
      return;
    }

    setIsExecuting(true);
    setError("");
    setOutput("");
    setVisualizationSteps([]);
    setCurrentStep(0);

    try {
      const response = await apiService.executeCode({
        code,
        language: selectedLanguage,
      });

      setIsExecuting(false);

      if (response.success) {
        setOutput(response.output || "");
        setExecutionTime(response.executionTime);
        if (response.visualizationSteps) {
          setVisualizationSteps(response.visualizationSteps);
          setCurrentStep(0);
        }
      } else {
        setError(response.error || "Execution failed");
      }
    } catch (err: any) {
      setIsExecuting(false);
      setError(err.message || "An unexpected error occurred");
    }
  };

  const handleVisualize = async () => {
    if (!code.trim()) {
      setError("Please enter some code to visualize.");
      return;
    }

    setIsExecuting(true);
    setError("");
    setOutput("");
    setVisualizationSteps([]);
    setCurrentStep(0);

    try {
      const response = await apiService.visualizeCode({
        code,
        language: selectedLanguage,
      });

      setIsExecuting(false);

      if (response.success) {
        setOutput(response.output || "");
        setExecutionTime(response.executionTime);
        if (
          response.visualizationSteps &&
          response.visualizationSteps.length > 0
        ) {
          setVisualizationSteps(response.visualizationSteps);
          setCurrentStep(0);
        } else {
          setError(
            "No visualization steps generated. The code may not be suitable for step-by-step visualization."
          );
        }
      } else {
        setError(response.error || "Visualization failed");
      }
    } catch (err: any) {
      setIsExecuting(false);
      setError(err.message || "An unexpected error occurred");
    }
  };

  const handleStepChange = (step: number) => {
    if (step >= 0 && step < visualizationSteps.length) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="code-visualizer">
      <div className="visualizer-controls">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
        <div className="action-buttons">
          <button
            className="btn btn-primary"
            onClick={handleExecute}
            disabled={isExecuting}
          >
            {isExecuting ? "Executing..." : "Execute Code"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleVisualize}
            disabled={isExecuting}
          >
            {isExecuting ? "Visualizing..." : "Visualize Code"}
          </button>
        </div>
      </div>

      <div className="visualizer-layout">
        <div className="editor-section">
          <CodeEditor
            code={code}
            language={selectedLanguage}
            onChange={handleCodeChange}
            highlightedLine={highlightedLine}
            readOnly={false}
          />
        </div>

        <div className="right-panel">
          <div className="visualization-section">
            <EnhancedVisualizationPanel
              steps={visualizationSteps}
              currentStep={currentStep}
              onStepChange={handleStepChange}
              isExecuting={isExecuting}
              codeLines={code.split('\n')}
            />
          </div>

          <div className="output-section">
            <OutputPanel
              output={output}
              error={error}
              isExecuting={isExecuting}
              executionTime={executionTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeVisualizer;
