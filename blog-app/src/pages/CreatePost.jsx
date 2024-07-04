import { useState, useEffect } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db, auth } from "../firebase-config"
import { useNavigate } from "react-router-dom"

const CreatePost = ({ isAuth }) => {

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("")

  let navigate = useNavigate()

  const postCollectionRef = collection(db, "posts")
  const CreatePost = async () => {
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid } 
    })
    navigate('/')
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [])

  return (
    <div className='createPostPage'>

      <div className='cpContainer'>
        <h1>Create New Post</h1>
        <div className='inputGp'>
          <label htmlFor="">Title:</label>
          <input type="text" placeholder='Title...'
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          />
        </div>
        <div className='inputGp'>
          <label htmlFor="">Post:</label>
          <textarea name="" placeholder='Post...' id="" cols="30" rows="10" 
          onChange={(e) => {
            setPostText(e.target.value);
          }}/>
        </div>
        <button onClick={CreatePost}>Submit Post</button>
      </div>
    </div>
  )
}

export default CreatePost