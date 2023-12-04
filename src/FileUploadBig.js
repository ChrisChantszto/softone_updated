import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import amplifyconfig from './amplifyconfiguration.json';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

Amplify.configure(amplifyconfig);

function FileUploadBig() {
    const [uploadSuccessful, setUploadSuccessful] = useState(false);
    const [uploadedFileKey, setUploadedFileKey] = useState(null); // Add this state variable
    const [lambdaResponse, setLambdaResponse] = useState(null); // Add this state variable

    const handleUploadSuccess = ({ key }) => {
        console.log(`File uploaded successfully with key: ${key}`);
        setUploadSuccessful(true);
        setUploadedFileKey(key); // Store the file key when upload is successful
    };

    const handleButtonClick = async () => {
        console.log("Button clicked, invoking Lambda function...");
    
        const s3BucketName = 'textractsaofdisdafs172532-staging'; // Replace with your bucket name
    
        // Construct the API Gateway URL
        const url = `https://eqmgepw8ad.execute-api.us-east-1.amazonaws.com/staging`;
    
        // Here, invoke your Lambda function via the API Gateway
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bucket: s3BucketName,  // Pass the bucket name
                    key: `public/${uploadedFileKey}`,  // Pass the uploaded file key
                }),
            });
    
            const data = await response.json();
            console.log("Lambda function response: ", data);
            setLambdaResponse(data);
        } catch (error) {
            console.error("Error invoking Lambda function: ", error);
        }
    };

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(lambdaResponse);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, 'textract-data.xlsx');
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
            {lambdaResponse && (
                <button onClick={handleExport}>
                    Export Data to Excel
                </button>
            )}
        </div>
    );
};

export default FileUploadBig;