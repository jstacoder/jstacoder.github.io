import React from 'react'

import { AddPostForm } from 'components/add-post-form'
import { PostProvider } from 'components/post-context'
import { PostList } from 'components/post-list'
import { GithubLayout } from 'components/github-layout'

export default ({ pageContext: { blogId, name } }) => {
  return (
    <GithubLayout title={name} backUrl={`/add-blog/`} backText={'blog list'}>
      <PostProvider blogId={blogId}>
        <AddPostForm />
        <PostList />
      </PostProvider>
    </GithubLayout>
  )
}
