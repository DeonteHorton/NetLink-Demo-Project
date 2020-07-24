import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'

const Blog = () => {
    const {postData,getData} = useState([])
    const placeHolder = 'https://via.placeholder.com/850x250'

    const Post = () =>{
        // const {title,img,username,text} = props.Member;
        const title_style = {
            color:'Black',
            fontWeight:'Bold'
        }
        const user_style = {
            color:'black',
            fontWeight:'200'
        }
        return (
            <>
            {/* contain all information from post */}
            <div className='box'>
                <h1 style={title_style}>Post Title</h1>
                <img src={placeHolder} />
                <h2 style={user_style}>Account Username</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis itaque laboriosam, ex ullam, amet ea delectus ducimus inventore deserunt excepturi consequuntur officiis. Itaque aliquid aperiam voluptatum corporis error ut animi dolore quo. Id ratione vel quia dolores quam itaque adipisci quaerat cum dolorem error necessitatibus facilis molestias rem voluptatibus praesentium, tempora vero maiores minima voluptates voluptatum nobis sed quos unde. Assumenda quo adipisci dolorum. Odit deserunt rem illo repellendus modi fuga eveniet porro ab omnis?</p>
                <Link className='null btn btn-primary' to='/post/id'>View Blog</Link>
            </div>
            </>
        )
    }
    return (
        <>
        <Header />
        <div className='wrapper'>
            <div className='container'>
                <div className='row'>
                    <Post />
                </div>
            </div>
        </div>
        </>
    )
}
export default Blog;