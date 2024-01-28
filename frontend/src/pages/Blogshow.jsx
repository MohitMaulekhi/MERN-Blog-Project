import {useParams} from 'react-router-dom';
function Blogshow() {
  const params = useParams()
  return (
    <div>
        blog {params.blogId}
        
    </div>
  )
}

export default Blogshow