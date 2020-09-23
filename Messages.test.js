import { groupMessagesByAuthor } from './Messages'

const user = {
  name: 'Harper H',
  avatar: 'https://randomuser.me/api/portraits/women/76.jpg',
  from: 'user',
}

const agent = {
  name: 'Randy G',
  avatar: 'https://randomuser.me/api/portraits/women/76.jpg',
  from: 'agent',
}

const messages = [
  { author: user, text: 'Hey there', timestamp: '2020-03-25T13:04:30Z' },
  { author: user, text: 'I need some help por favor', timestamp: '2020-03-25T13:04:45Z' },
  { author: agent, text: 'Hello!', timestamp: '2020-03-25T13:05:45Z' },
  { author: agent, text: 'Sure thing, what can I do for you?', timestamp: '2020-03-25T13:06:15Z' },
  { author: user, text: 'I need to pause my account for a couple of months. Is that possible?', timestamp: '2020-03-25T13:06:45Z' },
  { author: agent, text: 'Absolutely, you can put your account on hold for as long as you need.', timestamp: '2020-03-25T13:07:00Z' },
  { author: agent, text: 'Would you like me to do that for you now?', timestamp: '2020-03-25T13:08:15Z' },
]

describe('groupMessagesByAuthor tests', () => {
  it('should group consecutive messages from the same author', () => {
    const groupedMessages = groupMessagesByAuthor(messages)
    expect(groupedMessages).toHaveLength(4)
    expect(groupedMessages[0].author.name).toBe('Harper H')
    expect(groupedMessages[0].messages).toHaveLength(2)
    expect(groupedMessages[1].author.name).toBe('Randy G')
    expect(groupedMessages[1].messages).toHaveLength(2)
    expect(groupedMessages[2].author.name).toBe('Harper H')
    expect(groupedMessages[2].messages).toHaveLength(1)
    expect(groupedMessages[3].author.name).toBe('Randy G')
    expect(groupedMessages[3].messages).toHaveLength(2)
  })

  it('should return the grouped messages in the correct format', () => {
    const groupedMessages = groupMessagesByAuthor(messages)
    const firstGroup = groupedMessages[0]
    const expected = {
      author: {
        name: user.name,
        avatar: user.avatar,
        from: user.from,
      },
      messages: [
        {
          text: messages[0].text,
          timestamp: messages[0].timestamp,
        },
        {
          text: messages[1].text,
          timestamp: messages[1].timestamp,
        },
      ],
    }

    expect(firstGroup).toEqual(expected)
  })
})
