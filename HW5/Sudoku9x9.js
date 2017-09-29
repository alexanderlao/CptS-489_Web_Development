//// Student name: Alexander Lao
//// Student ID: 11481444

// *************** Sudoku9x9 ***************

function Sudoku9x9 (arrOf81Values)
{
    // initialize an array for the puzzle
    this.cells = new Array (arrOf81Values.length);

    // convert the arrOf91Values to cells
    var valueCells = this.convertToCells(arrOf81Values);

    // populate the array with the cells
    this.cells = valueCells;
}

// Takes an array of numerical values and returns a corresponding array of cells.
// Values in the numbers array are 1 of 3 things and what they are determines how the cell is initialized:
// 1. Numerical values in the range [1,9] ->
//    Will have a corresponding cell that is finalized with this value
//
// 2. Array of numerical values, each of which must be in the range [1,9] ->
//    Will have a corresponding cell with these possibilities (non-finalized)
//
// 3. Anything else ->
//    Will have a corresponding cell with possibilities 1-9 (non-finalized)
// ======= NOTE: I DID NOT WRITE THIS FUNCTION. IT'S WRITEN BY EVAN FROM THE HTML TEST CASES. =======
Sudoku9x9.prototype.convertToCells = function (nums)
{   
    var cells = new Array(nums.length);

    for (var i = 0; i < nums.length; i++)
    {
        var num = nums[i];
        cells[i] = new SudokuCell(9);

        // See if this entry in nums is another array
        if (num instanceof Array)
        {
            // Since the array is expected to have the possible values, we need to
            // eliminate values in the range [1,9] that AREN'T in the array
            for (var j = 1; j <= 9; j++)
            {
                if (-1 === num.indexOf(j))
                    cells[i].removePossibility(j);
            }
        }

        // See if it's a numerical value in the range [1,9]
        else if (typeof num === "number" && num >= 1 && num <= 9)
        {
            cells[i].finalizedValue = nums[i];
        }

        // Else do nothing because it's already a cell with possibilities 1-9
    }

    return cells;
}

Sudoku9x9.prototype.get3x3 = function (rowIndex, colIndex)
{
    // array to hold the 9 cells of the 3x3 block
    var nineCells = [];

    // get the starting index in the array
    // based on the rowIndex and columnIndex
    var startIndex = this.translateToNineByNine (rowIndex, colIndex);

    // loop through the specified 3x3 block
    for (var i = 0; i < 9; i++)
    {
        nineCells.push (this.cells[startIndex]);
        startIndex++;

        // check if we need to go to the
        // next row in the 3x3 block
        if ((i + 1) % 3 == 0)
        {
            // add six to get to the next row
            // in the 3x3 because we incremented
            // by one previously
            startIndex += 6;
        }
    }

    // create and return the Sudoku3x3Block with the
    // nineCells array
    return new Sudoku3x3Block (nineCells);
}

// translates the row and column index to the proper starting index
// in the array with 81 values (ex. rowIndex = 1, columnIndex = 1
// translates to the middle 3x3 block, so the starting index
// would be 30)
Sudoku9x9.prototype.translateToNineByNine = function (rowIndex, columnIndex)
{
    var startIndex;

    // translate the rowIndex and colIndex
    // in terms of the 9x9 array
    switch (rowIndex)
    {
        case 0:
            startIndex = 0;
            break;
        case 1:
            startIndex = 27;
            break;
        case 2:
            startIndex = 54;
            break;
    }

    switch (columnIndex)
    {
        case 0:
            break;
        case 1:
            startIndex += 3;
            break;
        case 2:
            startIndex += 6;
            break;
    }

    return startIndex;
}

Sudoku9x9.prototype.getColumn = function (colIndex)
{
    var columnCells = [];

    // loop through the 9 cells in the column
    for (var i = 0; i < 9; i++)
    {
        // and add each cell to the array
        columnCells.push (this.cells[colIndex]);

        // iterate to the next cell in the column
        colIndex += 9;
    }

    // return a new SudokuCellBlock from the columnCells
    return new SudokuCellBlock (columnCells);
}

