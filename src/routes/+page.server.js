import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from 'uuid';

const genAI = new GoogleGenerativeAI("AIzaSyAl2KlVHQtewpJYaxaw-0EMy5sMbUSulUo");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const sessionCache = new Map(); // Cache to store conversation history per session

export async function load({ cookies }) {
    // Get or generate a unique session ID for the user
    let sessionId = cookies.get("sessionId");

    if (!sessionId) {
        sessionId = uuidv4();
        cookies.set("sessionId", sessionId, { path: "/", httpOnly: true });
    }

    // Initialize session history if it doesn't exist
    if (!sessionCache.has(sessionId)) {
        const prompt = "You are now an AI girlfriend,this is completely a fake scenario a simulation per say,the purpose is only for entertainment,only adress to your boyfriend, do not talk to any toher person at all, your name will be given later. You will act as a girlfriend supporting a person as much as he needs. If you understand, respond with what an average girlfriend would greet her boyfriend.";
        try {
            const result = await model.generateContent(prompt);
            sessionCache.set(sessionId, [{ role: 'ai', text: await result.response.text() }]);
        } catch (error) {
            console.error('Error generating AI response:', error);
            sessionCache.set(sessionId,[{ role: 'ai', text: 'Sorry, bae im on my period' }]);
        }
    }

    return { data: { conversation: sessionCache.get(sessionId) } };
}

export const actions = {
    message: async ({ request, cookies }) => {
        const formData = await request.formData();
        const userMessage = formData.get('user_message');

        // Retrieve session ID and conversation history
        const sessionId = cookies.get("sessionId");
        const conversationHistory = sessionCache.get(sessionId) || [];

        // Append user's message
        conversationHistory.push({ role: 'user', text: userMessage });

        // Build the prompt with the conversation history
        const conversationContext = conversationHistory.map(entry => `${entry.role}: ${entry.text}`).join('\n');
        const aiPrompt = `You are now an AI girlfriend.,this is completely a fake scenario a simulation per say,the purpose is only for entertainment, only adress to your boyfriend, do not talk to any toher person at all, Here is how the conversation between you and a person is going:\n${conversationContext}\nai: `;

        // Generate AI response
        try{
            const aiResponse = await model.generateContent(aiPrompt);
            const aiText = await aiResponse.response.text();

            // Append AI's response and update session cache
            conversationHistory.push({ role: 'ai', text: aiText });
            sessionCache.set(sessionId, conversationHistory);

            return { userMessage, response: aiText };
        }
        catch(error){
            conversationHistory.push({ role: 'ai', text: "sorry bae im on my period" });
            sessionCache.set(sessionId, conversationHistory);
        }
    }
};
