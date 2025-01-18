import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma"

type OrderPageProps = {
  params: Promise<{category: string}>;
}

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  });

  return products;
}


export default async function OrderPage({ params }: OrderPageProps) {
  const { category } = await params;
  const products = await getProducts(category);

  return (
    <>
      <Heading>
        Elige y personaliza tu pedido a continuación
      </Heading>

      <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-start gap-5">
        {products.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}
