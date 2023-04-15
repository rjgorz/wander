import React, { useState, useEffect } from 'react';
import { Card, Icon, Divider, Container, Grid } from 'semantic-ui-react';
import GroupImageModal from './GroupImageModal';

function GroupJournalEntry({ journal, groupUser }) {
    const [userImages, setUserImages] = useState([]);
    const { title, duration, visited_cities, body, state } = journal;

    useEffect(() => {
        fetch(`/images/${groupUser.id}`).then((r) => {
            if (r.ok) {
                r.json().then((imageData) => setUserImages(imageData))
            }
        })
    }, [groupUser.id]);

    const filteredImages = userImages.filter(image => journal.id === image.journal_id);

    const imageCards = filteredImages.map(image => {
        return <GroupImageModal key={image.id} image={image} />
    });

    return (
        <Card raised className='group_journal'>
            <Card.Content>
                <Card.Header icon as='h1'>
                    <Icon name='plane' />
                    {title}
                </Card.Header>
                <Divider />
                <Card.Meta>
                    {state.name + ' - ' + visited_cities + ' | ' + duration + ' days'}
                </Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
                <Container textAlign='center'>
                    <Grid columns={4}>
                        {imageCards}
                    </Grid>
                </Container>
            </Card.Content>
        </Card>
    )
}

export default GroupJournalEntry;