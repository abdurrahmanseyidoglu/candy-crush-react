import {useEffect, useState} from "react";

let boardWidth = 8
const candyColors = ["blue", "green", "orange", 'purple', "red", 'yellow']


function App() {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([])
    const [candyBeingDragged, setCandyBeingDragged] = useState(null)
    const [candyBeingReplaced, setCandyBeingReplaced] = useState(null)

    //check for columns of four of the same color
    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + boardWidth, i + (boardWidth * 2), i + (boardWidth * 3)]
            const currentColor = currentColorArrangement[i]
            if (columnOfFour.every(indexOfColor => currentColorArrangement[indexOfColor] === currentColor)) {
                columnOfFour.forEach(indexOfColor => currentColorArrangement[indexOfColor] = '')
            }
        }
    }
    //check for columns of three of the same color
    const checkForColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + boardWidth, i + (boardWidth * 2)]
            const currentColor = currentColorArrangement[i]
            if (columnOfThree.every(indexOfColor => currentColorArrangement[indexOfColor] === currentColor)) {
                columnOfThree.forEach(indexOfColor => currentColorArrangement[indexOfColor] = '')
            }
        }
    }
    //check for rows of four of the same color

    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const currentColor = currentColorArrangement[i]
            //preventing check repeating for every last three squares of every row
            const notValid = [6, 7, 8, 14, 15, 16, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            if (notValid.includes(i)) continue
            if (rowOfFour.every(indexOfColor => currentColorArrangement[indexOfColor] === currentColor)) {
                rowOfFour.forEach(indexOfColor => currentColorArrangement[indexOfColor] = '')
            }
        }
    }
    //check for rows of three of the same color
    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const currentColor = currentColorArrangement[i]
            //preventing check repeating for every last two squares of every row
            const notValid = [7, 8, 15, 16, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            if (notValid.includes(i)) continue
            if (rowOfThree.every(indexOfColor => currentColorArrangement[indexOfColor] === currentColor)) {
                rowOfThree.forEach(indexOfColor => currentColorArrangement[indexOfColor] = '')
            }
        }
    }

    //move blank colors down and generate new colors replacing the removed ones
    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && currentColorArrangement[i] === '') {
                let randomNumber = Math.floor(Math.random() * candyColors.length)
                currentColorArrangement[i] = candyColors[randomNumber]
            }
            if (currentColorArrangement[i + boardWidth] === '') {
                currentColorArrangement[i + boardWidth] = currentColorArrangement[i]
                currentColorArrangement[i] = ''
            }
        }

    }
    //drag and drop functions
    const dragStart = (event) => {
        setCandyBeingDragged(event.target)
        console.log("dragStarted")
    }
    const dragDrop = (event) => {
        setCandyBeingReplaced(event.target)
        console.log("dragDropped")
    }
    const dragEnd = (event) => {
        console.log("dragEnded")
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
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])

    return (<div className="app">
        <div className="game">
            {currentColorArrangement.map((candyColor, index) => {
                return (<img key={index} style={{backgroundColor: candyColor}} alt="colors"
                    //adding drag-drop functionality
                             data-id={index}
                             draggable={true}
                             onDragStart={dragStart}
                    // onDragOver={(e) => e.preventDefault()}
                    // onDragEnter={(e) => e.preventDefault()}
                    // onDragLeave={(e) => e.preventDefault()}
                             onDrop={dragDrop}
                             onDragEnd={dragEnd}

                />)
            })}

        </div>
    </div>);
}

export default App;
