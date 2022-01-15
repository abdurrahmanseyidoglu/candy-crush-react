import {useEffect, useState} from "react";
import Score from './components/Score'
import blank from './candies/blank.png';
import blueCandy from './candies/blue-candy.png'
import greenCandy from './candies/green-candy.png'
import orangeCandy from './candies/orange-candy.png'
import purpleCandy from './candies/purple-candy.png'
import redCandy from './candies/red-candy.png'
import yellowCandy from './candies/yellow-candy.png'

let boardWidth = 8
const candyColors = [blueCandy, greenCandy, orangeCandy, purpleCandy, redCandy, yellowCandy]


function App() {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([])
    const [candyBeingDragged, setCandyBeingDragged] = useState(null)
    const [candyBeingReplaced, setCandyBeingReplaced] = useState(null)
    const [scoreDisplay, setScoreDisplay] = useState(0)

    //check for columns of four of the same color
    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + boardWidth, i + (boardWidth * 2), i + (boardWidth * 3)]
            const currentColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank
            if (columnOfFour.every(indexOfColor => currentColorArrangement[indexOfColor] === currentColor) && !isBlank) {
                //adding score if there is a deletions
                setScoreDisplay((score) =>
                    score + 4
                )
                columnOfFour.forEach(indexOfColor => currentColorArrangement[indexOfColor] = blank)
                return true
            }
        }
    }
    //check for columns of three of the same color
    const checkForColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + boardWidth, i + (boardWidth * 2)]
            const currentColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank
            if (columnOfThree.every(indexOfColor => currentColorArrangement[indexOfColor] === currentColor)&& !isBlank) {
                //adding score if there is a deletions
                setScoreDisplay((score) =>
                    score + 3
                )
                columnOfThree.forEach(indexOfColor => currentColorArrangement[indexOfColor] = blank)
                return true
            }
        }
    }
    //check for rows of four of the same color

    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const currentColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank
            //preventing check repeating for every last three squares of every row
            const notValid = [6, 7, 8, 14, 15, 16, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            if (notValid.includes(i)) continue
            if (rowOfFour.every(indexOfColor => currentColorArrangement[indexOfColor] === currentColor)&& !isBlank) {
                //adding score if there is a deletions
                setScoreDisplay((score) =>
                    score + 4
                )
                rowOfFour.forEach(indexOfColor => currentColorArrangement[indexOfColor] = blank)
                return true
            }
        }
    }
    //check for rows of three of the same color
    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const currentColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank
            //preventing check repeating for every last two squares of every row
            const notValid = [7, 8, 15, 16, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            if (notValid.includes(i)) continue
            if (rowOfThree.every(indexOfColor => currentColorArrangement[indexOfColor] === currentColor)&& !isBlank) {
                //adding score if there is a deletions
                setScoreDisplay((score) =>
                    score + 3
                )
                rowOfThree.forEach(indexOfColor => currentColorArrangement[indexOfColor] = blank)
                return true
            }
        }
    }

    //move blank colors down and generate new colors replacing the removed ones
    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && currentColorArrangement[i] === blank) {
                let randomNumber = Math.floor(Math.random() * candyColors.length)
                currentColorArrangement[i] = candyColors[randomNumber]
            }
            if (currentColorArrangement[i + boardWidth] === blank) {
                currentColorArrangement[i + boardWidth] = currentColorArrangement[i]
                currentColorArrangement[i] = blank
            }
        }


    }
    //drag and drop functions
    const dragStart = (event) => {
        setCandyBeingDragged(event.target)

    }
    const dragDrop = (event) => {
        setCandyBeingReplaced(event.target)

    }
    const dragEnd = (e) => {
        const candyBeingDraggedId = parseInt(candyBeingDragged.getAttribute('data-id'))
        const candyBeingReplacedId = parseInt(candyBeingReplaced.getAttribute('data-id'))

        const validMoves = [
          candyBeingDraggedId - 1,
          candyBeingDraggedId - boardWidth,
          candyBeingDraggedId + 1,
          candyBeingDraggedId + boardWidth
        ]

        const validMove = validMoves.includes(candyBeingReplacedId)




        if (validMove) {
          currentColorArrangement[candyBeingReplacedId] = candyBeingDragged.getAttribute('src')
          currentColorArrangement[candyBeingDraggedId] = candyBeingReplaced.getAttribute('src')

          const isAColumnOfFour = checkForColumnOfFour()
          const isARowOfFour = checkForRowOfFour()
          const isAColumnOfThree = checkForColumnOfThree()
          const isARowOfThree = checkForRowOfThree()

          if (candyBeingReplacedId &&
            (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)) {
            setCandyBeingDragged(null)
            setCandyBeingDragged(null)
          } else {
            currentColorArrangement[candyBeingReplacedId] = candyBeingReplaced.getAttribute('src')
            currentColorArrangement[candyBeingDraggedId] = candyBeingDragged.getAttribute('src')
            setCurrentColorArrangement([...currentColorArrangement])
          }
        }
      }

    //creating an array of 8*8 = 64 square each one is a random color from the candyColors array
    const createBoard = () => {
        const randomColorArrangement = []
        for (let i = 0; i < boardWidth * boardWidth; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
            randomColorArrangement.push(randomColor)
        }
        setCurrentColorArrangement(randomColorArrangement)
    }
    //using effect without dependencies to run the "createBoard()" function only once (when rendering is finished)
    useEffect(() => {
        createBoard()
    }, [])

    //call these functions when the component gets mount and keep calling it every 100 ms
    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour()
            checkForColumnOfFour()
            checkForColumnOfThree()
            checkForRowOfThree()
            moveIntoSquareBelow()


            setCurrentColorArrangement([...currentColorArrangement])
        }, 200)
        return () => clearInterval(timer)
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])

    return (<div className="app">
         <Score score={scoreDisplay}/>
        <div className="game">
            {currentColorArrangement.map((candyColor, index) => {
                return (<img key={index} src={candyColor} alt={candyColor}
                    //adding drag-drop functionality
                             data-id={index}
                             draggable={true}
                             onDragStart={dragStart}
                             onDragOver={(e) => e.preventDefault()}
                             onDragEnter={(e) => e.preventDefault()}
                             onDragLeave={(e) => e.preventDefault()}
                             onDrop={dragDrop}
                             onDragEnd={dragEnd}

                />)
            })}

        </div>

    </div>);
}

export default App;
