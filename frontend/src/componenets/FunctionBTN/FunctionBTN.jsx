/* eslint-disable react/prop-types */
function FunctionBTN(props) {
  return (
    <div className={`bg-${props.color} flex justify-center w-[95%] rounded-2xl border-black py-[0.5vh] border-2 hover:bg-slate-400`}>
    <button className={` text-${props.txtColor} lg:text-[1.75vh] text-[1.75vw] overflow-auto text-center rounded-2xl font-semibold `}>
        {props.type}
    </button></div>
  )
}

export default FunctionBTN