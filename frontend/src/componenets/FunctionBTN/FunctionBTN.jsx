/* eslint-disable react/prop-types */
function FunctionBTN(props) {
  return (
    <div className={`bg-${props.color} flex justify-center w-[95%] rounded-2xl border-black border-2 hover:opacity-90`}>
    <button className={` text-${props.txtColor} lg:text-[1.75vh] text-[1.75vw] p-1 overflow-auto text-center rounded-2xl font-semibold `}>
        {props.type}
    </button></div>
  )
}

export default FunctionBTN