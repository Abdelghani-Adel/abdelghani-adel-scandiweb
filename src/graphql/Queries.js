import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export const LoadProducts = async (category) => {
  const response = await apolloClient.query({
    query: gql`
      query {
        category ${category ? `(input: { title: "${category}" })` : ""} {
          name
          products {
            id
            brand
            name
            inStock
            description
            category
            gallery
            attributes {
              id
              name
              type
              items {
                id
                value
                displayValue
              }
            }
            prices {
              amount
              currency {
                label
                symbol
              }
            }
          }
        }
      }
    `,
  });

  const products = response.data.category.products;
  return products;
};

export const LoadSingleProduct = async (id) => {
  const response = await apolloClient.query({
    query: gql`
      query {
        product (id: "${id}") {
          id
          name
          inStock
          gallery
          description
          prices {
            amount
            currency {
              label
              symbol
            }
          }
          brand
          attributes {
            id
            name
            type
            items {
              id
              value
              displayValue
            }
          }
        }
      }
    `,
  });

  const product = response.data.product;
  return product;
};

export const LoadCategories = async () => {
  const response = await apolloClient.query({
    query: gql`
      query {
        categories {
          name
        }
      }
    `,
  });

  const categories = response.data.categories;
  return categories;
};

export const LoadCurrencies = async () => {
  const response = await apolloClient.query({
    query: gql`
      query {
        currencies {
          label
          symbol
        }
      }
    `,
  });

  const currencies = response.data.currencies;
  return currencies;
};
