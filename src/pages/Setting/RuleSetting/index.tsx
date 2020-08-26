import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {Card} from "antd";
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_APP } from '../../../shared/graphql/app.gql';
export const RuleSetting = (props: {app: any}) => {
    const [updateApp, {data: league, loading: isUpdating, error: isFailed}] = useMutation(UPDATE_APP);

    // mutatation
    const handleEditorChange = (content: any, editor: any) => {
        console.log('Content was updated:', content);

        updateApp(
            {
                variables: {
                    id: props.app._id,
                    appInput: {
                        rules: content
                    }
                }
            }
        )
    };
    return (
        <Card title={"Rules"}>
            <Editor
                apiKey={"06zq3c4xhtwn57zwdzyrtz1i7klsey7iefzty44qgwdo7qj9"}
                initialValue={props.app.rules}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'image | table | undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={handleEditorChange}
            />
        </Card>
    );
};