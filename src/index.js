import jwt from "jsonwebtoken";

const KEY = 'somethingSECURE!';
const OPTIONS = { 
    expiresIn: '1h' 
};

function payloadCallback(payload) {
    if (payload.clientId !== '35jdvg39') {
        throw new Error("Invalid token payload (detected before token verification)");
    }
}

function generateMockTokenFromPayload(payload) {
    const token = jwt.sign(payload, KEY, OPTIONS);
    return token;
}

function main() {
    const invalidPayload = { clientId: null };
    const validPayload = { clientId: '35jdvg39' };

    const tokens = [
        generateMockTokenFromPayload(validPayload),
        generateMockTokenFromPayload(invalidPayload),
    ];

    for (const token of tokens) {
        try {
            const result = jwt.verify(token, KEY, OPTIONS, undefined, payloadCallback);
            console.log(`Successfully decoded payload: ${JSON.stringify(result)}`);
        } catch (error) {
            console.log(`Unsuccessful decode with error: ${error.message}`);
        }
    }

}

main();