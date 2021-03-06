import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = timestamp => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

const VoteScore = ({ postId, score, upVote, downVote, isComment }) => {
  return (
    <figure className="media-left">
      <ul>
        <li>
          <a className="button is-white" onClick={() => upVote(postId)}>
            <span className="icon is-small">
              <i className="fa fa-arrow-up" />
            </span>
          </a>
        </li>
        {!isComment &&
          <li className="level-item">
            {score}
          </li>}
        <li>
          <a className="button is-white" onClick={() => downVote(postId)}>
            <span className="icon is-small">
              <i className="fa fa-arrow-down" />
            </span>
          </a>
        </li>
      </ul>
    </figure>
  );
};

export const PostList = ({
  deletePost,
  downVotePost,
  posts,
  startEditingPost,
  upVotePost,
}) => {
  const noPosts = (
    <article>
      <em>There are no posts in this category.</em>
    </article>
  );
  if (!posts.length) {
    return noPosts;
  }

  const postComponents = posts.map(p =>
    <Post
      downVotePost={downVotePost}
      key={p.id}
      post={p}
      remove={deletePost}
      startEditingPost={startEditingPost}
      upVotePost={upVotePost}
    />,
  );

  return postComponents;
};

const EditDelete = ({ id, category, commentCount, edit, remove }) => {
  if (category) {
    return (
      <small>
        <a onClick={() => edit(id)}>edit</a> ·{' '}
        <a onClick={() => remove(id)}>delete</a> ·{' '}
        <Link to={`/${category}/${id}`}>{`comments (${commentCount})`}</Link>
      </small>
    );
  }
  return (
    <small>
      <a onClick={() => edit(id)}>edit</a> ·{' '}
      <a onClick={() => remove(id)}>delete</a>
    </small>
  );
};

export const Post = ({
  children,
  post: {
    author,
    body,
    category,
    commentCount,
    id,
    timestamp,
    title,
    voteScore,
  },
  downVotePost,
  startEditingPost,
  remove,
  upVotePost,
}) =>
  <article className="media">
    <VoteScore
      postId={id}
      score={voteScore}
      upVote={upVotePost}
      downVote={downVotePost}
    />
    <div className="media-content">
      <div className="content">
        <Link to={`/${category}/${id}`}>
          <p className="is-size-5">
            {title}
          </p>
        </Link>
        <p>
          {body}
        </p>
        <p>
          <small>
            Submitted on <strong>{formatDate(timestamp)}</strong> by{' '}
            <strong>{author}</strong> to{' '}
            {
              <Link to={`/${category}`}>
                {category}
              </Link>
            }
          </small>
          <br />
          <EditDelete
            edit={startEditingPost}
            category={category}
            commentCount={commentCount}
            id={id}
            remove={remove}
          />
        </p>
      </div>
      {children}
    </div>
  </article>;

export const Comment = ({
  comment: { author, body, category, commentCount, id, timestamp, voteScore },
  downVoteComment,
  remove,
  startEditingComment,
  upVoteComment,
}) =>
  <article className="media">
    <VoteScore
      postId={id}
      score={voteScore}
      upVote={upVoteComment}
      downVote={downVoteComment}
      isComment
    />
    <div className="media-content">
      <div className="content">
        <p>
          <strong>{author} </strong>
          {voteScore} points {formatDate(timestamp)}
        </p>
        <p>
          {body}
          <br />
          <EditDelete edit={startEditingComment} id={id} remove={remove} />
        </p>
      </div>
    </div>
  </article>;

export const Tabs = ({ categories, current }) => {
  const categoryNames = categories ? categories.map(c => c.name) : [];
  const tabs = ['all', ...categoryNames];
  const currentTab = current || 'all';

  return (
    <div className="tabs is-boxed is-large">
      <ul>
        {tabs.map(t =>
          <li className={t === currentTab ? 'is-active' : ''} key={t}>
            <Link to={t === 'all' ? '/' : `/${t}`}>
              {t}
            </Link>
          </li>,
        )}
      </ul>
    </div>
  );
};
