import React from "react"

export default function Footer(props) {
  return (
    <div className="flex flex-column justify-center text-black items-center uppercase fixed bottom-0 w-full md:h-32 bg-white font-futura-med">
      <div className="round-container text-center">
        <p className="round-label text-xl pt-2">round</p>
        <p className="round text-5xl">{props.round}</p>
      </div>
    </div>
    //   <div className="flex flex-column justify-center text-black items-center uppercase fixed bottom-0 w-full h-32 bg-white font-futura-med">
    //   <div className="round-container text-center">
    //     <p className="round-label text-xl">round</p>
    //     <p className="round text-5xl">{props.round}</p>
    //   </div>
    // </div>
  )
}
