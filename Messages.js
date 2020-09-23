import React from 'react'

/**
 * Takes an array of raw messages and returns an array of message groups.
 */
export const groupMessagesByAuthor = messages => {
  const reducer = (acc, curr) => {
    if (acc.length && acc[acc.length - 1].author === curr.author) {
      const lastGroup = acc.pop()
      return [
        ...acc,
        {
          ...lastGroup,
          messages: [
            ...lastGroup.messages,
            {
              text: curr.text,
              timestamp: curr.timestamp,
            },
          ],
        },
      ]
    } else {
      return [
        ...acc,
        {
          author: curr.author,
          messages: [
            {
              text: curr.text,
              timestamp: curr.timestamp,
            },
          ],
        },
      ]
    }
  }

  return messages.reduce(reducer, [])
}

class Messages extends React.Component {
  render() {
    const groups = groupMessagesByAuthor(this.props.messages)
    const getMessageDateTime = timestamp => {
      return new Date(timestamp).toString()
    }

    return (
      <div className="Messages">
        {groups.map((group, index) => {
          const groupClassName = `chat-message-group is-${group.author.from}`

          return (
            <div className={groupClassName} key={index}>
              <img
                className="chat-message-author-avatar"
                src={group.author.avatar}
                alt={group.author.name}
              />
              <ul className="chat-message-bubbles">
                {group.messages.map((message, index) => (
                  <li
                    className="chat-message-bubble"
                    key={index}
                    title={getMessageDateTime(message.timestamp)}
                  >
                    {index === 0 ? (
                      <p className="chat-message-author-name">
                        {group.author.name}
                      </p>
                    ) : null}
                    {message.text}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Messages
