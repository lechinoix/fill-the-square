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

  return (
    <div className="grid-line-wrapper">
      {squareRange.map((_, y) => (
        <div key={y} className="line-wrapper">
          {squareRange.map((_, x) => (
            <Cell
              key={x}
              position={{ x, y }}
              isActive={isCellActive({ x, y })}
              number={numberMatrix[x][y]}
              onClick={() => setNumber({ x, y })}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
