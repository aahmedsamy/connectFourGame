var player1 = prompt("Player One: Enter your name, you will be blue");
var player1Color = 'rgb(0, 0, 250)';
var player1Score = 0;
var player2 = prompt("Player Two: Enter your name, you will be red");
var player2Color = 'rgb(255, 0, 0)';
var defaultColor = 'rgb(255, 255, 0)';
var player2Score = 0;
var gameon = true;
var counter = 1;
var table = $('table tr');

//monitoring
function reportWin(rowNum, colNum) {
    console.log("You won starting at this row, col");
    console.log("here "+ rowNum + ", " + colNum);
}

//fill the chosen cell with the player color
function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}


// return cell's color
function returnColor(rowIndex, colIndex) {
     return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

//find the first empty cell from bottom to up
function checkBottom(colIndex) {
    var colorReport ; //= returnColor(5,colIndex);//why!!
    for (var row = 5 ; row > -1 ;row--)
    {
        colorReport = returnColor(row, colIndex);
        console.log(colorReport);
        if(colorReport === defaultColor)
        {
            console.log(row+" here is a shit");
            return row;
        }
    }
    return false;
}

//check if there is a winner
function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== defaultColor && one !== undefined)
}


function horizontalWinCheck() {

    for(var row = 0 ; row < 6 ; row++)
    {
        for(var col = 0 ; col < 7 ; col++)
        {
            if(colorMatchCheck(returnColor(row, col), returnColor(row, col+1), returnColor(row, col + 2), returnColor(row, col + 3)))
            {
                console.log("horizontal");
                reportWin(row,col);
                return true;
            }
        }
    }
}

function verticalWinCheck() {
    for(var row = 0 ; row < 6 ; row++)
    {
        for(var col = 0 ; col < 7 ; col++)
        {
            if(colorMatchCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col)))
            {
                console.log("vertical");
                reportWin(row,col);
                return true;
            }
        }
    }
}



function diagonalWinCheck() {
    for(var row = 0 ; row < 6 ; row++)
    {
        for(var col = 0 ; col < 7 ; col++)
        {
            if(colorMatchCheck(returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3)))
            {
                console.log("Diagonal");
                reportWin(row,col);
                return true;
            }
            else if(colorMatchCheck(returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3)))
            {
                console.log("Diagonal");
                reportWin(row,col);
                return true;
            }
        }
    }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

function cleanGrid()
{
    for(var row = 0 ; row < 6 ; row++)
    {
        for(var col = 0 ; col < 7 ; col++)
        {
            changeColor(row, col, defaultColor);
        }
    }
    if(counter % 2 === 0)
    {
        currentPlayer = 1;
        currentName = player1;
        currentColor = player1Color;
        $('#player1').css({border : "2px solid blue"});
        $('#player2').css({border : "2px solid white"});
    }
    else
    {
        currentPlayer = 2;
        currentName = player2;
        currentColor = player2Color;
        $('#player2').css({border : "2px solid red"});
        $('#player1').css({border : "2px solid white"});
    }
    counter++;
}

function lockGrid() {
    $('.board').prop( "disabled", true );
}




$('#turn').text(player1+": it is your turn, pick a column to drop in!");
$('#player1').text(player1+ ": "+player1Score);
$('#player2').text(player2+ ": "+player2Score);




$('.board button').on('click', function () {
    var col=$(this).closest('td').index();
    console.log(col);

    var bottomAvailable=checkBottom(col);
    if(gameon == false){}
    else if(bottomAvailable === false)
    {
        alert("no empty cells in this col!!");
    }
    else
    {
        console.log(col+", "+bottomAvailable);

        changeColor(bottomAvailable, col, currentColor);

        if(horizontalWinCheck()|| verticalWinCheck() || diagonalWinCheck())
        {
            gameon = false;
            if(currentPlayer === 1)
            {
                player1Score++;
            }
            else
            {
                player2Score++;
            }
            $('#player1').text(player1+ ": "+player1Score);
            $('#player2').text(player2+ ": "+player2Score);
            if(player1Score > player2Score)
            {
                $('#player1').css('color', 'green');
                $('#player2').css('color','red');
            }
            else if(player1Score < player2Score)
            {
                $('#player1').css('color','red');
                $('#player2').css('color','green');
            }
            else
            {
                   $('#player1').css('color', 'green');
                   $('#player2').css('color','green');
            }
            alert(currentName+" Won this round!");
    }
    else
    {
        if(currentPlayer === 1)
        {
            $('#player2').css({border : "2px solid red"});
            $('#player1').css({border : "2px solid white"});
            currentName = player2;
            currentPlayer = 2;
            currentColor = player2Color;
        }
        else
        {
            $('#player1').css({border : "2px solid blue"});
            $('#player2').css({border : "2px solid white"});
            currentName = player1;
            currentPlayer = 1;
            currentColor = player1Color;
        }
        $('#turn').text(currentName+": it is your turn, pick a column to drop in!");
    }
    }

})


$('#reset').click( function () {
     cleanGrid();
     gameon = true;
})




































