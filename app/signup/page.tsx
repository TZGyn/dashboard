'use client'

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Link } from '@nextui-org/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignUpForm() {
	const router = useRouter()
	const onSubmit = async () => {
		const body = {
			username,
			email,
			password,
			password_confirm: passwordConfirm,
		}
		const response = await fetch('/api/auth/signup', {
			method: 'POST',
			body: JSON.stringify(body),
		})

		const responseData = await response.json()

		if (responseData.status === 200) {
			setUsername('')
			setEmail('')
			setPassword('')
			setPasswordConfirm('')
			return
		}

		if (responseData.message) {
			setEmailInvalid(true)
		}
	}

	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')

	const [emailInvalid, setEmailInvalid] = useState(false)
	const [passwordInvalid, setPasswordInvalid] = useState(false)

	return (
		<>
			<Modal
				isOpen={true}
				placement='center'>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Sign Up
							</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									label='Username'
									placeholder='Enter your username'
									variant='bordered'
									value={username}
									onChange={(event) => {
										setUsername(event.target.value)
									}}
								/>
								<Input
									label='Email'
									placeholder='Enter your email'
									variant='bordered'
									value={email}
									onChange={(event) => {
										setEmailInvalid(false)
										setEmail(event.target.value)
									}}
									color={emailInvalid ? 'danger' : 'default'}
									errorMessage={
										emailInvalid && 'Account already exist'
									}
									validationState={
										emailInvalid ? 'invalid' : 'valid'
									}
								/>
								<Input
									label='Password'
									placeholder='Enter your password'
									type='password'
									variant='bordered'
									value={password}
									onChange={(event) => {
										setPassword(event.target.value)
									}}
								/>
								<Input
									label='Confirm Password'
									placeholder='Confirm your password'
									type='password'
									variant='bordered'
									value={passwordConfirm}
									onChange={(event) => {
										setPasswordConfirm(event.target.value)
									}}
								/>
								<div className='flex justify-end px-1 py-2'>
									<Link
										color='primary'
										href='/login'
										size='sm'
										underline='always'>
										Already have an account? Login
									</Link>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color='primary'
									onPress={onSubmit}>
									Sign up
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
