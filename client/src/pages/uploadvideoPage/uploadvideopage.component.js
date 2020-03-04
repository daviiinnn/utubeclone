import React, {useState, useEffect} from 'react';
import {Typography, Button, Form, message, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { response } from 'express';
import { set } from 'mongoose';

const {Title} = Typography;
const {TextArea} = Input;

const Private = [
    {value: 0, label: 'Private'},
    {value: 1, label: 'Public'}
];

const Category = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
    { value: 0, label: 'AV'}
];




function uploadvideopage() {

    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Privacy, setPrivacy] = useState(0);
    const [Categories, setCategories] = useState("Film & Animation");
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("");

    const handleChangeTitle = (event) =>{
        setTitle(event.currentTarget.value)
    }
    const handleChangeDescription = (event) =>{
        setDescription(event.currentTarget.value)
    }
    const handleChangePrivacy = (event) => {
        setPrivacy(event.currentTarget.value)
    }
    const handleChangeCategories = (event) => {
        setCategories(event.currentTarget.value)
    }
    const onSubmit = (event) =>{
        event.preventDefault();

        if(user.userData && !user.userData.isAuth){
            return alert('Please login first')
        }

        if(title === "" || Description === "" || Categories === "" ||
           FilePath === "" || Duration === "" || Thumbnail === "") {
            return alert('Please fill all the fields before submitting.')
           }
        
        const variables = {
            writer: user.userData._id,
            title: title,
            description: Description,
            privacy: privacy,
            filePath: FilePath,
            category: Categories,
            duration: Duration,
            thumbnail: Thumbnail
        }

        axios.post('/api/video/uploadvideo', variables)
        .then(response => {
            if(response.data.success){
                alert('Video uploaded successfully!')
                props.history.push('/')
            } else{
                alert('Failed to upload the video, please try again.')
            }
        })
    
        }

        const onDrop = (files) => {

            let formData = new FormData();
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }
            console.log(files)
            formData.append("file", files[0])
    
            axios.post('/api/video/uploadfiles', formData, config)
                .then(response => {
                    if (response.data.success) {
    
                        let variable = {
                            filePath: response.data.filePath,
                            fileName: response.data.fileName
                        }
                        setFilePath(response.data.filePath)
    
                        axios.post('/api/video/thumbnail', variable)
                            .then(response => {
                                if (response.data.success) {
                                    setDuration(response.data.fileDuration)
                                    setThumbnail(response.data.thumbsFilePath)
                                } else {
                                    alert('Failed to make the thumbnails');
                                }
                            })
    
    
                    } else {
                        alert('failed to save the video in server')
                    }
                })
    
        }
        return (
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Title level={2} > Upload Video</Title>
                </div>
    
                <Form onSubmit={onSubmit}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={800000000}>
                            {({ getRootProps, getInputProps }) => (
                                <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <Icon type="plus" style={{ fontSize: '3rem' }} />
    
                                </div>
                            )}
                        </Dropzone>
    
                        {Thumbnail !== "" &&
                            <div>
                                <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
                            </div>
                        }
                    </div>
    
                    <br /><br />
                    <label>Title</label>
                    <Input
                        onChange={handleChangeTitle}
                        value={title}
                    />
                    <br /><br />
                    <label>Description</label>
                    <TextArea
                        onChange={handleChangeDecsription}
                        value={Description}
                    />
                    <br /><br />
    
                    <select onChange={handleChangeOne}>
                        {Private.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <br /><br />
    
                    <select onChange={handleChangeTwo}>
                        {Catogory.map((item, index) => (
                            <option key={index} value={item.label}>{item.label}</option>
                        ))}
                    </select>
                    <br /><br />
    
                    <Button type="primary" size="large" onClick={onSubmit}>
                        Submit
                </Button>
    
                </Form>
            </div>
        )
}

export default uploadvideopage
