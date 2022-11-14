export const fetchCategory = async (category) => {
  const response = await fetch("http://localhost:4000", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `
             query {
              category (input: {title: "${category}"})  {
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
    }),
  });

  const data = await response.json();

  const products = data.data.category.products;
  const categoryName = data.data.category.name;

  return { products: products, categoryName: categoryName };
};

export const fetchProduct = async (id) => {
  const response = await fetch("http://localhost:4000", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `
             query {
              product (id: "${id}") {
                id
                name
                inStock
                gallery
                description
                category
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
    }),
  });
  const data = await response.json();
  const product = data.data.product;

  return product;
};

export const fetchCategories = async () => {
  const response = await fetch("http://localhost:4000", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `
             query {
              categories {
                name
              }
            }
          `,
    }),
  });

  const data = await response.json();
  const categories = data.data.categories;
  return categories;
};

export const fetchCurrencies = async () => {
  const response = await fetch("http://localhost:4000", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `
             query {
              currencies {
                label
                symbol
              }
            }
          `,
    }),
  });

  const data = await response.json();
  const currencies = data.data.currencies;
  return currencies;
};
