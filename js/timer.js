import { alarm } from "./alarm.js"
import { state } from "./state.js"

const minutesElem = document.querySelector('.time__minutes')
const secondsElem = document.querySelector('.time__seconds')

const showTime = (seconds) => {
    const min = Math.floor(seconds / 60)
    const sec = Math.floor(seconds % 60)

    if (min < 10) {
        minutesElem.textContent = '0' + min
    } else {
        minutesElem.textContent = min
    }
    if (sec < 10) {
        secondsElem.textContent = '0' + sec
    } else {
        secondsElem.textContent = sec
    }

    
}

export const startTimer = () => {
    state.timeLeft -= 1

    showTime(state.timeLeft)

    if (state.timeLeft > 0 && state.isActive) {
        state.timerId = setTimeout(startTimer, 1000)
    }

    if (state.timeLeft <= 0) {
        alarm()
    }
}