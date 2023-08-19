import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { user } from '@/lib/schema'

const newUserSchema = z.object({
	username: z.string().nonempty(),
	email: z.string().email(),
	password: z.string().min(7),
	password_confirm: z.string().min(7),
})

export const POST = async (request: NextRequest) => {
	const body = await request.json()

	const newUser = newUserSchema.safeParse(body)

	if (!newUser.success) {
		return NextResponse.json({ status: 400, error: newUser.error })
	}

	const existingUser = await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.email, newUser.data.email),
	})

	if (existingUser) {
		return NextResponse.json({
			status: 400,
			error_type: 'Email',
			message: 'User Already Exist',
		})
	}

	if (newUser.data.password !== newUser.data.password_confirm) {
		return NextResponse.json({
			status: 400,
			error_type: 'Password',
			message: 'Password does not match',
		})
	}

	const hashedPassword = await bcrypt.hash(newUser.data.password, 10)
	const now = new Date()

	await db.insert(user).values({
		name: newUser.data.username,
		email: newUser.data.email,
		hashedPassword: hashedPassword,
		createdAt: now,
		updatedAt: now,
	})

	return NextResponse.json({
		status: 200,
		data: { ...body, hashed_password: hashedPassword },
	})
}
