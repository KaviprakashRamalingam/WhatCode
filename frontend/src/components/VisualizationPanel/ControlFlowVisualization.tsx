import React, { useEffect, useRef } from 'react';
import { ControlFlow } from '../../types';
import * as d3 from 'd3';
import './ControlFlowVisualization.css';

interface ControlFlowVisualizationProps {
  controlFlow: ControlFlow[];
  codeLines: string[];
  currentLine?: number;
}

const ControlFlowVisualization: React.FC<ControlFlowVisualizationProps> = ({
  controlFlow,
  codeLines,
  currentLine,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || controlFlow.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = Math.max(400, codeLines.length * 40);
    svg.attr('width', width).attr('height', height);

    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Draw code lines
    const lineHeight = 35;
    codeLines.forEach((line, index) => {
      const y = index * lineHeight + lineHeight / 2;
      const isCurrentLine = currentLine === index + 1;

      g.append('text')
        .attr('x', 0)
        .attr('y', y)
        .attr('fill', isCurrentLine ? '#ffd54f' : '#666')
        .attr('font-size', '12px')
        .attr('font-weight', isCurrentLine ? 'bold' : 'normal')
        .text(`${index + 1}`);

      g.append('text')
        .attr('x', 30)
        .attr('y', y)
        .attr('fill', isCurrentLine ? '#ffd54f' : '#333')
        .attr('font-size', '12px')
        .attr('font-weight', isCurrentLine ? 'bold' : 'normal')
        .attr('font-family', 'monospace')
        .text(line.substring(0, 60));

      if (isCurrentLine) {
        g.append('rect')
          .attr('x', 25)
          .attr('y', y - 15)
          .attr('width', chartWidth - 25)
          .attr('height', lineHeight)
          .attr('fill', '#fff9c4')
          .attr('opacity', 0.3)
          .lower();
      }
    });

    // Draw control flow arrows
    const getColor = (type: string, condition?: boolean) => {
      switch (type) {
        case 'branch':
          return condition ? '#4caf50' : '#f44336';
        case 'loop':
          return '#2196f3';
        case 'return':
          return '#ff9800';
        case 'call':
          return '#9c27b0';
        default:
          return '#757575';
      }
    };

    controlFlow.forEach((flow) => {
      const fromY = (flow.fromLine - 1) * lineHeight + lineHeight / 2;
      const toY = (flow.toLine - 1) * lineHeight + lineHeight / 2;

      const startX = 200;
      const endX = 200;
      const curve = 50;

      const path = d3.path();
      path.moveTo(startX, fromY);
      path.bezierCurveTo(
        startX + curve,
        fromY,
        endX + curve,
        toY,
        endX,
        toY
      );

      g.append('path')
        .attr('d', path.toString())
        .attr('fill', 'none')
        .attr('stroke', getColor(flow.type, flow.condition))
        .attr('stroke-width', 2)
        .attr('marker-end', `url(#arrowhead-${flow.type})`);

      // Arrow marker
      if (!svg.select(`#arrowhead-${flow.type}`).node()) {
        const defs = svg.append('defs');
        defs
          .append('marker')
          .attr('id', `arrowhead-${flow.type}`)
          .attr('viewBox', '0 -5 10 10')
          .attr('refX', 15)
          .attr('refY', 0)
          .attr('markerWidth', 6)
          .attr('markerHeight', 6)
          .attr('orient', 'auto')
          .append('path')
          .attr('d', 'M0,-5L10,0L0,5')
          .attr('fill', getColor(flow.type, flow.condition));
      }

      // Flow label
      const midY = (fromY + toY) / 2;
      g.append('text')
        .attr('x', startX + curve + 5)
        .attr('y', midY)
        .attr('fill', getColor(flow.type, flow.condition))
        .attr('font-size', '10px')
        .attr('font-weight', 'bold')
        .text(flow.type.toUpperCase());
    });

    // Legend
    const legendData = [
      { type: 'sequential', label: 'Sequential', color: '#757575' },
      { type: 'branch', label: 'Branch (True/False)', color: '#4caf50' },
      { type: 'loop', label: 'Loop', color: '#2196f3' },
      { type: 'return', label: 'Return', color: '#ff9800' },
      { type: 'call', label: 'Function Call', color: '#9c27b0' },
    ];

    const legend = g
      .append('g')
      .attr('transform', `translate(${chartWidth - 150}, 10)`);

    legendData.forEach((item, index) => {
      const legendItem = legend
        .append('g')
        .attr('transform', `translate(0, ${index * 20})`);

      legendItem
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 20)
        .attr('y2', 0)
        .attr('stroke', item.color)
        .attr('stroke-width', 2);

      legendItem
        .append('text')
        .attr('x', 25)
        .attr('y', 4)
        .attr('font-size', '10px')
        .text(item.label);
    });
  }, [controlFlow, codeLines, currentLine]);

  if (controlFlow.length === 0) {
    return (
      <div className="control-flow-visualization">
        <h4>Control Flow</h4>
        <div className="empty-state">
          <p>No control flow information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="control-flow-visualization">
      <h4>Control Flow Diagram</h4>
      <div className="flow-container">
        <svg ref={svgRef} className="flow-svg"></svg>
      </div>
    </div>
  );
};

export default ControlFlowVisualization;

