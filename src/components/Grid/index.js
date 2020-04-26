import React, { useState } from "react";
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
  const [roundNumber, setroundNumber] = useState(1);
  const [roundHistory, setRoundHistory] = useState([]);

  const setNumber = ({ x, y }) => {
    numberMatrix[x][y] = roundNumber;
    setroundNumber(roundNumber + 1);
    setRoundHistory([...roundHistory, { x, y }]);
    setNumberMatrix([...numberMatrix]);
  };

  const lastCellClicked = last(roundHistory);
  const isCellActive = (pos) => isEqual(pos, lastCellClicked);

  const isSelectable = (position) => {
    return (
      roundHistory.length > 1 &&
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

  return (
    <div className="grid-line-wrapper">
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
  );
};
