import React, { useState } from 'react';
import EditJournalModal from './EditJournalModal';
import ImageModal from './ImageModal';
import AddImagesModal from './AddImagesModal';
import { Card, Icon, Divider, Button, Image, Popup, Container } from 'semantic-ui-react';

function AllJournalEntry({ journal, handleDelete, handleEdit, setRefresh, images, setImages }) {
    const [open, setOpen] = useState(false);
    const { title, duration, visited_cities, body, state } = journal;

    const filteredImages = images.filter(image => journal.id === image.journal_id);

    const imageCards = filteredImages.map(image => {
        return <ImageModal key={image.id} image={image} setRefresh={setRefresh} setImages={setImages} />
    });

    return (
        <Card raised>
            <Card.Content>
                <Card.Header as='h1'>
                    <Icon name='plane' />
                    {title}
                    <AddImagesModal journal={journal} setRefresh={setRefresh} images={images} setImages={setImages} />
                    <EditJournalModal journal={journal} open={open} setOpen={setOpen} handleEdit={handleEdit} setRefresh={setRefresh} />
                    <Button inverted icon floated='right' onClick={() => handleDelete(journal.id)}>
                        <Popup content='Delete Journal' offset={[28, 0]} trigger={
                            <Icon size='small' name='trash alternate outline' color='black' />
                        } />
                    </Button>
                </Card.Header>
                <Divider />
                <Card.Meta>
                    {state.name + ' - ' + visited_cities + ' | ' + duration + ' days'}
                </Card.Meta>
                <Card.Description style={{ margin: '10px 0 20px 0' }}>
                    {body}
                </Card.Description>
                <Container textAlign='center'>
                    <Image.Group size='small'>
                        {imageCards}
                    </Image.Group>
                </Container>
            </Card.Content>
        </Card>
    )
}

export default AllJournalEntry;