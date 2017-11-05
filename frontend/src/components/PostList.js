import React from 'react';
import { Post } from './helpers';

const PostList = ({ posts }) => posts.map(p => <Post key={p.id} post={p} />);
