

function Button(props) {
  return (
    <div className="bg-mainBlue h-[6vh] flex w-[20vw] items-center justify-center rounded-full text-white font-semibold hover:bg-blue-800">
        <button>
            {props.type}
        </button>
    </div>
  )
}

export default Button