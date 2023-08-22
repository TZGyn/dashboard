import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { sessions } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export const POST = async (request: NextRequest) => {
	const token = cookies().get('token')

	if (!token) {
		return NextResponse.json(
			{ message: 'Unauthenticated' },
			{
				status: 401,
			}
		)
	}

	const session = await db.query.sessions.findFirst({
		where: (session, { eq }) => eq(session.sessionToken, token.value),
	})

	if (!session) {
		return NextResponse.json(
			{ message: 'Invalid Token' },
			{
				status: 401,
			}
		)
	}

	if (session.expires < new Date()) {
		return NextResponse.json(
			{ message: 'Invalid Token' },
			{
				status: 401,
			}
		)
	}

	await db
		.update(sessions)
		.set({ expires: new Date() })
		.where(eq(sessions.sessionToken, token.value))

	return NextResponse.json(
		{ message: 'Successfully Logged Out' },
		{
			status: 200,
		}
	)
}
