import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VisualizationStep } from '../../types';
import CallStackVisualization from './CallStackVisualization';
import MemoryVisualization from './MemoryVisualization';
import ControlFlowVisualization from './ControlFlowVisualization';
import DataStructureVisualization from './DataStructureVisualization';
import './EnhancedVisualizationPanel.css';

interface EnhancedVisualizationPanelProps {
  steps: VisualizationStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
  isExecuting: boolean;
  codeLines: string[];
}

const EnhancedVisualizationPanel: React.FC<EnhancedVisualizationPanelProps> = ({
  steps,
  currentStep,
  onStepChange,
  isExecuting,
  codeLines,
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'stack' | 'memory' | 'flow' | 'data'>('timeline');
  const [isPlaying, setIsPlaying] = useState(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStepData = steps[currentStep] || null;

  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      playIntervalRef.current = setInterval(() => {
        if (currentStep < steps.length - 1) {
          onStepChange(currentStep + 1);
        } else {
          setIsPlaying(false);
        }
      }, 1500); // 1.5 seconds per step
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
      }
    }

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, [isPlaying, currentStep, steps.length, onStepChange]);

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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStep = parseInt(event.target.value);
    onStepChange(newStep);
    if (isPlaying) setIsPlaying(false);
  };

  if (isExecuting) {
    return (
      <div className="enhanced-visualization-panel">
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
      <div className="enhanced-visualization-panel">
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
    <div className="enhanced-visualization-panel">
      <div className="visualization-header">
        <h3>Enhanced Visualization</h3>
        <div className="step-counter">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="visualization-tabs">
        <button
          className={`tab-button ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          Timeline
        </button>
        <button
          className={`tab-button ${activeTab === 'stack' ? 'active' : ''}`}
          onClick={() => setActiveTab('stack')}
        >
          Call Stack
        </button>
        <button
          className={`tab-button ${activeTab === 'memory' ? 'active' : ''}`}
          onClick={() => setActiveTab('memory')}
        >
          Memory
        </button>
        <button
          className={`tab-button ${activeTab === 'flow' ? 'active' : ''}`}
          onClick={() => setActiveTab('flow')}
        >
          Control Flow
        </button>
        <button
          className={`tab-button ${activeTab === 'data' ? 'active' : ''}`}
          onClick={() => setActiveTab('data')}
        >
          Data Structures
        </button>
      </div>

      {/* Timeline Scrubber */}
      <div className="timeline-scrubber-container">
        <input
          type="range"
          min="0"
          max={steps.length - 1}
          value={currentStep}
          onChange={handleSliderChange}
          className="timeline-scrubber"
        />
        <div className="scrubber-labels">
          <span>0</span>
          <span>{steps.length - 1}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="playback-controls">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="nav-button prev-button"
        >
          ⏮ Previous
        </button>
        <button
          onClick={handlePlayPause}
          className="play-pause-button"
          disabled={currentStep === steps.length - 1 && !isPlaying}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="nav-button next-button"
        >
          Next ⏭
        </button>
      </div>

      {/* Tab Content */}
      <div className="visualization-content">
        <AnimatePresence mode="wait">
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="tab-content"
            >
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
                        <motion.div
                          key={key}
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="variable-item"
                        >
                          <span className="variable-name">{key}:</span>
                          <span className="variable-value">
                            {typeof value === "object"
                              ? JSON.stringify(value, null, 2)
                              : String(value)}
                          </span>
                        </motion.div>
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
            </motion.div>
          )}

          {activeTab === 'stack' && (
            <motion.div
              key="stack"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="tab-content"
            >
              <CallStackVisualization
                stackFrames={currentStepData?.stackFrames || []}
              />
            </motion.div>
          )}

          {activeTab === 'memory' && (
            <motion.div
              key="memory"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="tab-content"
            >
              <MemoryVisualization
                memoryObjects={currentStepData?.memoryObjects || []}
                variableStates={currentStepData?.variableStates || {}}
              />
            </motion.div>
          )}

          {activeTab === 'flow' && (
            <motion.div
              key="flow"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="tab-content"
            >
              <ControlFlowVisualization
                controlFlow={currentStepData?.controlFlow || []}
                codeLines={codeLines}
                currentLine={currentStepData?.lineHighlight}
              />
            </motion.div>
          )}

          {activeTab === 'data' && (
            <motion.div
              key="data"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="tab-content"
            >
              <DataStructureVisualization
                dataStructures={currentStepData?.dataStructures || []}
                variableStates={currentStepData?.variableStates || {}}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedVisualizationPanel;