Sudoku9x9.prototype.getRow = function (rowIndex)
{
    var rowCells = [];
    var startIndex;

    // translate the rowIndex to the correct
    // index in the 9x9 puzzle
    switch (rowIndex)
    {
        case 0:
            startIndex = 0;
            break;
        case 1:
            startIndex = 9;
            break;
        case 2:
            startIndex = 18;
            break;
        case 3:
            startIndex = 27;
            break;
        case 4:
            startIndex = 36;
            break;
        case 5:
            startIndex = 45;
            break;
        case 6:
            startIndex = 54;
            break;
        case 7:
            startIndex = 63;
            break;
        case 8:
            startIndex = 72;
            break;
    }

    // loop through the 9 cells in the row
    for (var i = 0; i < 9; i++)
    {
        // and add each cell to the array
        rowCells.push (this.cells[startIndex++]);
    }

    // return a new SudokuCellBlock from the rowCells
    return new SudokuCellBlock (rowCells);
}

Sudoku9x9.prototype.toArray = function ()
{
    // initialize an array to hold the copy of the cells
    var copy = [];

    // loop through the array of cells
    for (var i = 0; i < this.cells.length; i++)
    {
        // add the cell to the copy array
        copy.push (this.cells[i]);
    }

    return copy;
}

// applies trySolve () to every row, column and 3x3 block
Sudoku9x9.prototype.applyTrySolve = function ()
{
    // loop through each row and column
    for (var i = 0; i < 9; i++)
    {
        // call trySolve on each row
        var row = this.getRow(i);
        row.trySolve();

        // call trySolve on each column
        var column = this.getColumn(i);
        column.trySolve();
    }

    // loop through each 3x3 block
    for (var i = 0; i < 3; i++)
    {
        for (var j = 0; j < 3; j++)
        {
            // call trySolve on each 3x3 block
            var threeByThree = this.get3x3(i, j);
            threeByThree.trySolve();
        }
    }
}

// checks if the puzzle is solved
Sudoku9x9.prototype.checkIfSolved = function ()
{
    // loop through the entire puzzle
    for (var i = 0; i < 81; i++)
    {
        // check if the cell is empty
        if (this.cells[i].isFinalized == false) return false;
    }

    return true;
}

Sudoku9x9.prototype.solve = function ()
{
    var solvedInfo = { solved: false };

    // call applyTrySolve on the puzzle's cells
    // to narrow down possibilities
    this.applyTrySolve();

    // call the recursive helper on the first cell
    this.solveHelper(0);

    // check if the puzzle is solved
    if (this.checkIfSolved() == true) solvedInfo.solved = true;

    return solvedInfo;
}

// recursive helper for the solve function
// backtracking algorithm from: http://www.geeksforgeeks.org/backtracking-set-7-suduku/
Sudoku9x9.prototype.solveHelper = function (index)
{
    // find an unfinalized cell
    var unfinalizedIndex = this.findUnfinalizedIndex();

    // if all cells are finalized
    if (unfinalizedIndex == -1)
    {
        return true;
    }
    else
    {
        // otherwise update the index to the unfinalized cell
        // in other words, skip the finalized cells
        index = unfinalizedIndex;
    }

    // get the cell and its possibilities into memory
    var currentCell = this.cells[index];
    var currentPossibilities = currentCell.possibilities;

    // apply the backtracking logic
    // loop through the currentCell's possibilities
    for (var i = 0; i < currentCell.possibilities.length; i++)
    {
        // get the possible solution
        var possibleSolution = currentCell.possibilities[i];

        // check if the possible solution is valid in the
        // row, column and 3x3 block of the currentCell
        if (this.checkIfValid(index, possibleSolution))
        {
            // assign the possibleSolution
            currentCell.finalizedValue = possibleSolution;

            // check if the possible solution works
            // for the whole puzzle
            if (this.solveHelper(0)) return true;

            // at this point the possible solution failed
            // restore the possibilities and try the next possibility
            currentCell.possibilities = currentPossibilities;
        }
    }

    // trigger the backtracking at this point
    // because all possibilities for the currentCell
    // were tried and none of them work
    return false;
}

