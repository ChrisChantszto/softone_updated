import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import amplifyconfig from './amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

function FileUploadBig() {
    const [uploadSuccessful, setUploadSuccessful] = useState(false);
    const [uploadedFileKey, setUploadedFileKey] = useState(null); // Add this state variable

    const handleUploadSuccess = ({ key }) => {
        console.log(`File uploaded successfully with key: ${key}`);
        setUploadSuccessful(true);
        setUploadedFileKey(key); // Store the file key when upload is successful
    };

    const handleButtonClick = async () => {
        console.log("Button clicked, invoking Lambda function...");

        // Here, invoke your Lambda function via the API Gateway
        try {
            const response = await fetch("https://eqmgepw8ad.execute-api.us-east-1.amazonaws.com/staging", {
                method: 'POST', // or 'GET', depending on your API Gateway setup
                // include any necessary headers, like for authentication
                headers: {
                    'Content-Type': 'application/json',
                },
                // include the necessary body data, like the S3 key
                body: JSON.stringify({ key: uploadedFileKey }), // Use the stored file key here
            });
            const data = await response.json();
            console.log("Lambda function response: ", data);
        } catch (error) {
            console.error("Error invoking Lambda function: ", error);
        }
    };

    return (
        <div>
            <StorageManager
                acceptedFileTypes={['.jpeg', '.jpg', 'image/png', '.pdf']}
                accessLevel="public"
                maxFileCount={1}
                isResumable
                autoUpload={false}
                onUploadSuccess={handleUploadSuccess}
            />
            {uploadSuccessful && (
                <button onClick={handleButtonClick}>
                    Invoke Textract Lambda Function
                </button>
            )}
        </div>
    );
};

export default FileUploadBig;