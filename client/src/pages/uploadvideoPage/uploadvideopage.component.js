import React, {useState, useEffect} from 'react';
import {Typography, Button, Form, message, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { response } from 'express';

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
    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>
                    Upload Video
                </Title>
            </div>
            
            <Form>
            <Dropzone 
                onDrop={acceptedFiles => console.log(acceptedFiles)}
                multiple={false}
                maxSize={800000000}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag and drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
            </Dropzone>
            </Form>
        </div>
    )
}

export default uploadvideopage
