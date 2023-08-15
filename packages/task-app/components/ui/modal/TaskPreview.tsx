import React, { useState, useEffect } from "react";

interface TaskPreviewProps {
  taskName?: string;
  taskDescription?: string;
  taskPriority?: string;
}

const TaskPreview: React.FC<TaskPreviewProps> = ({ taskName, taskDescription, taskPriority }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (taskName && taskDescription) {
      setTimeout(() => setIsFlipped(true), 1000);
    }

    if (taskPriority) {
      setTimeout(() => setIsExpanded(true), 1000);
    }
  }, [taskName, taskDescription, taskPriority]);

  return (
    <>
      <style jsx>{`
        .hover-container:hover .card-container {
          transform: scale(1.05) translateY(-5px);
        }
        .card-container {
          perspective: 1000px;
          transition: transform 0.3s;
        }
        .card {
          transform-style: preserve-3d;
          transition: transform 1s;
        }
        .card-front, .card-back {
          backface-visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .card-back {
          transform: rotateY(180deg);
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .expanded {
          height: 450px;
        }
        .expanded .card-front {
          transform: rotateY(0deg);
          z-index: 2;
        }
      `}</style>
      <div className="hover-container">
        <div className={`card-container ${isExpanded ? 'expanded' : ''}`}>
          <div className={`card ${isFlipped ? 'rotate-y-180' : ''}`}>
            <div className={`border rounded-lg p-6 shadow-2xl transform bg-gray-100`}>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                {taskName || "Task Name"}
              </h3>
              <p className="text-lg text-gray-600">
                {taskDescription || "Task Description"}
              </p>
              {isExpanded && (
                <p className="text-lg text-gray-600 mt-3">
                  <strong className="text-gray-700">Priority:</strong> {taskPriority || "not set" }
                </p>
              )}
            </div>
            <div className="card-back border rounded-lg p-6 shadow-2xl bg-gray-100">
              {!isExpanded ? (
                <p className="text-lg text-gray-600">
                  <strong className="text-gray-700">Priority:</strong> {taskPriority || "not set" }
                </p>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">
                    {taskName || "Task Name"}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {taskDescription || "Task Description"}
                  </p>
                  <p className="text-lg text-gray-600 mt-3">
                    <strong className="text-gray-700">Priority:</strong> {taskPriority || "not set" }
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskPreview;























/* import React, { useState, useEffect } from "react";
import Cube3DPreview from "./Cube3DPreview";

interface TaskPreviewProps {
  taskName?: string;
  taskDescription?: string;
  taskPriority?: string;
}

const TaskPreview: React.FC<TaskPreviewProps> = ({ taskName, taskDescription, taskPriority }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (taskName && taskDescription && taskPriority) {
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  }, [taskName, taskDescription, taskPriority]);

  return (
    <>
      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
      <div className={`border rounded-lg p-4 shadow-2xl transform bg-gray-50 transition-transform duration-300 hover:scale-105 hover:translate-y-[-5px] perspective-[1000px] ${isFlipped ? 'rotate-y-180' : ''}`}>
        <h3 className="text-xl font-bold mb-2">
          {taskName || "Task Name"}
        </h3>
        <p className="text-gray-600">
          {taskDescription || "Task Description"}
        </p>
        <p className="text-gray-600">
          <strong>Priority:</strong> {taskPriority || "not set" }
        </p>
      </div>
    </>
  );
};

export default TaskPreview; */