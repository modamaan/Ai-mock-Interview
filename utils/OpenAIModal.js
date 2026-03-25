// import OpenAI from "openai";

// const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// if (!apiKey) {
//   throw new Error("The NEXT_PUBLIC_OPENAI_API_KEY environment variable is missing or empty.");
// }

// const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

// export const generateChatResponse = async (prompt) => {
//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "system", content: prompt }],
//     });

//     return completion.choices[0].message.content.trim();
//   } catch (error) {
//     console.error("Error generating chat response:", error);
//     throw error;
//   }
// };
