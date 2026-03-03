'use client';

import { timeAgo, cn, getInitials } from '@/lib/utils';
import { ArrowBigUp, ArrowBigDown, User, CornerDownRight, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface CommentData {
  id: string;
  content: string;
  isAnonymous: boolean;
  upvoteCount: number;
  downvoteCount: number;
  createdAt: string;
  isEdited: boolean;
  author?: {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string;
  };
  replies?: CommentData[];
}

interface CommentProps {
  comment: CommentData;
  depth?: number;
  onReply?: (parentId: string, content: string) => void;
  isLoggedIn?: boolean;
}

export function Comment({ comment, depth = 0, onReply, isLoggedIn }: CommentProps) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const score = comment.upvoteCount - comment.downvoteCount;

  const handleSubmitReply = () => {
    if (replyContent.trim() && onReply) {
      onReply(comment.id, replyContent.trim());
      setReplyContent('');
      setShowReplyInput(false);
    }
  };

  return (
    <div className={cn('animate-fade-in', depth > 0 && 'ml-6 pl-4 border-l-2 border-border')}>
      <div className="py-3">
        {/* Author info */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
          {comment.isAnonymous ? (
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" /> Anonymous
            </span>
          ) : comment.author ? (
            <span className="font-medium text-foreground">
              {comment.author.displayName || comment.author.username}
            </span>
          ) : null}
          <span>•</span>
          <time>{timeAgo(comment.createdAt)}</time>
          {comment.isEdited && <span className="italic">(edited)</span>}
        </div>

        {/* Content */}
        <p className="text-sm text-foreground leading-relaxed mb-2">{comment.content}</p>

        {/* Actions */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <button className="p-0.5 rounded hover:bg-accent hover:text-primary transition-colors">
              <ArrowBigUp className="w-4 h-4" />
            </button>
            <span className={cn(
              'font-medium tabular-nums',
              score > 0 ? 'text-primary' : score < 0 ? 'text-destructive' : ''
            )}>
              {score}
            </span>
            <button className="p-0.5 rounded hover:bg-accent hover:text-destructive transition-colors">
              <ArrowBigDown className="w-4 h-4" />
            </button>
          </div>

          {isLoggedIn && depth < 3 && (
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Reply
            </button>
          )}
        </div>

        {/* Reply input */}
        {showReplyInput && (
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitReply()}
              placeholder="Write a reply..."
              className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 bg-white"
            />
            <button
              onClick={handleSubmitReply}
              disabled={!replyContent.trim()}
              className="px-3 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              Reply
            </button>
          </div>
        )}
      </div>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      )}
    </div>
  );
}
