async function runChat(prompt) {
  const calls = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'MyChatApp',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  const response = await calls.json();

  if (response.choices && response.choices.length > 0) {
    console.log("🤖:", response.choices[0].message.content);
    return response.choices[0].message.content;
  } else {
    console.error("❌ No response from model:",response);
    return null;
  }
}

export default runChat;
