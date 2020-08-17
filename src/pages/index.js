import React from "react"
import "./../css/style.css"
import Header from "./../components/Header"
import Timer from "./../components/Timer"
import Footer from "./../components/Footer"
import Play from "./../components/Play"

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    // Time

    this.workTime = 25
    this.breakTime = 5
    this.longBreakTime = 25
    this.timerTime = this.workTime * 60 * 1000

    // Rounds
    this.roundsCount = 12

    this.state = {
      timePassed: 0, // in milliseconds
      session: "work", // work \ break \ long break
      date: new Date(this.timerTime),
      round: 0,
      paused: false,
      skip: false,
    }

    // Эта привязка обязательна для работы `this` в колбэке.
    this.tick = this.tick.bind(this)
    this.pomadoro = this.pomadoro.bind(this)
    this.playPause = this.playPause.bind(this)
    this.skip = this.skip.bind(this)
  }

  componentDidMount() {
    this.pomadoro()
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  async pomadoro() {
    while (this.state.round < 12) {
      console.log("$$$$$$$$$$$$$$$$$$$$$   work   $$$$$$$$$$$$$$$$$$$$$$$")

      this.timerID = await this.tick("work")

      this.setState({
        round: this.state.round + 1,
      })

      // long break
      if (this.state.round !== 0 && this.state.round % 4 === 0) {
        console.log(
          "$$$$$$$$$$$$$$$$$$$$$   long break   $$$$$$$$$$$$$$$$$$$$$$$"
        )

        this.timerID = await this.tick("long break")
      }
      // break
      else if (this.state.round !== 0) {
        console.log("$$$$$$$$$$$$$$$$$$$$$   break   $$$$$$$$$$$$$$$$$$$$$$$")

        this.timerID = await this.tick("break")
      }
      if (this.state.round === 12) {
        this.setState({
          finished: true,
        })
        console.log("fininshed !!")
      }
    }
  }

  tick(name) {
    return new Promise(resolve => {
      switch (name) {
        case "work":
          this.timerTime = this.workTime * 60 * 1000
          break

        case "break":
          this.timerTime = this.breakTime * 60 * 1000
          break

        case "long break":
          this.timerTime = this.longBreakTime * 60 * 1000
          break
        default:
          throw new Error()
      }

      this.setState({
        date: new Date(this.timerTime),
      })

      this.setState({
        session: `${name}`,
      })

      this.timerID = setInterval(() => {
        if (!this.state.paused) {
          console.log("timePassed", this.state.timePassed)
          console.log("date", this.state.date.getSeconds())
          console.log("round", this.state.round)
          console.log("session", this.state.session)
          console.log("finished", this.state.finished)

          // updates timer
          this.setState({
            timePassed: this.state.timePassed + 1000, // in milliseconds
            date: new Date(this.state.date.getTime() - 1000),
          })

          if (this.state.paused === true) {
            clearInterval(this.timerID)
          }

          // Time is 0 stop timer
          if (this.state.date.getTime() < 0 || this.state.skip === true) {
            clearInterval(this.timerID)
            resolve(1)
            console.log("interval cleared+++++++++")
            this.setState({
              timePassed: 0,
              skip: false,
            })
          }
        }
      }, 1000)
    })
  }

  playPause() {
    this.setState({
      paused: !this.state.paused,
    })

    console.log("paused ", this.state.paused)
  }

  skip() {
    this.setState({
      skip: true,
    })
    console.log("skip *********************", this.state.skip)
  }

  render() {
    return (
      <div
        className={
          this.state.session === "work"
            ? "h-screen bg-red-600"
            : this.state.session === "break"
            ? "h-screen bg-blue-600"
            : "h-screen bg-longBreak"
        }
      >
        <Header skip={this.skip} />
        <div className="md:m-30 sm:m-10 ">
          <Timer date={this.state.date} finished={this.state.finished} />
          <Play
            playPause={this.playPause}
            paused={this.state.paused ? "" : "paused"}
          />
        </div>
        <Footer round={this.state.round} />
      </div>
    )
  }
}

// # TODO Skip
