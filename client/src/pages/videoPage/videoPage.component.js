import React, { useEffect, useState } from 'react';
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import RightSide from './rightSide.component';
function VideoPage(props) {
    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.video)
                    setVideo(response.data.video)
                } else {
                    alert('Failed to get video Info')
                }
            })
    }, [])


    if(Video.writer) {
        return (
            <Row>
                <Col lg={16} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '2rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>
    
                        <List.Item
                            actions={[ ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={<a href="https://ant.design">{Video.title}</a>}
                                description={Video.description}
                            />
                            <div></div>
                        </List.Item>
    
                    </div>
                </Col>
                <Col lg={8} xs={24}>
                    <div style={{marginTop: '2rem'}}>
                        <h2>Up next</h2>
                        <hr style={{marginRight: '4rem'}}/>
                    </div>
                    <RightSide />
    
                </Col>
            </Row>
        )
    
    } else {
        return(
            <div>Loading...</div>
        )
    }
    
    
    
    
}

export default VideoPage
