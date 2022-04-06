import { gql } from '@apollo/client';
export const query_cv_zip_code = gql`
  query MyQuery {
    zip_code: cv_cat_zip_codes {
      entity
      suburb
      suburb_type
      town
      zip_code
    }
  }
`;
export const query_cv_person = gql`
  query MyQuery($email: String!) {
    cv_person(where: { email: { _eq: $email } }) {
      email
      id_address
      id_phones
      last_name
      name
      id
      picture_type
      picturebase64
    }
  }
`;
