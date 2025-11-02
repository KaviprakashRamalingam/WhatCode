import React from 'react';
import { motion } from 'framer-motion';
import { MemoryObject } from '../../types';
import './MemoryVisualization.css';

interface MemoryVisualizationProps {
  memoryObjects: MemoryObject[];
  variableStates: Record<string, any>;
}

const MemoryVisualization: React.FC<MemoryVisualizationProps> = ({
  memoryObjects,
  variableStates,
}) => {
  return (
    <div className="memory-visualization">
      <div className="memory-section">
        <h4>Heap / Memory Objects</h4>
        {memoryObjects.length === 0 && Object.keys(variableStates).length === 0 ? (
          <div className="empty-state">
            <p>No memory objects allocated</p>
          </div>
        ) : (
          <div className="memory-grid">
            {memoryObjects.map((obj, index) => (
              <motion.div
                key={obj.address}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="memory-object"
              >
                <div className="memory-address">{obj.address}</div>
                <div className="memory-type">{obj.type}</div>
                <div className="memory-value">
                  {typeof obj.value === 'object'
                    ? JSON.stringify(obj.value, null, 2)
                    : String(obj.value)}
                </div>
                {obj.references.length > 0 && (
                  <div className="memory-references">
                    <strong>References:</strong> {obj.references.join(', ')}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="variable-section">
        <h4>Variable States</h4>
        {Object.keys(variableStates).length === 0 ? (
          <div className="empty-state">
            <p>No variables defined</p>
          </div>
        ) : (
          <div className="variable-grid">
            {Object.entries(variableStates).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="variable-card"
              >
                <div className="var-name">{key}</div>
                <div className="var-value-card">
                  {typeof value === 'object'
                    ? JSON.stringify(value, null, 2)
                    : String(value)}
                </div>
                <div className="var-type">{typeof value}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryVisualization;

