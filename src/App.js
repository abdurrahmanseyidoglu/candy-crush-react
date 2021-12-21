import {useEffect, useState} from "react";

let width = 8
const candyColors = ["blue", "green", "orange", 'purple', "red", 'yellow']

function App() {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([])
    //check for columns of four of the same color
    const checkForColumnOfFour = () => {
        for (let i = 0; i < 36; i++) {
            const columnOfFour = [i, i + width, i + (width * 2), i + (width * 3)]
            const currentColor = currentColorArrangement[i]
            if (columnOfFour.every(indexOfColor => currentColorArrangement[indexOfColor] === currentColor)) {
                columnOfFour.forEach(indexOfColor => currentColorArrangement[indexOfColor] = '')
            }
        }
    }
    //check for columns of three of the same color
    const checkForColumnOfThree = () => {
        for (let i = 0; i < 47; i++) {
            const columnOfThree = [i, i + width, i + (width * 2)]
            const currentColor = currentColorArrangement[i]
            if (columnOfThree.every(indexOfColor => currentColorArrangement[indexOfColor] === currentColor)) {
                columnOfThree.forEach(indexOfColor => currentColorArrangement[indexOfColor] = '')
            }
        }
    }
    //check for rows of four of the same color

    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2,i+3]
            const currentColor = currentColorArrangement[i]
            //preventing check repeating for every last three squares of every row
            const notValid = [6,7, 8,14, 15, 16,21, 22, 23,29, 30, 31, 37,38, 39,45, 46, 47, 53,54, 55,62, 63, 64]
            if(notValid.includes(i)) continue
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
            if(notValid.includes(i)) continue
            if (rowOfThree.every(indexOfColor => currentColorArrangement[indexOfColor] === currentColor)) {
                rowOfThree.forEach(indexOfColor => currentColorArrangement[indexOfColor] = '')
            }
        }
    }

    //creating an array of 8*8 = 64 square each one is a random color from the candyColors array
    const createBoard = () => {
        const randomColorArrangement = []
        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
            randomColorArrangement.push(randomColor)
        }
        setCurrentColorArrangement(randomColorArrangement)
    }
    //using effect without dependencies to run the "createBoard()" function only once (when rendering is finished)
    useEffect(() => {
        createBoard()
    }, [])

    //call checkForColumnOfThree when the component gets mount and keep calling it every 100 ms
    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour()
            checkForColumnOfFour()
            checkForColumnOfThree()
            checkForRowOfThree()

            setCurrentColorArrangement([...currentColorArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColumnOfFour,checkForRowOfFour, checkForColumnOfThree,checkForRowOfThree, currentColorArrangement])

    console.log(currentColorArrangement)
    return (<div className="app">
        <div className="game">
            {currentColorArrangement.map((candyColor, index) => {
                return (<img key={index} style={{backgroundColor: candyColor}}/>)
            })}

        </div>
    </div>);
}

export default App;
