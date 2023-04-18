import { useContext } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { Form } from 'semantic-ui-react';
import UserContext from './Context';

function CreateGroup({ addGroup, setRefresh, setShowCreate }) {
    const user = useContext(UserContext);
    const formSchema = yup.object().shape({
        group_name: yup.string().required("Please enter a group name!")
    })

    const formik = useFormik({
        initialValues: {
            group_name: ''
        },

        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/groups", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.ok) {
                    res.json().then(group => {
                        addGroup(group);
                        user.groups.push(group);
                        fetch("/user_groups", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                user_id: user.id,
                                group_id: group.id
                            })
                        }).then((res) => {
                            if (res.ok) {
                                res.json().then(data => {
                                    setShowCreate(prev => !prev);
                                    setRefresh(prev => !prev);
                                })
                            }
                        })
                    })
                }
            })
        },
    })

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input width={4} label='Group Name:' type='text' name='group_name' value={formik.values.group_name} onChange={formik.handleChange} />
            {formik.errors.group_name ? <div className='error'>{formik.errors.group_name}</div> : null}
            <Form.Button type="submit">Submit</Form.Button>
        </Form>
    )
}

export default CreateGroup;