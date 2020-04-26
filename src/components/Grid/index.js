import React, { useState, useEffect } from "react";
import last from "lodash/last";
import isEqual from "lodash/isEqual";
import Cell from "../Cell";
import "./index.css";

const SQUARE_SIZE = 10;

const squareRange = [];
for (var i = 0; i < SQUARE_SIZE; i++) {
  squareRange.push(i);
}

const emptyNumberMatrix = [];
for (var j = 0; j < SQUARE_SIZE; j++) {
  emptyNumberMatrix.push(new Array(SQUARE_SIZE));
}

export default (props) => {
  const [numberMatrix, setNumberMatrix] = useState(emptyNumberMatrix);
  const [roundHistory, setRoundHistory] = useState([]);

  const setNumber = ({ x, y }) => {
    if (roundHistory.length > 0 && !isSelectable({ x, y })) return;

    numberMatrix[x][y] = roundHistory.length + 1;
    setRoundHistory([...roundHistory, { x, y }]);
    setNumberMatrix([...numberMatrix]);
  };

  const lastCellClicked = last(roundHistory);
  const isCellActive = (pos) => isEqual(pos, lastCellClicked);

  const isSelectable = (position) => {
    return (
      roundHistory.length > 0 &&
      !numberMatrix[position.x][position.y] &&
      (isSelectableOnLine(lastCellClicked, position) ||
        isSelectableOnDiagonal(lastCellClicked, position))
    );
  };

  const isSelectableOnLine = (reference, newPosition) =>
    (reference.x === newPosition.x &&
      Math.abs(reference.y - newPosition.y) === 3) ||
    (reference.y === newPosition.y &&
      Math.abs(reference.x - newPosition.x) === 3);

  const isSelectableOnDiagonal = (reference, newPosition) =>
    Math.abs(reference.y - newPosition.y) === 2 &&
    Math.abs(reference.x - newPosition.x) === 2;

  const handleKeyPress = (event) => {
    if (event.keyCode !== 85) return;

    goBack();
  };

  const goBack = () => {
    if (roundHistory.length === 0) return;

    const lastRound = roundHistory.pop();
    numberMatrix[lastRound.x][lastRound.y] = null;
    setNumberMatrix([...numberMatrix]);
    setRoundHistory([...roundHistory]);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <>
      <div className="grid-wrapper">
        {squareRange.map((_, y) => (
          <div key={y} className="line-wrapper">
            {squareRange.map((_, x) => (
              <Cell
                key={x}
                isActive={isCellActive({ x, y })}
                isSelectable={isSelectable({ x, y })}
                number={numberMatrix[x][y]}
                onClick={() => setNumber({ x, y })}
              />
            ))}
          </div>
        ))}
      </div>
      <p>To undo an action, hit u or click on this button</p>
      <button className="go-back-button" onClick={goBack}>
        Undo
      </button>
    </>
  );
};
