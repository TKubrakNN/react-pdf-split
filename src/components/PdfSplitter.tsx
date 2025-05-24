import React, { useState, useRef } from 'react';
import './PdfSplitter.css';

interface SplitLine {
  y: number;
}

interface PdfSplitterProps {
  // Replace 'any' with the proper type for your PDF data.
  pdfData: any;
}

const PdfSplitter: React.FC<PdfSplitterProps> = ({ pdfData }) => {
  const [splitLines, setSplitLines] = useState<SplitLine[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Insert a new split line where the user clicks.
  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const y = event.clientY - rect.top;
    setSplitLines([...splitLines, { y }]);
  };

  // Remove a split line when the delete icon is clicked.
  const removeSplitLine = (index: number) => {
    setSplitLines(splitLines.filter((_, i) => i !== index));
  };

  return (
    <div className="pdf-splitter-container" ref={containerRef} onClick={handleContainerClick}>
      <div className="pdf-content">
        {/* 
           Render your PDF content here.
           For example, if you are using 'react-pdf' or any other PDF renderer,
           include that component in this div.
           Your previously extracted bounding box data could be utilized here as needed.
        */}
      </div>

      {/* Render the split lines as overlays */}
      {splitLines.map((line, index) => (
        <div 
          key={index} 
          className="split-line" 
          style={{ top: line.y }} 
          onClick={(e) => e.stopPropagation()}
        >
          <span className="delete-icon" onClick={() => removeSplitLine(index)}>✕</span>
        </div>
      ))}
    </div>
  );
};

export default PdfSplitter;