const Anthropic = require('@anthropic-ai/sdk');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
          return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt } = req.body;

    if (!prompt) {
          return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
          const client = new Anthropic({
                  apiKey: process.env.ANTHROPIC_API_KEY,
          });

      const message = await client.messages.create({
              model: 'claude-opus-4-5',
              max_tokens: 1024,
              messages: [
                {
                            role: 'user',
                            content: prompt,
                },
                      ],
      });

      res.status(200).json({
              result: message.content[0].text,
      });
    } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal server error' });
    }
};
