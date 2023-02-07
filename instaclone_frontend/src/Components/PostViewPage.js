import React, { useEffect, useState } from 'react';
import "./Instaclone.css";
import { BsCamera, BsThreeDotsVertical} from "react-icons/bs";
import {FcLike} from "react-icons/fc"
import { BiImageAdd } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import axios from 'axios';

function PostViewPage() {
    const [userData, setUserData] = useState({
        "name": "",
        "location": "",
        "description": "",
        "postImage": ""
    })
    const [showDelete, setShowdelete] = useState(false)
    const [fetchedData, setFetchedData] = useState([]);

    const [showForm, setShowForm] = useState(false)
    const makePost = (e) => {
        e.preventDefault();
        const { name, location, description, postImage } = userData;
        console.log(postImage)
        fetch("http://localhost:8000/api/v1/posts", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { name, location, description, postImage }
            )
        }).then((res) => console.log(res))
            .catch((err) => console.log(err));

        setShowForm(false)
    }

    const getUserData = async () => {
        await fetch("http://localhost:8000/api/v1/posts", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then(result => setFetchedData(result.instapost))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getUserData()
        // console.log(fetchedData)
    }, []);

    const changeForm = () => {
        setShowForm(true)
    }
    const onChangeFile = (e) => {
        console.log(e.target.files[0])
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setUserData({ ...userData, [e.target.name]: reader.result })
        }
    }
    const onDataChange = (e) => {
        console.log(e.target.name)
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const deletePost = (id)=>{
        console.log(id)
        axios.delete(`http://localhost:8000/api/v1/posts/${id}`)
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    }
    const updateLikes = (id)=>{
        // console.log(new Date("06-08-1996"))
        console.log(id)
        axios.put(`http://localhost:8000/api/v1/posts/${id}`)
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    }
    return (
        <div id='container'>
            <div id='header'>
                <div className='header'>
                    <img src="https://parspng.com/wp-content/uploads/2021/09/INSTAGRAM-3.png" alt="logo" />
                    <div id='heading'>𝑰𝒏𝒔𝒕𝒂𝒄𝒍𝒐𝒏𝒆</div>
                </div>
                <div className='header'>
                    <BsCamera id='camera' onClick={changeForm} />
                </div>
            </div>
            <div id='posts'>
                {!showForm && fetchedData.length > 0 && <div id='data'>
                    {fetchedData.map((data, i) => {
                        return <div key={i} className="data">
                            <div className='cardHead'>
                                <div className='cardheadName'>
                                    <div className='name'>{data.name}</div>
                                    <div className='location'><GoLocation />{data.location}</div>
                                </div>
                                <div className='menu'><BsThreeDotsVertical onClick={()=>setShowdelete(!showDelete)}/>
                                {showDelete && <button onClick={()=>deletePost(data._id)}>Delete</button>}
                                </div>
                            </div>
                            <img src={data.postImage} alt="fetchedimg" className='fetchedimg' />
                            <div className='likesDate'>
                                <div className='likebtn'>
                                    <div className='like'><FcLike onClick={()=>updateLikes(data._id)}/></div>
                                    <div className='likes'>{data.likes}</div>
                                </div>
                                <div className='date'>{data.date.split(" ")[2] + " " + data.date.split(" ")[1] + " " + data.date.split(" ")[3]}</div>
                            </div>
                            <div className='description'>{data.description}</div>
                        </div>
                    })}
                </div>
                }
                {showForm &&
                    <div id='postData'>
                        <form action="#" onSubmit={(e) => makePost(e)} id='form'>

                            <input type="text"
                                name="name"
                                id="name"
                                placeholder='Enter your name'
                                value={userData.name}
                                onChange={(e) => onDataChange(e)}
                            />
                            <input type="text"
                                name="location"
                                id="location"
                                placeholder='Enter your location'
                                value={userData.location}
                                onChange={(e) => onDataChange(e)}
                            />
                            <input type="text"
                                name="description"
                                id="description"
                                placeholder='Description'
                                value={userData.description}
                                onChange={(e) => onDataChange(e)}
                            />
                            <label htmlFor="postImage">
                                <input type="file"
                                    name='postImage'
                                    id='postImage'
                                    onChange={(e) => onChangeFile(e)}
                                />
                                <BiImageAdd className='postImages' />
                            </label>
                            <button>Post</button>
                        </form>
                    </div>
                }
            </div>

        </div>
    )
}

export default PostViewPage