import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Button, Modal, Header } from "semantic-ui-react";
import UserContext from './Context';
import { Error } from "../styles";

function NewJournalForm({ addJournal, selectedState, setRefresh, open, setOpen }) {
    const user = useContext(UserContext);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errors, setErrors] = useState([]);

    function handleFileInput(event) {
        setSelectedFiles(event.target.files);
    }

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title!"),
        duration: yup.number().positive().min(1).required("Must enter a duration!"),
        visited_cities: yup.string().required("Must enter places visited!"),
        body: yup.string().required("Must enter a post!"),
        user_id: yup.number(),
        state_id: yup.number()
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            duration: 1,
            visited_cities: '',
            body: '',
            user_id: user.id,
            state_id: selectedState.id
        },

        validationSchema: formSchema,
        onSubmit: (values) => {
            setErrors([]);
            const files = [...selectedFiles];
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('files[]', files[i]);
            }

            for (const key of formData.entries()) {
                console.log(key[0] + ', ' + key[1])
            }

            fetch("/user_journals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.ok) {
                    res.json().then(journal => {
                        if (selectedFiles) {
                            fetch(`/images_upload/${user.id}/${journal.id}`, {
                                method: 'POST',
                                body: formData
                            }).then((res) => {
                                if (res.ok) {
                                    res.json().then(r => console.log(r))
                                } else {
                                    console.log(res)
                                }
                            })
                        }
                        addJournal(journal);
                        setRefresh(prev => !prev);
                        user.states.push(selectedState);
                        setOpen(false);
                    })
                } else {
                    
                    res.json().then((err) => setErrors([err.error]));
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
                <Button floated='left'>
                    Add New Journal
                </Button>
            }
        >
            <Modal.Header>
                <Header>New Journal Entry:</Header>
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Input label='Title:' type='text' name='title' value={formik.values.title} onChange={formik.handleChange} />
                        {formik.errors.title ? <div className='error'>{formik.errors.title}</div> : null}
                        <br />

                        <Form.Input label='Places Visited:' type='text' name='visited_cities' value={formik.values.visited_cities} onChange={formik.handleChange} />
                        {formik.errors.visited_cities ? <div className='error'>{formik.errors.visited_cities}</div> : null}
                        <br />

                        <Form.Group widths={8}>
                            <Form.Input label='Duration (days):' type='number' name='duration' value={formik.values.duration} onChange={formik.handleChange} />
                            {formik.errors.duration ? <div className='error'>{formik.errors.duration}</div> : null}
                            <br />

                        </Form.Group>
                        <br />

                        <Form.TextArea label='Post:' type='text' name='body' value={formik.values.body} onChange={formik.handleChange} />
                        {formik.errors.body ? <div className='error'>{formik.errors.body}</div> : null}
                        <br />

                        <Form.Input label='Upload Images' type='file' name='files[]' accept="image/*" multiple onChange={handleFileInput} />

                        {errors.map((err) => (
                            <Error key={err}>{err}</Error>
                        ))}

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


export default NewJournalForm;