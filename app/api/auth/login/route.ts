import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { sessions } from '@/lib/schema'

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

export const POST = async (request: NextRequest) => {
	const body = await request.json()

	const credential = loginSchema.safeParse(body)

	if (!credential.success) {
		return NextResponse.json(
			{ type: 'credential', message: 'Invalid Credential' } as const,
			{
				status: 400,
			}
		)
	}

	const existing_user = await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.email, credential.data.email),
	})

	if (!existing_user) {
		return NextResponse.json(
			{ type: 'credential', message: 'Invalid Credential' } as const,
			{
				status: 400,
			}
		)
	}

	const isValidPassword = await bcrypt.compare(
		credential.data.password,
		existing_user.hashedPassword
	)

	if (!isValidPassword) {
		return NextResponse.json(
			{ type: 'credential', message: 'Invalid Credential' } as const,
			{
				status: 400,
			}
		)
	}

	const token = crypto.randomUUID()
	const now = new Date()
	now.setTime(now.getTime() + 4 * 60 * 60 * 1000)

	await db.insert(sessions).values({
		userId: existing_user.id,
		sessionToken: token,
		expires: now,
	})

	const environment = process.env.ENVIRONMENT ?? 'dev'

	return NextResponse.json(
		{
			type: 'success',
			message: 'Login Successful',
		} as const,
		{
			status: 200,
			headers: {
				'Set-Cookie': `token=${token}${
					environment === 'dev' ? '' : '; Secure'
				}; httpOnly; sameSite=Strict; Path=/`,
			},
		}
	)
}
