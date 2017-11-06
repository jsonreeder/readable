import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = timestamp => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

const VoteScore = ({ postId, score, upVotePost, downVotePost }) => {
  return (
    <figure className="media-left">
      <ul>
        <li>
          <a className="button is-white" onClick={() => upVotePost(postId)}>
            <span className="icon is-small">
              <i className="fa fa-arrow-up" />
            </span>
          </a>
        </li>
        <li>
          {score}
        </li>
        <li>
          <a className="button is-white" onClick={() => downVotePost(postId)}>
            <span className="icon is-small">
              <i className="fa fa-arrow-down" />
            </span>
          </a>
        </li>
      </ul>
    </figure>
  );
};

export const PostList = ({ posts, upVotePost, downVotePost }) => {
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
      key={p.id}
      post={p}
      upVotePost={upVotePost}
      downVotePost={downVotePost}
    />,
  );

  return postComponents;
};

export const Post = ({
  post: { author, body, category, commentCount, id, timestamp, voteScore },
  upVotePost,
  downVotePost,
}) =>
  <article className="media">
    <VoteScore
      postId={id}
      score={voteScore}
      upVotePost={upVotePost}
      downVotePost={downVotePost}
    />
    <div className="media-content">
      <div className="content">
        <Link to={`posts/${id}`}>
          <p>
            {body}
          </p>
        </Link>
        <p>
          Submitted on <strong>{formatDate(timestamp)}</strong> by{' '}
          <strong>{author}</strong> to{' '}
          {
            <Link to={`/categories/${category}`}>
              {category}
            </Link>
          }
        </p>
      </div>
    </div>
  </article>;

export const Tabs = ({ categories, current }) => {
  const categoryNames = categories ? categories.map(c => c.name) : [];
  const tabs = ['all', ...categoryNames];

  return (
    <div className="tabs is-boxed is-large">
      <ul>
        {tabs.map(t =>
          <li className={t === current ? 'is-active' : ''} key={t}>
            <Link to={t === 'all' ? '/' : `/categories/${t}`}>
              {t}
            </Link>
          </li>,
        )}
      </ul>
    </div>
  );
};
