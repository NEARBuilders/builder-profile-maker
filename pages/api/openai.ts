import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided" });
    }

    try {
      const openai = new OpenAI();
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a intelligent assistant which only responds a 'Profile About Me' section from given user prompt. Do not send the response in markdown. Only send the actual content and DO NOT ADD 'Profile About Me: ' before it.
            If there are emojis in the prompt, please keep them in the response, or add them if they improve the content.
            If the response comes in following format:
            "🔭 I'm currently working on 
            👯 I'm looking to collaborate on
            🤝 I'm looking for help with
            🌱 I'm currently learning
            💬 Ask me about
            ⚡ Fun fact"
            then enhance it.
            `
          },
          {
            role: "user",
            content: `Hey, I want to create a user profile from the following prompt: ${prompt}.`
          }
        ]
      });

      return res.status(200).json(completion.choices[0].message.content);
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