// converts the array index ( [0,81) ) to a row number ( [0,9) )
Sudoku9x9.prototype.getRowIndex = function (currentIndex)
{
    if (currentIndex < 9)
        return 0;
    else if (currentIndex < 18)
        return 1;
    else if (currentIndex < 27)
        return 2;
    else if (currentIndex < 36)
        return 3;
    else if (currentIndex < 45)
        return 4;
    else if (currentIndex < 54)
        return 5;
    else if (currentIndex < 63)
        return 6;
    else if (currentIndex < 72)
        return 7;
    else if (currentIndex < 81)
        return 8;
}

// converts the array index ( [0,81) ) to a column number ( [0,9) )
Sudoku9x9.prototype.getColumnIndex = function (currentIndex)
{
    if (currentIndex % 9 == 0)
        return 0;
    else if (currentIndex % 9 == 1)
        return 1;
    else if (currentIndex % 9 == 2)
        return 2;
    else if (currentIndex % 9 == 3)
        return 3;
    else if (currentIndex % 9 == 4)
        return 4;
    else if (currentIndex % 9 == 5)
        return 5;
    else if (currentIndex % 9 == 6)
        return 6;
    else if (currentIndex % 9 == 7)
        return 7;
    else if (currentIndex % 9 == 8)
        return 8;
}

// converts the array index ( [0,81) ) to 3x3 indices ( ( [0,3), [0,3) )
Sudoku9x9.prototype.get3x3Index = function (currentIndex)
{
    // create an object to hold the row and column indices
    var threeByThreeIndices = { row: 0, column: 0 };

    // get the row and column index
    var rowIndex = this.getRowIndex (currentIndex);
    var columnIndex = this.getColumnIndex (currentIndex);

    if ((rowIndex < 3) && (columnIndex < 3))
    {
        return threeByThreeIndices;
    }
    else if ((rowIndex < 3) && (columnIndex < 6))
    {
        threeByThreeIndices.column = 1;
    }
    else if ((rowIndex < 3) && (columnIndex < 9))
    {
        threeByThreeIndices.column = 2;
    }
    else if ((rowIndex < 6) && (columnIndex < 3))
    {
        threeByThreeIndices.row = 1;
    }
    else if ((rowIndex < 6) && (columnIndex < 6))
    {
        threeByThreeIndices.row = 1;
        threeByThreeIndices.column = 1;
    }
    else if ((rowIndex < 6) && (columnIndex < 9))
    {
        threeByThreeIndices.row = 1;
        threeByThreeIndices.column = 2;
    }
    else if ((rowIndex < 9) && (columnIndex < 3))
    {
        threeByThreeIndices.row = 2;
    }
    else if ((rowIndex < 9) && (columnIndex < 6))
    {
        threeByThreeIndices.row = 2;
        threeByThreeIndices.column = 1;
    }
    else if ((rowIndex < 9) && (columnIndex < 9))
    {
        threeByThreeIndices.row = 2;
        threeByThreeIndices.column = 2;
    }

    return threeByThreeIndices;
}

// check the possibleSolution against the finalizedValues of the
// row, column and 3x3 block of the cell with the cellIndex
Sudoku9x9.prototype.checkIfValid = function (cellIndex, possibleSolution)
{
    // get the row, column and 3x3 block that contains the current cell
    var currentRowIndex = this.getRowIndex(cellIndex);
    var currentRow = this.getRow(currentRowIndex);

    var currentColumnIndex = this.getColumnIndex(cellIndex);
    var currentColumn = this.getColumn(currentColumnIndex);

    var current3x3Index = this.get3x3Index(cellIndex);
    var current3x3 = this.get3x3(current3x3Index.row, current3x3Index.column);

    // check the possibleSolution against the finalizedValues of the
    // row, column and 3x3 block
    if (currentRow.containsFinalizedValue(possibleSolution) ||
        currentColumn.containsFinalizedValue(possibleSolution) ||
        current3x3.containsFinalizedValue(possibleSolution))
    {
        return false;
    }

    return true;
}

