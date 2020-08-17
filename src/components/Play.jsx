import React from "react"

export default function Play(props) {
  return (
    <div className="text-white uppercase text-xl flex text-center justify-center">
      <div className="mt-20">
        <div
          id="play-button"
          className="rounded-full h-20 w-20 flex items-center justify-center bg-white transition-all bg-opacity-25 border-white border-2 hover:bg-opacity-50"
          onClick={props.playPause}
        >
          <div
            id="triangle"
            className={"ml-2 bg-white bg-opacity-100 " + props.paused}
          ></div>
        </div>
      </div>
    </div>
  )
}
