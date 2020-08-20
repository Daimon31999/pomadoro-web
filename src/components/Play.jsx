import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBackward,
  faForward,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons"

export default function Play(props) {
  return (
    <div className="text-white uppercase text-xl flex flex-column text-center justify-center fixed bottom-32 lg-phone:bottom-40 md:bottom-42 w-full">
      <div className=" flex flex-row justify-around w-full">
        {/* < */}
        <div
          ref={props.backwardRef}
          id="backwardButton"
          className="rounded-button xl:hover:bg-opacity-50 md:w-24 md:h-24"
        >
          <div className="text-3xl md:text-4xl">
            <FontAwesomeIcon icon={faBackward} />
          </div>
        </div>
        {/* Play */}
        <div
          id="play-button"
          ref={props.playRef}
          className="rounded-button xl:hover:bg-opacity-50 md:w-24 md:h-24"
          onClick={props.playPause}
        >
          <div
            className={"text-3xl md:text-4xl " + (props.paused ? "ml-1" : "")}
          >
            <FontAwesomeIcon icon={props.paused ? faPlay : faPause} />
          </div>
        </div>

        {/* > */}
        <div
          ref={props.forwardRef}
          id="forwardButton"
          className="rounded-button xl:hover:bg-opacity-50 md:w-24 md:h-24"
        >
          <div className="text-3xl md:text-4xl ml-1">
            <FontAwesomeIcon icon={faForward} />
          </div>
        </div>
      </div>
    </div>
  )
}
