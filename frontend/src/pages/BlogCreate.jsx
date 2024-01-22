import { Editor } from '@tinymce/tinymce-react';
import { useState,useRef } from 'react';
import { FunctionBTN } from '../componenets/index.js'
function BlogCreate() {
  const [image, setImage] = useState("")
  const [title,setTitle] = useState("")
  const editorRef = useRef(null)
  const inputRef = useRef(null)
  const handleClick = () => {
    inputRef.current.click();
  }
  const handleChange = (event) => {
    setImage(event.target.files[0])
  }
  const clickedSubmit = ()=>{
    console.log(editorRef.current.getContent(),image[0],title)
  }
  return (
    <div className="min-h-screen min-w-[100vw] flex justify-center items-center ">
      <div className='w-[90vw] border-black rounded-xl border-4 py-[2vh] px-[1vw]'>
        <div className='h-[8vh]'>
        <h6 className='font-bold text-[4vh]'>Title:- <input className='focus:outline-none border-black text-gray-900 border-b-4 w-[40vw] text-[3.5vh]' placeholder='Enter Title' type="text" value={title} onChange={(e)=>(setTitle(e.target.value))} /></h6>
        </div>
          <div className='my-[4vh]'><Editor
        apiKey='naokvvci176874ex26f8nls7i9iblrdsfblxpvq7c4lmq6na'
        onInit={(evt, editor) => editorRef.current = editor}
        init={{
          menubar: false,
          plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        }}
        initialValue="<b>Learn from everyone!!!<b/>"
      /></div>
      <div className=" my-[1vh] w-[90vw]" onClick={handleClick} >
          <button>
            <div className=' h-[13vh] w-[13vh]  bg-cover hover:opacity-50' style={image?{backgroundImage:`url(${URL.createObjectURL(image)})`}:{backgroundImage:`url(../src/assests/emptyImage.png)`}}></div>
            <input type="file" ref={inputRef} onChange={handleChange} style={{ display: "none" }} accept="image/png, image/jpeg, image/jpg image/webp" />
          </button>
          
        </div>
        <div className='w-[90vw] flex cursor-pointer' onClick={clickedSubmit}><FunctionBTN type = "Submit" color="black" txtColor="white" /></div>
        </div>
      
    </div>
  )
}

export default BlogCreate