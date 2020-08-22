import React, { useState, useEffect, useCallback } from "react"
import { Helmet } from "react-helmet"
import { disableBodyScroll } from "body-scroll-lock"
import store from "store-js"

import "./../css/style.css"
import Header from "./../components/Header"
import Timer from "./../components/Timer"
import Footer from "./../components/Footer"

import Play from "./../components/Play"
import useSound from "use-sound"
import tickSound from "./../sounds/tick-work.mp3"

export default function Home() {
  // Vars
  const workTime = 25 * 60 * 1000
  const breakTime = 5 * 60 * 1000
  const longBreakTime = 25 * 60 * 1000

  // Hooks
  const [pause, setPaused] = useState(false)
  const [skip, setSkip] = useState(false)
  const [finished, setFinished] = useState(0)

  const [timeLeft, setTimeLeft] = useState(
    store.get("time") ? new Date(store.get("time")) : new Date(workTime)
  )
  const [round, setRound] = useState(
    store.get("round") ? store.get("round") : 0
  )
  const [intervalId, setIntervalId] = useState(0)
  const [tmpIntervalId] = useState(0)
  const [session, setSession] = useState(
    store.get("session") ? store.get("session") : "work"
  )
  const [play] = useSound(tickSound)

  // Refs
  let backwardRef = React.createRef()
  let forwardRef = React.createRef()
  let skipRef = React.createRef()
  let resetRef = React.createRef()
  let playRef = React.createRef()
  let timerRef = React.createRef()

  // Store
  useEffect(() => {
    store.set("time", timeLeft.getTime())
    store.set("round", round)
    store.set("session", session)

    if (finished) store.clearAll()

    // reset on next day
    if (store.get("date")) {
      let [oldMonth, oldDate] = store.get("date").split("/")
      oldDate = parseInt(oldDate)
      oldMonth = parseInt(oldMonth)

      if (oldDate < new Date().getDate() || oldMonth < new Date().getMonth()) {
        store.clearAll()
        store.set("date", `${new Date().getMonth()}/${new Date().getDate()}`)
      }
    } else {
      store.set("date", `${new Date().getMonth()}/${new Date().getDate()}`)
    }
  }, [timeLeft, round, session, finished])

  // disable scroll
  useEffect(() => {
    disableBodyScroll(document)
  })
  // start pomadoro
  useEffect(() => {
    if (round < 12) {
      // Exit when time = 0
      if (timeLeft.getTime() < 0 || skip) {
        play()
        setSkip(false)
        if (session === "work") {
          setRound(round + 1)

          setSession(
            round !== 0 && (round + 1) % 4 === 0 ? "long break" : "break"
          )
          setTimeLeft(
            new Date(
              round !== 0 && (round + 1) % 4 === 0 ? longBreakTime : breakTime
            )
          )
        } else {
          setSession("work")
          setTimeLeft(new Date(workTime))
        }
        return
      }

      clearInterval(intervalId)

      setIntervalId(
        setInterval(() => {
          if (!pause) setTimeLeft(new Date(timeLeft.getTime() - 1000))
        }, 1000)
      )
    } else {
      setFinished(true)
      setPaused(true)
    }

    return () => clearInterval(intervalId)
  }, [round, session, timeLeft, pause])

  // backward, forward, skip, reset onclick
  useEffect(() => {
    const back = backwardRef.current
    const next = forwardRef.current
    const skip = skipRef.current
    const reset = resetRef.current
    const play = playRef.current
    const timer = timerRef.current
    let interval

    timer.onclick = function () {
      setPaused(prev => !prev)
    }
    play.onclick = function () {
      setPaused(prev => !prev)
    }
    skip.onclick = function () {
      setPaused(true)
      setSkip(prev => !prev)
      setPaused(false)
    }
    reset.onclick = function () {
      setRound(0)
      setTimeLeft(new Date(workTime))
      setSession("work")
      setFinished(false)
      setPaused(false)
    }
    next.onclick = function () {
      setTimeLeft(new Date(timeLeft.getTime() + 60000))
    }
    back.onclick = function () {
      setTimeLeft(
        new Date(
          timeLeft.getTime() - 60000 >= 0
            ? timeLeft.getTime() - 60000
            : timeLeft.getTime()
        )
      )
    }

    return () => {
      clearInterval(tmpIntervalId)
      clearInterval(interval)
    }
  }, [timeLeft, pause, tmpIntervalId])

  const playPause = paused => {
    if (paused === true) {
      setPaused(true)
    } else if (paused === false) {
      setPaused(false)
    } else {
      setPaused(!pause)
    }
  }

  const handleKeyDown = useCallback(event => {
    // pause ---> Space
    if (event.code === "Space") {
      setPaused(prev => !prev)
    } //reset ---> Ctrl + Enter
    else if (event.ctrlKey && event.code === "Enter") {
      setRound(0)
      setTimeLeft(new Date(workTime))
      setSession("work")
      setFinished(false)
      setPaused(false)
    }
    // skip ---> Enter
    else if (event.code === "Enter") {
      setPaused(true)
      setSkip(prev => !prev)
      setPaused(false)
    } else if (event.code === "ArrowRight") {
    } else if (event.code === "ArrowLeft") {
      backwardRef.current && backwardRef.current.click()
      setTimeLeft(prev => new Date(prev - 60000))
    }
  })

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {})

  return (
    <div
      id="app"
      className={
        session === "work"
          ? "h-screen bg-red-600"
          : session === "break"
          ? "h-screen bg-blue-600"
          : "h-screen bg-longBreak"
      }
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pomadoro 🍅</title>
      </Helmet>
      <Header skipRef={skipRef} resetRef={resetRef} />
      <div id="timer-wrapper" className="lg:m-30">
        <Timer timerRef={timerRef} date={timeLeft} finished={finished} />
      </div>
      <Play
        playRef={playRef}
        backwardRef={backwardRef}
        forwardRef={forwardRef}
        paused={pause}
      />
      <Footer round={round} />
    </div>
  )
}
