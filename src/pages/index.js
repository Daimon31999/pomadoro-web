import React, { useState, useEffect, useCallback } from "react"
import { Helmet } from "react-helmet"

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

  const [timeLeft, setTimeLeft] = useState(new Date(workTime))
  const [round, setRound] = useState(0)
  const [intervalId, setIntervalId] = useState(0)
  const [tmpIntervalId] = useState(0)
  const [session, setSession] = useState("work")
  const [play] = useSound(tickSound)

  // Refs
  let backwardRef = React.createRef()
  let forwardRef = React.createRef()

  // pomadoro
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

  // backward forward buttons onclick
  useEffect(() => {
    const back = backwardRef.current
    const next = forwardRef.current
    let interval

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
    if (event.code === "Space") {
      setPaused(prev => !prev)
    } else if (event.code === "Enter") {
      setPaused(true)
      setSkip(prev => !prev)
      setPaused(false)

      // setTimeLeft(prev => new Date(prev + 1000))
    } else if (event.code === "ArrowRight") {
      // setTimeLeft(prev => new Date(prev + 1000))
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
        <title>Pomadoro Lite🍅</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Header
        skip={() => {
          setPaused(true)
          setSkip(prev => !prev)
          setPaused(false)
        }}
      />
      <div className="md:m-30 sm:m-10 ">
        <Timer date={timeLeft} finished={finished} />
      </div>
      <Play
        playPause={playPause}
        backwardRef={backwardRef}
        forwardRef={forwardRef}
        paused={pause}
      />
      <Footer round={round} />
    </div>
  )
}
