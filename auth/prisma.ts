import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
	# Write your query or mutation here
	mutation(
		$email: String!
		$name: String!
		$authid: String!
		$authmethod: String!
	) {
		createUser(
			name: $name
			email: $email
			authid: $authid
			authmethod: $authmethod
		) {
			id
		}
	}
`;

export const signupOnPrisma = (
	email,
	name,
	authid,
	authmethod,
	apolloClient
) => {
	return new Promise((resolve, reject) => {
		apolloClient
			.mutate({
				mutation: SIGNUP_MUTATION,
				variables: {
					authid: authid,
					// we only allow local now
					authmethod: authmethod,
					name: name,
					email: email,
				},
			})
			.then(data => {
				resolve(data);
			})
			.catch((error: any) => {
				reject(error);
			});
	});
};
