import React from 'react'

const CreatePost = () => {
  return (
    <div className='createPostPage'>

      <div className='cpContainer'>
        <h1>Create New Post</h1>
        <div className='inputGp'>
          <label htmlFor="">Title:</label>
          <input type="text" placeholder='Title...' />
        </div>
        <div className='inputGp'>
          <label htmlFor="">Post:</label>
          <textarea name="" placeholder='Post...' id="" cols="30" rows="10"></textarea>
        </div>
        <button>Submit Post</button>
      </div>
    </div>
  )
}

export default CreatePost