module.exports = function solveSudoku(matrix) {
  const isValidNum = (rowNum, colNum, num, squareSize) => {
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[rowNum][i] === num) {
        return false;
      }    
    }

    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][colNum] === num) {
        return false;
      }    
    }

    const rowStart = Math.floor(rowNum / squareSize) * squareSize;
    const colStart = Math.floor(colNum / squareSize) * squareSize;

    for (let i = rowStart; i < rowStart + squareSize; i++) {
      for (let j = colStart; j < colStart + squareSize; j++) {
        if (matrix[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  };

  const fillMatrix = (matrix, maxCellValue, zeroCellHandler) => {
    const emptyCellsList = [];
    let repeat = false;
    
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] === 0 || repeat) {

          if (matrix[row][col] === 0) {
            emptyCellsList.push([row, col]);
          }
        
          const [rowZero, colZero] = emptyCellsList[emptyCellsList.length - 1];
          let reqNum = matrix[rowZero][colZero] + 1;
          let success = false;

          while(reqNum <= maxCellValue && !success) {
            if (zeroCellHandler(row, col, reqNum, 3)) {
              success = true;
              repeat = false;
              matrix[row][col] = reqNum;
            } else {
              reqNum++;
            }
          }

          if (!success) {
            matrix[rowZero][colZero] = 0;
            emptyCellsList.pop();

            const [prevRow, prevCol] = emptyCellsList[emptyCellsList.length - 1];
            row = prevRow;
            col = prevCol - 1;

            repeat = true;
          }
        }
      }
    }

    return matrix;
  };

  return fillMatrix(matrix, 9, isValidNum);
}
