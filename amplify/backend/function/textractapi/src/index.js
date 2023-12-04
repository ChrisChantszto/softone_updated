const { TextractClient, AnalyzeDocumentCommand } = require("@aws-sdk/client-textract");

const textract = new TextractClient({ region: "us-east-1" }); // Replace with your region

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    // Extract the S3 object details from the event
    const s3BucketName = event.Records[0].s3.bucket.name;
    const s3ObjectKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    // Define parameters for Textract
    const params = {
        Document: {
            S3Object: {
                Bucket: s3BucketName,
                Name: s3ObjectKey,
            },
        },
        FeatureTypes: ['TABLES']
    };

    // Call Textract API
    try {
        const command = new AnalyzeDocumentCommand(params);
        const textractResponse = await textract.send(command);
        console.log(`Textract Response: ${JSON.stringify(textractResponse)}`);

        // Extract tables from the response
        const tables = textractResponse.Blocks.filter(block => block.BlockType === 'TABLE');
        console.log(`Extracted Tables: ${JSON.stringify(tables)}`);

        // Return the tables as the API response
        return {
            statusCode: 200,
            body: JSON.stringify(tables),
        };
    } catch (error) {
        console.log(`Error calling Textract: ${error}`);

        // Return the error as the API response
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Error calling Textract: ${error}` }),
        };
    }
};