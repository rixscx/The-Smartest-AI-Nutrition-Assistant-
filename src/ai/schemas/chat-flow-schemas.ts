
import {z} from 'genkit';

export const UserMessageInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
});
export type UserMessageInput = z.infer<typeof UserMessageInputSchema>;

export const ChatbotResponseOutputSchema = z.object({
  response: z.string().describe('The AI chatbot response.'),
});
export type ChatbotResponseOutput = z.infer<typeof ChatbotResponseOutputSchema>;
