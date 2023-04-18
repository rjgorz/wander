import { useState } from "react";
import { Image, Modal, Button, Grid } from "semantic-ui-react";

function GroupImageModal({ image }) {
    const [open, setOpen] = useState(false);

    return (
        <Grid.Column>
            <Modal className='image_modal'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                    <Image className='journal_images' src={`/serve_image/${image.file_name}`} rounded fluid />
                }>
                <Modal.Content>
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
        </Grid.Column>
    )
}

export default GroupImageModal;