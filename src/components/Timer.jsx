import React from "react"

export default function Timer(props) {
  let prompt = ""
  if (!props.finished) {
    prompt = `${props.date.getMinutes()}:${props.date.getSeconds()}`
    // prompt = `${props.date.toString()}`
  } else {
    prompt = `<span class="text-red-600">F</span> 
       <span class="text-orange-600">i</span> 
       <span class="text-yellow-600">n</span> 
       <span class="text-green-600">i</span>
       <span class="text-teal-600">s</span> 
       <span class="text-blue-600">h</span>
       <span class="text-indigo-600">e</span> 
       <span class="text-purple-600">d</span> 
       <span class="text-pink-600">!</span>`
  }
  return (
    <div
      ref={props.timerRef}
      id="timer"
      className={`text-white text-center mt-6 md:mt-16 ${
        props.finished
          ? "text-5xl md:text-7xl font-futura-med"
          : "text-8xl md:text-11xl lg:text-9xl "
      }`}
    >
      <p className="uppercase" dangerouslySetInnerHTML={{ __html: prompt }}></p>
    </div>
  )
}
