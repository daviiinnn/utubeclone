import React, { useEffect, useState } from 'react';
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import RightSide from './rightSide.component';
import SubscribeButton from './subscribeButton.component';
import Comments from './comments.component';
import LikeDislikes from './likeDislikes.component'
 
function VideoPage(props) {
    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
    const [CommentLists, setCommentLists] = useState([])

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

        axios.post('/api/comment/getComments', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log('response.data.comments',response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get video Info')
                }
            })


    }, [])

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }


    if(Video.writer) {
        return (
            <Row>
                <Col lg={16} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '2rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>
    
                        <List.Item
                            actions={[  <LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')}  />,
                                        <SubscribeButton theguy={Video.writer._id} subscribee={localStorage.getItem('userId')}/> ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={<h2>{Video.title}</h2>}
                                description={Video.description}
                            />
                            <div></div>
                        </List.Item>

                        <Comments CommentLists={CommentLists} postId={Video._id} refreshFunction={updateComment} />
    
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