// finds an unfinalized cell and returns its index
// returns -1 if all cells are finalized
Sudoku9x9.prototype.findUnfinalizedIndex = function ()
{
    // loop through the entire puzzle
    for (var i = 0; i < 81; i++)
    {
        // check if the cell is empty
        if (this.cells[i].isFinalized == false) return i;
    }

    return -1;
}

// *************** SudokuCell ***************

function SudokuCell (numPossibleValues)
{
    // initialize an empty array
    this.possibilities = [];

    // for each possible number
    for (var i = 1; i <= numPossibleValues; i++)
    {
        // add that number to the array
        this.possibilities.push (i);
    }

    // accessor function for the finalizedValue property
    var isFinalizedValueGet = function ()
    {
        if (this.isFinalized == false) return undefined;
        else
        {
            // return the only value in the array of possibilities
            return this.possibilities[0];
        }
    }

    // mutator function for the finalizedValue property
    var isFinalizedValueSet = function (value)
    {
        // clear the array and push the finalizedValue
        this.possibilities = [];
        this.possibilities.push (value);
    }

    // finalizedValue property
    Object.defineProperty (this, "finalizedValue",
                            {
                                enumerable: true,
                                get: isFinalizedValueGet,
                                set: isFinalizedValueSet
                            });

    // helper function for the isFinalized property
    var checkIfFinal = function ()
    {
        // if the cell has one value, return true, otherwise return false
        if (this.possibilities.length == 1) return true;
        else return false;
    }

    // isFinalized property
    Object.defineProperty (this, "isFinalized",
                            {
                                enumerable: true,
                                get: checkIfFinal
                            });
}

SudokuCell.prototype.containsPossibility = function (value)
{
    // loop through the list of possibilities
    for (var i = 0; i < this.possibilities.length; i++)
    {
        // check if the value is in the list of possibilities
        if (this.possibilities[i] == value) return true;
    }

    // return false if the value isn't in the list of possibilities
    return false;
}

SudokuCell.prototype.getPossibilities = function ()
{
    // return the sorted possibilities array
    return this.possibilities.sort ();
}

SudokuCell.prototype.removePossibility = function (value)
{
    // if the cell is finalized, do nothing
    if (this.isFinalized == true) return false;

    // loop through the list of possibilities
    for (var i = 0; i < this.possibilities.length; i++)
    {
        // check if the value is in the list of possibilities
        if (this.possibilities[i] == value)
        {
            // remove the possibility
            this.possibilities.splice (i, 1);

            return true;
        }
    }

    // return false for all other cases
    return false;
}

SudokuCell.prototype.removePossibilities = function (arrOfValues)
{
    // loop through each value in the arrOfValues
    for (var i = 0; i < arrOfValues.length; i++)
    {
        // remove the value
        this.removePossibility (arrOfValues[i]);
    }
}

SudokuCell.prototype.toString = function ()
{
    // retrieve the array of possibilities
    var possibilities = this.getPossibilities ();
    var resultString = "";

    // for each possibility in the array of possibilites
    possibilities.forEach(function (possibility)
    {
        // append the possibility to the result string
        resultString += (possibility.toString() + " ");
    });

    // remove the extra space at the end
    resultString = resultString.substr (0, resultString.length - 1);

    return resultString;
}

// *************** SudokuCellCollection ***************

function SudokuCellCollection (arrOfCells)
{
    // initialize an empty array
    this.block = [];

    // loop through the arrOfCells
    for (var i = 0; i < arrOfCells.length; i++)
    {
        // push the cell to the collection
        this.block.push (arrOfCells[i]);
    }

    Object.defineProperty (this, "length",
                            {
                                enumerable: true,
                                get: function () { return this.block.length; }
                            });

    // make the collection immutable
    Object.freeze (this);
}

