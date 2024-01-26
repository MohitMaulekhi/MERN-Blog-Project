/* eslint-disable react/prop-types */
function FunctionBTN(props) {
  return (
    <button className={` text-${props.txtColor} bg-${props.color}  w-[${props.width}] border-black border-2 hover:opacity-90 text-[1.5vw] md:text-[1.5vh] md:min-w-fit min-w-[14vw]  p-1 overflow-clip text-center rounded-2xl font-semibold `}>
        {props.type}
    </button>
  )
}

export default FunctionBTN