'use client'

import * as React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { Bookmark } from '@/types'

export interface ProvidersProps {
	children: React.ReactNode
	themeProps?: ThemeProviderProps
}

export type EditBookmarkContextContent = {
	isEditBookmark: boolean
	setIsEditBookmark: (c: boolean) => void
}

export const EditBookmarkContext =
	React.createContext<EditBookmarkContextContent>({
		isEditBookmark: false,
		setIsEditBookmark: () => {},
	})

export type BookmarkContextContent = {
	bookmark: Bookmark
	setBookmark: (c: Bookmark) => void
}

export const BookmarkContext = React.createContext<BookmarkContextContent>({
	bookmark: {
		id: 0,
		name: '',
		link: '',
		description: '',
		url: '',
	},
	setBookmark: () => {},
})

export function Providers({ children, themeProps }: ProvidersProps) {
	const [isEditBookmark, setIsEditBookmark] = React.useState<boolean>(false)
	const [bookmark, setBookmark] = React.useState<Bookmark>({
		id: 0,
		name: '',
		link: '',
		description: '',
		url: '',
	})
	return (
		<BookmarkContext.Provider
			value={{
				bookmark,
				setBookmark,
			}}>
			<EditBookmarkContext.Provider
				value={{
					isEditBookmark,
					setIsEditBookmark,
				}}>
				<NextUIProvider>
					<NextThemesProvider {...themeProps}>
						{children}
					</NextThemesProvider>
				</NextUIProvider>
			</EditBookmarkContext.Provider>
		</BookmarkContext.Provider>
	)
}
