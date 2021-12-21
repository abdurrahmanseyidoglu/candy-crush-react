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
            checkForColumnOfThree()

            setCurrentColorArrangement([...currentColorArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColumnOfFour, checkForColumnOfThree, currentColorArrangement])

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