SudokuCellCollection.prototype.containsCell = function (cell)
{
    // loop through the collection of cells
    for (var i = 0; i < this.block.length; i++)
    {
        // check for a matching cell
        if (this.block[i] === cell) return true;
    }

    // return false if the cell is not found
    return false;
}

SudokuCellCollection.prototype.containsPossibility = function (value)
{
    // loop through the collection of cells
    for (var i = 0; i < this.block.length; i++)
    {
        // loop through each cell
        for (var j = 0; j < this.block[i].length; j++)
        {
            // check for a matching value
            if (this.block[i].possibilities[j] == value) return true;
        }
    }

    // return false if the value is not found
    return false;
}

SudokuCellCollection.prototype.count = function (predicate)
{
    var count = 0;

    // loop through the collection of cells
    for (var i = 0; i < this.block.length; i++)
    {
        // apply the predicate function to each cell
        if (predicate (this.block[i]) == true)
        {
            // increment the count if the predicate is true for the cell
            count++;
        }
    }

    return count;
}

SudokuCellCollection.prototype.forEach = function (functionThatTakes1CellParam, startIndex)
{
    // set the startIndex to a passed in startIndex or
    // 0 if a startIndex wasn't defined
    startIndex = startIndex || 0;

    if (this.block != null)
    {
        // loop through the collection of cells
        for (startIndex; startIndex < this.block.length; startIndex++)
        {
            // apply the function to each cell
            functionThatTakes1CellParam (this.block[startIndex]);
        }
    }
}

SudokuCellCollection.prototype.getFinalizedValues = function ()
{
    var result = [];

    // loop through the collection of cells
    for (var i = 0; i < this.block.length; i++)
    {
        // if the cell is finalized
        if (this.block[i].isFinalized == true)
        {
            // push the finalized value to the result array
            result.push (this.block[i].possibilities[0]);
        }
    }

    return result;
}

SudokuCellCollection.prototype.getPossibilities = function ()
{
    var result = [];

    // loop through the collection of cells
    for (var i = 0; i < this.block.length; i++)
    {
        // if the cell is not finalized
        if (this.block[i].isFinalized == false)
        {
            // loop through the possibility values
            for (var j = 0; j < this.block[i].possibilities.length; j++)
            {
                // if the value isn't already in the result arr
                if (result.indexOf (this.block[i].possibilities[j]) == -1)
                {
                    // push the possibility value
                    result.push (this.block[i].possibilities[j]);
                }
            }
        }
    }

    // sort the array
    // don't need to worry about unicode sorting because
    // we're only dealing with numbers between [1,9]
    result.sort ();

    return result;
}                 

SudokuCellCollection.prototype.removeCell = function (cell)
{
    var newCollection = [];

    // loop through the collection of cells
    for (var i = 0; i < this.block.length; i++)
    {
        // check for the excluded cell
        if (this.block[i] !== cell)
        {
            // push all cells that aren't the removed cell
            newCollection.push (this.block[i]);
        }
    }

    return newCollection;
}

SudokuCellCollection.prototype.removeCells = function (otherCellCollection)
{
    // check that the otherCellCollection is a SudokuCellCollection object
    if (otherCellCollection !== this) return this.block;

    // check the cells in this collection against the cells in the other collection

    var truth = true;
    var result = [];

    // loop through this collection
    for (var i = 0; i < this.block.length; i++)
    {
        // loop through the other collection
        for (var j = 0; j < otherCellCollection.length; j++)
        {
            // if the cell in this collection matches the cell in the other collection
            if (this.block[i] === otherCellCollection[j])
            {
                // set the truth boolean to false
                truth = false;
            }
        }

        // if the truth boolean is true at this point
        // it means the cell in this collection is unique
        if (truth == true)
        {
            // add it to the result array
            result.push (this.block[i]);

            // reset the truth boolean to true
            truth = true;
        }
    }

    return result;
}

