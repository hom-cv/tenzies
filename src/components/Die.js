import react from "react"

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld?"#59E391": "white"
    }

    const classNames = ["die--1", "die--2", "die--3", "die--4", "die--5", "die--6"]

    const dotsArray = generateDots(props.value)

    function generateDots() {
        let outputDots = []
        for (let i = 0; i < props.value; i++) {
            outputDots.push(<span class="dot"></span>)
        }
        return outputDots
    }

    return (
        <div className={`die--${props.value}`} style={styles} onClick={props.holdDice}>
            {dotsArray}
        </div>
    )
}