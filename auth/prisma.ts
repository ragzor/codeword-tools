import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
	# Write your query or mutation here
	mutation(
		$email: String!
		$name: String!
		$authId: String!
		$authMethod: String!
	) {
		createUser(
			name: $name
			email: $email
			authid: $authId
			authmethod: $authMethod
		) {
			id
		}
	}
`;

export const signupOnPrisma = (
	email: any,
	name: any,
	authId: any,
	authmethod: any,
	apolloClient: any,
	query?: any
) => {
	return new Promise((resolve, reject) => {
		apolloClient
			.mutate({
				mutation: query || SIGNUP_MUTATION,
				variables: {
					authId: authId,
					// we only allow local now
					authMethod: authmethod,
					name: name,
					email: email,
				},
			})
			.then((data: any) => {
				resolve(data);
			})
			.catch((error: any) => {
				reject(error);
			});
	});
};