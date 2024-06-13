import { gql, request } from 'graphql-request'

const MASTER_URL = "https://api-sa-east-1.hygraph.com/v2/clx1w5qht03o207uq3tyceq3l/master" 

const getSliders= async() => {
    const query = gql`
    query GetSliders {
        sliders {
          id
          name
          image {
            id
            url
          }
        }
      }
    `
    const result = await request(MASTER_URL, query);
    return result;
}

const getBusinessLists= async() => {
  const query = gql`
  query GetBusinessList {
    businessLists {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
      }
    }
  }
  `

  const result = await request(MASTER_URL, query);
  return result;
}

const getCategories= async() => {
    const query = gql`
    query GetCategory {
        categories {
          id
          name
          icon {
            url
          }
        }
      } 
    `

    const result = await request(MASTER_URL, query);
    return result;
}


const getBusinessListsByCategories= async(category) => {
  const query = gql`
  query GetBusinessList {
    businessLists(where: {category: {name: "`+category+`"}}) {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
      }
    }
  }
  `

  const result = await request(MASTER_URL, query);
  return result;
}

export default{
    getSliders,
    getCategories,
    getBusinessLists,
    getBusinessListsByCategories
}