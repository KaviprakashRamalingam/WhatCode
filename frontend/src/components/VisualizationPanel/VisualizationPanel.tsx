import React from "react";
import { VisualizationStep } from "../../types";
import "./VisualizationPanel.css";

interface VisualizationPanelProps {
  steps: VisualizationStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
  isExecuting: boolean;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  steps,
  currentStep,
  onStepChange,
  isExecuting,
}) => {
  const currentStepData = steps[currentStep] || null;

  const handlePrevious = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      onStepChange(currentStep + 1);
    }
  };

  if (isExecuting) {
    return (
      <div className="visualization-panel">
        <div className="visualization-header">
          <h3>Visualization</h3>
        </div>
        <div className="visualization-content loading-state">
          <div className="spinner"></div>
          <p>Generating visualization steps...</p>
        </div>
      </div>
    );
  }

  if (steps.length === 0) {
    return (
      <div className="visualization-panel">
        <div className="visualization-header">
          <h3>Visualization</h3>
        </div>
        <div className="visualization-content empty-state">
          <p>Click "Visualize Code" to see step-by-step execution</p>
        </div>
      </div>
    );
  }

  return (
    <div className="visualization-panel">
      <div className="visualization-header">
        <h3>Step-by-Step Visualization</h3>
        <div className="step-counter">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
      <div className="visualization-content">
        <div className="step-description">
          <h4>Step {currentStep + 1}</h4>
          <p>{currentStepData?.description || "No description available"}</p>
        </div>

        {currentStepData?.variableStates && (
          <div className="variable-states">
            <h4>Variable States</h4>
            <div className="variables-grid">
              {Object.entries(currentStepData.variableStates).map(
                ([key, value]) => (
                  <div key={key} className="variable-item">
                    <span className="variable-name">{key}:</span>
                    <span className="variable-value">
                      {typeof value === "object"
                        ? JSON.stringify(value, null, 2)
                        : String(value)}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {currentStepData?.output && (
          <div className="step-output">
            <h4>Output</h4>
            <pre>{currentStepData.output}</pre>
          </div>
        )}

        <div className="step-navigation">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="nav-button prev-button"
          >
            ← Previous
          </button>
          <div className="step-indicator">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => onStepChange(index)}
                className={`step-dot ${index === currentStep ? "active" : ""}`}
                title={`Go to step ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="nav-button next-button"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualizationPanel;
