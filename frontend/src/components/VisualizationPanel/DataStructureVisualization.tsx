import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DataStructure } from "../../types";
import * as d3 from "d3";
import "./DataStructureVisualization.css";

interface DataStructureVisualizationProps {
  dataStructures: DataStructure[];
  variableStates: Record<string, any>;
}

const DataStructureVisualization: React.FC<DataStructureVisualizationProps> = ({
  dataStructures,
  variableStates,
}) => {
  const arrayRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<SVGSVGElement>(null);

  // Find arrays in variable states
  const arrays = Object.entries(variableStates).filter(([_, value]) =>
    Array.isArray(value)
  );

  useEffect(() => {
    // Render array visualization
    if (arrays.length > 0) {
      const root = arrayRef.current;
      if (!root) return;

      root.innerHTML = "";
      arrays.forEach(([name, arr]: [string, any[]]) => {
        const container = document.createElement("div");
        container.className = "array-container";
        container.innerHTML = `<strong>${name}:</strong>`;

        const barContainer = document.createElement("div");
        barContainer.className = "array-bars";

        arr.forEach((value, index) => {
          const bar = document.createElement("div");
          bar.className = "array-bar";
          const height = typeof value === "number" ? Math.abs(value) * 20 : 40;
          bar.style.height = `${Math.min(height, 200)}px`;
          bar.style.width = `${400 / arr.length}px`;
          bar.innerHTML = `<span>${value}</span>`;
          barContainer.appendChild(bar);
        });

        container.appendChild(barContainer);
        root.appendChild(container); // ✅ root is definitely not null
      });
    }

    // Render linked list visualization
    if (
      listRef.current &&
      dataStructures.some((ds) => ds.type === "linkedList")
    ) {
      const svg = d3.select(listRef.current);
      svg.selectAll("*").remove();

      const linkedList = dataStructures.find((ds) => ds.type === "linkedList");
      if (linkedList && Array.isArray(linkedList.data)) {
        const width = 600;
        const height = 150;
        svg.attr("width", width).attr("height", height);

        const nodeWidth = 80;
        const nodeHeight = 60;
        const spacing = 120;

        linkedList.data.forEach((node: any, index: number) => {
          const x = index * spacing + 50;
          const y = height / 2;

          // Draw node
          svg
            .append("rect")
            .attr("x", x)
            .attr("y", y - nodeHeight / 2)
            .attr("width", nodeWidth)
            .attr("height", nodeHeight)
            .attr("fill", "#4a90e2")
            .attr("stroke", "#333")
            .attr("stroke-width", 2)
            .attr("rx", 5);

          // Draw value
          svg
            .append("text")
            .attr("x", x + nodeWidth / 2)
            .attr("y", y)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-weight", "bold")
            .text(node.value || node);

          // Draw arrow to next
          if (index < linkedList.data.length - 1) {
            svg
              .append("line")
              .attr("x1", x + nodeWidth)
              .attr("y1", y)
              .attr("x2", x + spacing - 10)
              .attr("y2", y)
              .attr("stroke", "#333")
              .attr("stroke-width", 2)
              .attr("marker-end", "url(#arrow)");
          }

          // Arrow marker
          if (!svg.select("#arrow").node()) {
            const defs = svg.append("defs");
            defs
              .append("marker")
              .attr("id", "arrow")
              .attr("viewBox", "0 -5 10 10")
              .attr("refX", 9)
              .attr("refY", 0)
              .attr("markerWidth", 6)
              .attr("markerHeight", 6)
              .attr("orient", "auto")
              .append("path")
              .attr("d", "M0,-5L10,0L0,5")
              .attr("fill", "#333");
          }
        });
      }
    }
  }, [dataStructures, arrays]);

  return (
    <div className="data-structure-visualization">
      <h4>Data Structure Visualization</h4>

      {dataStructures.length === 0 && arrays.length === 0 ? (
        <div className="empty-state">
          <p>No data structures to visualize</p>
        </div>
      ) : (
        <>
          {arrays.length > 0 && (
            <div className="structure-section">
              <h5>Arrays</h5>
              <div ref={arrayRef} className="arrays-container"></div>
            </div>
          )}

          {dataStructures.map((ds, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="structure-section"
            >
              <h5>
                {ds.type.charAt(0).toUpperCase() + ds.type.slice(1)}{" "}
                {ds.type === "linkedList" && "(Linked List)"}
              </h5>

              {ds.type === "linkedList" && (
                <div className="linked-list-container">
                  <svg ref={listRef} className="linked-list-svg"></svg>
                </div>
              )}

              {ds.type === "array" && (
                <div className="array-display">
                  {Array.isArray(ds.data) &&
                    ds.data.map((item: any, i: number) => (
                      <div key={i} className="array-item">
                        {String(item)}
                      </div>
                    ))}
                </div>
              )}

              {ds.operations && ds.operations.length > 0 && (
                <div className="operations">
                  <strong>Operations:</strong> {ds.operations.join(", ")}
                </div>
              )}
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
};

export default DataStructureVisualization;
