import { useState } from 'react'

function ReactionButtons() {
  const [reactions, setReactions] = useState([
    { id: 1, icon: '👍', label: '좋아요', count: 0 },
    { id: 2, icon: '😂', label: '웃겨요', count: 2 },
    { id: 3, icon: '👌', label: '응원해요', count: 0 },
    { id: 4, icon: '🙏', label: '감사해요', count: 0 },
    { id: 5, icon: '😮', label: '놀라워요', count: 0 },
  ])

  const handleReactionClick = (reactionId) => {
    setReactions(reactions.map((reaction) => {
      if (reaction.id === reactionId) {
        return {
          ...reaction,
          count: reaction.count + 1,
        }
      }

      return reaction
    }))
  }

  return (
    <div className="reaction-list">
      {reactions.map((reaction) => (
        <button
          type="button"
          key={reaction.id}
          className="reaction-button"
          onClick={() => handleReactionClick(reaction.id)}
        >
          <span>{reaction.icon}</span>
          <strong>{reaction.label}</strong>
          <em>{reaction.count}</em>
        </button>
      ))}
    </div>
  )
}

export default ReactionButtons