import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Modal, Header, Button, Icon } from "semantic-ui-react";
import UserContext from './Context';

function EditJournalModal({ journal, open, setOpen, setRefresh, handleEdit }) {
    const user = useContext(UserContext);

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title!"),
        duration: yup.number().required("Must enter a duration!"),
        visited_cities: yup.string().required("Must enter places visited!"),
        body: yup.string().required("Must enter a post!"),
        user_id: yup.number(),
        state_id: yup.number()
    })

    const formik = useFormik({
        initialValues: {
            title: journal.title,
            duration: journal.duration,
            visited_cities: journal.visited_cities,
            body: journal.body,
            user_id: journal.user_id,
            state_id: journal.state_id
        },

        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/user_journals/${journal.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.ok) {
                    res.json().then(journal => {
                        handleEdit(journal);
                        setRefresh(prev => !prev);
                        setOpen(false);
                    })
                }
            })
        },
    })

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Button inverted icon floated='right'>
                    <Icon size='small' name='edit' color='black' />
                </Button>
            }
        >
            <Modal.Header>
                <Header>Edit Journal:</Header>
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group>
                            <br />
                            <Form.Input label='Title:' type='text' name='title' value={formik.values.title} onChange={formik.handleChange} />
                            {formik.errors.title ? <div>{formik.errors.title}</div> : null}
                            <br />
                            <br />
                            <Form.Input label='Places Visited:' type='text' name='visited_cities' value={formik.values.visited_cities} onChange={formik.handleChange} />
                            {formik.errors.visited_cities ? <div>{formik.errors.visited_cities}</div> : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Duration (days):' type='number' name='duration' value={formik.values.duration} onChange={formik.handleChange} />
                            {formik.errors.duration ? <div>{formik.errors.duration}</div> : null}
                            <br />
                            <br />
                        </Form.Group>
                        <Form.TextArea label='Post:' type='text' name='body' value={formik.values.body} onChange={formik.handleChange} />
                        {formik.errors.body ? <div>{formik.errors.body}</div> : null}
                        <br />
                        <Form.Button type="submit">Submit</Form.Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="Close Window"
                    labelPosition='right'
                    icon='close'
                    onClick={() => setOpen(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default EditJournalModal;





