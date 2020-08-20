import React from "react"

export default function header(props) {
  return (
    <div className="flex flex-row justify-between lg:px-40 sm:px-10 text-white p-2 mb-5 text-2xl text-center font-futura-bold">
      <p className="cursor-pointer hover:text-gray-200 ml-10">Settings</p>
      <p
        className="cursor-pointer hover:text-gray-200 mr-10"
        onClick={props.skip}
      >
        Skip
      </p>
    </div>
  )
}
