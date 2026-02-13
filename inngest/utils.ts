interface MessageContent {
  text: string;
}

interface Message {
  role: string;
  content?: string | MessageContent[];
}

interface Result {
  output: Message[];
}

export function lastAssistantTextMessageContent(result: Result): string | undefined {
  const lastAssistantTextMessageIndex = result.output.findLastIndex(
    (message) => message.role === "assistant"
  )

  const message = result.output[lastAssistantTextMessageIndex] 


  return message?.content ? typeof message.content === "string" ? message.content : message.content.map((c)=>c.text).join("") : undefined
}