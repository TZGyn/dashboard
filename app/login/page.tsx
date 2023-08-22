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
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
	const router = useRouter()
	const onSubmit = async () => {
		const body = {
			email,
			password,
		}
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		const responseData = await response.json()

		if (responseData.type === 'success') {
			setEmail('')
			setPassword('')
			router.refresh()
			router.push('/dashboard')
			return
		}

		if (responseData.type === 'credential') {
			setInvalid(true)
			setError(responseData.message)
			return
		}
	}

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [invalid, setInvalid] = useState(false)
	const [error, setError] = useState('')

	return (
		<>
			<Modal
				isOpen={true}
				hideCloseButton
				placement='top-center'>
				<ModalContent
					onKeyUp={(e) => {
						if (e.key === 'Enter') onSubmit()
					}}>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Login
							</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									label='Email'
									placeholder='Enter your email'
									variant='bordered'
									value={email}
									onChange={(event) => {
										setInvalid(false)
										setEmail(event.target.value)
									}}
									color={invalid ? 'danger' : 'default'}
									validationState={
										invalid ? 'invalid' : 'valid'
									}
								/>
								<Input
									label='Password'
									placeholder='Enter your password'
									type='password'
									variant='bordered'
									value={password}
									onChange={(event) => {
										setInvalid(false)
										setPassword(event.target.value)
									}}
									color={invalid ? 'danger' : 'default'}
									errorMessage={invalid && error}
									validationState={
										invalid ? 'invalid' : 'valid'
									}
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									color='primary'
									onPress={onSubmit}>
									Login
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
