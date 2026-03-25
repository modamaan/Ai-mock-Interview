// // utils/LlamaAIModal.js
// import axios from 'axios';

// const apiKey = process.env.NEXT_PUBLIC_LLAMA_API_KEY;
// const apiUrl = 'https://api.llama.ai/v1/generate';

// const llamaInstance = axios.create({
//   baseURL: apiUrl,
//   headers: {
//     'Authorization': `Bearer ${apiKey}`,
//     'Content-Type': 'application/json'
//   }
// });

// const generationConfig = {
//   temperature: 1,
//   top_p: 0.95,
//   top_k: 64,
//   max_tokens: 8192,
// };

// const safetySettings = [
//   {
//     category: "harassment",
//     threshold: "low",
//   },
//   {
//     category: "hate_speech",
//     threshold: "low",
//   },
// ];

// export const startChat = async (inputPrompt) => {
//   try {
//     const response = await llamaInstance.post('/chat', {
//       prompt: inputPrompt,
//       generation_config: generationConfig,
//       safety_settings: safetySettings,
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error generating response from LLaMA API:', error);
//     throw error;
//   }
// };
