import { GetStaticPathsResult, GetStaticPropsResult, GetStaticPropsContext } from 'next';

type Post = {
  id: string;
  title: string;
};

type PostPageProps = {
  post: Post;
};

const PostPage = ({ post }: PostPageProps) => {
  return <p>{post.title}</p>;
};

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const data = await fetch('http://external-api.com/posts');
  const posts = await data.json();

  return {
    paths: posts.map(post => ({
      params: { id: post.id },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ id?: string }>): Promise<GetStaticPropsResult<PostPageProps>> {
  const data = await fetch(`http://external-api.com/posts/${params?.id}`);
  const post = await data.json();

  return {
    props: {
      post,
    },
  };
}

export default PostPage;
