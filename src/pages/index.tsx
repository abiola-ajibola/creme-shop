import Head from "next/head";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { MainStyles } from "@/styles/MainStyles";
import ProductCard from "@/components/ProductCard";
import ProductsListStyles from "@/styles/ProductsListStyles";
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
    `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/products`
  );
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}
