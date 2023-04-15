import React, { useState } from "react";
import { Image, Modal, Button, Icon } from "semantic-ui-react";

function ImageModal({ image, setRefresh, setImages }) {
    const [open, setOpen] = useState(false);

    function handleDeletePhoto() {
        fetch(`/image/${image.id}`, {
            method: 'DELETE',
        })
            .then(r => r.json())
            .then(r => {
                setOpen(false);
                setImages((imageData) =>
                    imageData.filter((item) => item.id !== image.id)
                );
                setRefresh(prev => !prev)
            })
    }

    return (
        <Modal className='image_modal'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Image className='journal_images' src={`/serve_image/${image.file_name}`} rounded fluid />
            }>
            <Modal.Content>
                <Button inverted icon floated='right' onClick={handleDeletePhoto}>
                    <Icon name='trash alternate' color='black' />
                </Button>
                <Image className='journal_image_modal' src={`/serve_image/${image.file_name}`} rounded />
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="Exit"
                    labelPosition='right'
                    icon='close'
                    onClick={() => setOpen(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default ImageModal;