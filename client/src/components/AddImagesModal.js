import React, { useContext, useState } from "react";
import { Modal, Button, Icon, Form, Header, Popup } from "semantic-ui-react";
import UserContext from "./Context";

function AddImagesModal({ journal, setRefresh, images, setImages }) {
    const user = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    function handleFileInput(event) {
        setSelectedFiles(event.target.files);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const files = [...selectedFiles];
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }

        fetch(`/images_upload/${user.id}/${journal.id}`, {
            method: 'POST',
            body: formData
        }).then((res) => {
            if (res.ok) {
                res.json().then(imageData => {
                    setImages([imageData, ...images]);
                    setRefresh(prev => !prev);
                    setOpen(false);
                })
            } else {
                console.log(res)
            }
        })
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Button icon inverted floated='right'>
                    <Popup content='Add Photos' offset={[31, 0]} trigger={
                        <Icon name="images" color='black' />
                    } />
                </Button>
            }
        >
            <Modal.Header>
                <Header>Add Photos:</Header>
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input label='Upload Images' type='file' name='files[]' accept="image/*" multiple onChange={handleFileInput} />
                        <Form.Button type="submit">Submit</Form.Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                
                <Button
                    content="Exit"
                    labelPosition='right'
                    icon='close'
                    onClick={() => setOpen(false)}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default AddImagesModal;