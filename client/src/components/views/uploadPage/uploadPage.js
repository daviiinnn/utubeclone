import React from 'react';
import {Typography, Button, Form, message, Input, icon} from 'antd';
import Dropzone from 'react-dropzone';

const { Title} = Typography;
const {TextArea} = Input;

function uploadPage() {
    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        </section>
                    )}
                </Dropzone>
                </div>
            </Form>
            
        </div>
    )
}

export default uploadPage;