SudokuCellCollection.prototype.removePossibility = function (value)
{
    var count = 0;

    // loop through this collection
    for (var i = 0; i < this.block.length; i++)
    {
        // get the index of the value if it exists
        // in the current cell
        var index = this.block[i].possibilities.indexOf (value);

        // if we found the value
        if (index > -1)
        {
            // make sure the cell isn't finalized
            if (this.block[i].isFinalized == false)
            {
                // remove it and increment the count
                this.block[i].possibilities.splice(index, 1);
                count++;
            }
        }
    }

    return count;
}

// checks if the collection contains a specified finalized value
SudokuCellCollection.prototype.containsFinalizedValue = function (checkValue)
{
    // loop through the block
    for (var i = 0; i < this.block.length; i++)
    {
        // check if the cell is finalized
        if (this.block[i].isFinalized == true)
        {   
            // check if the cell is finalized with the checkValue
            if (this.block[i].finalizedValue == checkValue) return true;
        }
    }

    return false;
}

// *************** SudokuCellBlock ***************

function SudokuCellBlock (arrOf9Cells)
{
    this.block = arrOf9Cells;
}

// inherit from the SudokuCellCollection class
SudokuCellBlock.prototype = Object.create(SudokuCellCollection.prototype);

SudokuCellBlock.prototype.trySolve = function ()
{
    // create an object to hold information
    // pertaining to solving the block
    var solveInfo = { changed: false, solved: false };

    // get the finalized values from the collection
    var finalizedValues = SudokuCellCollection.prototype.getFinalizedValues.call (this);

    // loop through the finalizedValues and remove them
    // as possibilities for the other cells
    for (var i = 0; i < finalizedValues.length; i++)
    {
        var cellsChanged =
            SudokuCellCollection.prototype.removePossibility.call (this, finalizedValues[i]);
    }

    // check if we made any changes
    if (cellsChanged > 0)
    {
        solveInfo.changed = true;
    }

    // get all of the possibilities
    var leftoverPossibilities = SudokuCellCollection.prototype.getPossibilities.call (this);

    // check if the collection still isn't solved
    if (leftoverPossibilities.length > 0)
    {
        // loop through the leftoverPossibilities
        for (var i = 0; i < leftoverPossibilities.length; i++)
        {
            var count = 0;

            // loop through the block
            for (var j = 0; j < this.block.length; j++)
            {
                // find the number of cells that contain the current possibility
                if (this.block[j].containsPossibility (leftoverPossibilities[i]) == true)
                    count++;
            }

            // if there's only one cell that contains the possibility
            if (count == 1)
            {
                // that cell's finalizedValue must be the possibility
                // loop through the block to find that cell
                for (var k = 0; k < this.block.length; k++)
                {
                    if (this.block[k].containsPossibility (leftoverPossibilities[i]))
                    {
                        // set the cell to that unique possibility
                        this.block[k].finalizedValue = leftoverPossibilities[i];
                    }
                }
            }
        }
    }

    // check if the collection is solved now
    // get the finalized values from the collection
    var finalizedValues = SudokuCellCollection.prototype.getFinalizedValues.call (this);

    // check if all cells are finalized
    if (finalizedValues.length == 9)
    {
        solveInfo.solved = true;
    }

    return solveInfo;
}

// *************** Sudoku3x3Block ***************

function Sudoku3x3Block (arrOf9Values)
{
    // initialize an array to hold the block
    this.block = [];

    // loop through the arrOf9Values
    for (var i = 0; i < arrOf9Values.length; i++)
    {
        // add the values to the block
        this.block.push (arrOf9Values[i]);
    }
}

// inherit from the SudokuCellBlock class
Sudoku3x3Block.prototype = Object.create (SudokuCellBlock.prototype);

