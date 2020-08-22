import React from "react"

export default function Header(props) {
  return (
    <div className="flex flex-row justify-between lg:px-40 sm:px-10 xl:pt-4 pt-8 text-white p-2 text-2xl text-center font-futura-bold">
      <p
        ref={props.resetRef}
        className="cursor-pointer hover:text-gray-200 ml-10"
      >
        Reset
      </p>
      <p
        ref={props.skipRef}
        className="cursor-pointer hover:text-gray-200 mr-10"
      >
        Skip
      </p>
    </div>
  )
}
