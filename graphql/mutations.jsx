import { gql } from "@apollo/client";
export const insert_cv_tb_person = gql`
	mutation insert_cv_tb_person($data: cv_tb_person_insert_input!) {
		insert_cv_tb_person_one(object: $data) {
			id
			email
			last_name
			name
		}
	}
`;
export const update_cv_tb_person = gql`
	mutation update_cv_tb_person($email: String!, $picture: bytea!, $picture_type: String!) {
		update_cv_tb_person(where: { email: { _eq: $email } }, _set: { picturebase64: $picture, picture_type: $picture_type }) {
			affected_rows
			returning {
				picture_type
				picturebase64
			}
		}
	}
`;
