import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form } from "semantic-ui-react";
import UserContext from './Context';

function NewJournalForm({ addJournal, setShowForm, selectedState }) {
    const user = useContext(UserContext);

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title!"),
        visited_cities: yup.string().required("Must enter places visited!"),
        body: yup.string().required("Must enter a post!"),
        user_id: yup.number(),
        state_id: yup.number()
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            visited_cities: '',
            body: '',
            user_id: user.id,
            state_id: selectedState.id
        },

        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/user_journals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.ok) {
                    res.json().then(journal => {
                        addJournal(journal);
                        setShowForm(prev => !prev)
                    })
                }
            })
        },
    })

    return (
        <div id='journal-form'>
            <h1>FORM</h1>
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
                <br />
                <br />
                <Form.TextArea label='Post:' type='text' name='body' value={formik.values.body} onChange={formik.handleChange} />
                {formik.errors.body ? <div>{formik.errors.body}</div> : null}
                <br />

                <Form.Button type="submit">Submit</Form.Button>
            </Form>
        </div >
    )
}


export default NewJournalForm;