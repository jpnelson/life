define(function () {
    return function (width, height) {

        var board = [[]];

        return {
            start: function () {
                this.resize(width, height);
            },
            step: function () {

            },
            getBoard: function () {
                return board;
            },
            resize: function (newWidth, newHeight) {
                var oldWidth = (board || []).length;
                var oldHeight = (board[0] || []).length;
                var columnsToAdd = newWidth - oldWidth;
                var rowsToAdd = newHeight - oldHeight;

                if (columnsToAdd < 0) {
                    //Contract columns
                    /*for (var x = 0; x < newWidth; x++) {
                        for (var y = 0; y < -columnsToAdd; y++) {
                            board[x].pop();
                        }
                    }*/
                } else {
                    //Expand columns
                    for (var x = 0; x < columnsToAdd; x++) {
                        var column = [];
                        for (var y = 0; y < oldHeight; y++) {
                            column.push(Math.random() > 0.5 ? false : true);
                        }
                        board.push(column);
                    }
                }


                if (rowsToAdd < 0) {
                    //Contract rows
                    /*for (var x = 0; x < -rowsToAdd; x++) {
                        board.pop();
                    }*/
                } else {
                    //Expand rows
                    for (var x = 0; x < newWidth; x++) {
                        for (var y = 0; y < rowsToAdd; y++) {
                            board[x].push(Math.random() > 0.5 ? false : true);
                        }
                    }
                }
            }
        }
    }
});