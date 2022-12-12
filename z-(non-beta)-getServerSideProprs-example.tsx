import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

type Product = {
  id: string;
  title: string;
};

type SearchResultsPageProps = {
  products: Array<Product>;
};

const SearchResultsPage = ({ products }: SearchResultsPageProps) => (
  <div>
    {products.map(product => (
      <p key={product.id}>{product.title}</p>
    ))}
  </div>
);

export async function getServerSideProps({ res, query }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<SearchResultsPageProps>> {
  const category = query?.category;

  if (!category) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    };
  }

  const data = await fetch(`http://external-api.com/products?category=${category}`);
  const products = await data.json();

  if (products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products,
    },
  };
}

//example of generics
// export default ProductsPage;

// type AsyncData<T> = {
//   data: T;
//   fulfilled?: boolean;
//   loading?: boolean;
//   error?: boolean;
// };

// type AsyncGames = AsyncData<String[]>;
// type AsyncGame = AsyncData<String | null>;
// type AsyncUser = AsyncData<boolean | null>;
// type AsyncUserGames = AsyncData<number[]>;
