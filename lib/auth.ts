import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { db } from './db'

export const getUser = async (token: RequestCookie | undefined) => {
	if (!token) return null

	const existing_session = await db.query.sessions.findFirst({
		where: (session, { eq }) => eq(session.sessionToken, token.value),
		with: {
			user: true,
		},
	})

	if (!existing_session) return null

	if (existing_session.expires < new Date()) return null

	return existing_session.user
}