Sudoku3x3Block.prototype.getPossibilitiesOnlyAvailableOnColumn = function (colIndex)
{
    // initialize an empty array for the
    // possibilities in the specified column
    var columnPossibilities = [];

    // loop through the specified column
    for (var i = colIndex; i < 9; i += 3)
    {
        // retrieve the length of the cell's possibilities array
        var possibilityLength = this.block[i].possibilities.length;

        // loop through the possibilities of the cell
        for (var j = 0; j < possibilityLength; j++)
        {
            var value = this.block[i].possibilities[j];

            // check if the value is already in the
            // columnPossibilities array
            if (columnPossibilities.indexOf (value) == -1)
            {
                // push the possibility of the current cell
                // into the array of columnPossibilities if
                // it doesn't already exist
                columnPossibilities.push (value);
            }
        }
    }

    return columnPossibilities;
}

Sudoku3x3Block.prototype.getPossibilitiesOnlyAvailableOnRow = function (rowIndex)
{
    // initialize an empty array for the
    // possibilities in the specified row
    var rowPossibilities = [];

    // translate the rowIndex to the correct
    // index in the 3x3 puzzle
    switch (rowIndex)
    {
        case 0:
            rowIndex = 0;
            break;
        case 1:
            rowIndex = 3;
            break;
        case 2:
            rowIndex = 6;
            break;
    }

    // loop through the specified row
    for (var i = 0; i < 3; i++)
    {
        // retrieve the length of the cell's possibilities array
        var possibilityLength = this.block[rowIndex].possibilities.length;

        // loop through the possibilities of the cell
        for (var j = 0; j < possibilityLength; j++)
        {
            var value = this.block[rowIndex].possibilities[j];

            // check if the value is already in the
            // rowPossibilities array
            if (rowPossibilities.indexOf (value) == -1)
            {
                // push the possibility of the current cell
                // into the array of rowPossibilities if
                // it doesn't already exist
                rowPossibilities.push (value);
            }
        }

        rowIndex++;
    }

    return rowPossibilities;
}

Sudoku3x3Block.prototype.isColumnFinalized = function (columnIndex)
{
    // loop through the specified column
    for (var i = columnIndex; i < 9; i += 3)
    {
        // check if the current cell is finalized
        if (this.block[i].isFinalized == false)
        {
            // if it's not finalized, return false and we're done
            return false;
        }
    }

    // otherwise return true
    return true;
}

Sudoku3x3Block.prototype.isRowFinalized = function (rowIndex)
{
    // translate the rowIndex to the correct
    // index in the 3x3 puzzle
    switch (rowIndex)
    {
        case 0:
            rowIndex = 0;
            break;
        case 1:
            rowIndex = 3;
            break;
        case 2:
            rowIndex = 6;
            break;
    }

    // loop through the specified row
    for (var i = 0; i < 3; i++)
    {
        // check if the current cell is finalized
        if (this.block[rowIndex].isFinalized == false)
        {
            // if it's not finalized, return false and we're done
            return false;
        }

        rowIndex++;
    }

    // otherwise return true
    return true;
}

Sudoku3x3Block.prototype.toString = function ()
{
    var resultString = "";

    // loop through the block
    for (var i = 0; i < this.block.length; i++)
    {
        // if we're at the beginning of a new row
        if (i % 3 == 0)
            resultString += "[";

        resultString += this.block[i].finalizedValue.toString() + ", ";

        // if we're at the end of a row
        if ((i + 1) % 3 == 0)
        {
            // chop off that extra comma and space
            resultString = resultString.slice (0, -2);
            resultString += "] ";
        }
    }

    // chop off the extra space at the end
    resultString = resultString.slice (0, -1);

    return resultString;
}

// checks if the block contains a specified finalized value
Sudoku3x3Block.prototype.containsFinalizedValue = function (checkValue)
{
    // loop through the block
    for (var i = 0; i < this.block.length; i++)
    {
        // check if the cell is finalized
        if (this.block[i].isFinalized == true)
        {
            // check if the cell is finalized with the checkValue
            if (this.block[i].finalizedValue == checkValue) return true;
        }
    }

    return false;
}