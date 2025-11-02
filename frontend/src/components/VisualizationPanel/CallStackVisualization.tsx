import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StackFrame } from '../../types';
import './CallStackVisualization.css';

interface CallStackVisualizationProps {
  stackFrames: StackFrame[];
}

const CallStackVisualization: React.FC<CallStackVisualizationProps> = ({ stackFrames }) => {
  return (
    <div className="call-stack-visualization">
      <h4>Call Stack</h4>
      {stackFrames.length === 0 ? (
        <div className="empty-state">
          <p>No active function calls</p>
        </div>
      ) : (
        <div className="stack-container">
          <AnimatePresence>
            {stackFrames.map((frame, index) => (
              <motion.div
                key={`${frame.functionName}-${index}`}
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="stack-frame"
                style={{ zIndex: stackFrames.length - index }}
              >
                <div className="frame-header">
                  <span className="frame-name">{frame.functionName}</span>
                  <span className="frame-line">Line {frame.lineNumber}</span>
                </div>
                
                {Object.keys(frame.parameters).length > 0 && (
                  <div className="frame-section">
                    <strong>Parameters:</strong>
                    <div className="frame-variables">
                      {Object.entries(frame.parameters).map(([key, value]) => (
                        <div key={key} className="variable-item">
                          <span className="var-name">{key}:</span>
                          <span className="var-value">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {Object.keys(frame.localVariables).length > 0 && (
                  <div className="frame-section">
                    <strong>Local Variables:</strong>
                    <div className="frame-variables">
                      {Object.entries(frame.localVariables).map(([key, value]) => (
                        <div key={key} className="variable-item">
                          <span className="var-name">{key}:</span>
                          <span className="var-value">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {frame.returnValue !== undefined && (
                  <div className="frame-return">
                    <strong>Returns:</strong> <span>{String(frame.returnValue)}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default CallStackVisualization;

