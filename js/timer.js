import { alarm } from "./alarm.js"
import { changeActiveBtn } from "./control.js"
import { state } from "./state.js"
import { addZero } from "./util.js"

const minutesElem = document.querySelector('.time__minutes')
const secondsElem = document.querySelector('.time__seconds')

export const showTime = (seconds) => {
    const min = Math.floor(seconds / 60)
    const sec = Math.floor(seconds % 60)

    minutesElem.textContent = addZero(min)
    secondsElem.textContent = addZero(sec)
}

export const startTimer = () => {
    state.timeLeft -= 1

    showTime(state.timeLeft)

    if (state.timeLeft > 0 && state.isActive) {
        state.timerId = setTimeout(startTimer, 1000)
    }

    if (state.timeLeft <= 0) {
        if (state.status === 'work') {
            state.activeTodo.pomodoro +=1

            if (state.activeTodo.pomodoro % state.count) {
                state.status = 'break'
            } else {
                state.status = 'relax'
            }

        } else {
            state.status = 'work'
        }

        alarm()
        state.timeLeft = state[state.status] * 60
        changeActiveBtn(state.status)
        startTimer()
    }
}