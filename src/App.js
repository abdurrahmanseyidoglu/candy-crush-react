import {useEffect, useState} from "react";

let width = 8
const candyColors = [
    "blue",
    "green",
    "orange",
    'purple',
    "red",
    'yellow'
]

function App() {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([])

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

    console.log(currentColorArrangement)
    return (
        <div className="app">
            <div className="game">
                {
                    currentColorArrangement.map((candyColor, index) => {
                        return (
                            <img key={index} style={{backgroundColor: candyColor}} alt="a candy piece"/>
                        )
                    })
                }

            </div>
        </div>
    );
}

export default App;
