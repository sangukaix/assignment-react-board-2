const reactionList = [
  { id: 'like', icon: '👍', label: '좋아요' },
  { id: 'laugh', icon: '😂', label: '웃겨요' },
  { id: 'agree', icon: '👌', label: '동의해요' },
  { id: 'thanks', icon: '🙏', label: '감사해요' },
  { id: 'wow', icon: '😮', label: '놀라워요' },
]

function ReactionButtons({ reactions, onReaction }) {
  const totalReactions = reactionList.reduce((sum, reaction) => {
    return sum + (reactions[reaction.id] || 0)
  }, 0)

  return (
    <div className="reaction-wrap">
      {totalReactions > 0 && (
        <p className="reaction-total">총 {totalReactions}명이 반응했습니다.</p>
      )}

      <div className="reaction-list">
        {reactionList.map((reaction) => (
          <button
            type="button"
            key={reaction.id}
            className="reaction-button"
            onClick={() => onReaction(reaction.id)}
          >
            <span>{reaction.icon}</span>
            <strong>{reaction.label}</strong>
            <em>{reactions[reaction.id] || 0}</em>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ReactionButtons