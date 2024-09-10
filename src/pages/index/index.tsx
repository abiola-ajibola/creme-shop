import Head from "next/head";
import ProductsListStyles from "./ProductsListStyles";
import { MainStyles } from "./MainStyles";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/types/product";

/* 
  Cart might contain; product, product-id, shipping address, user (user who made the order), created-on, isDelivered
*/

export default function Home({ products }: { products: ProductType[] }) {
  return (
    <>
      <Head>
        <title>Creme Shop</title>
        <meta
          name="description"
          content="The one stop shop for all your needs"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MainStyles>
        <ProductsListStyles>
          {products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </ProductsListStyles>
      </MainStyles>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/products`,
  );
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}
