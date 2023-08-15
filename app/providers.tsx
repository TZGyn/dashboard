'use client'

import * as React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { Bookmark } from '@/types'
import { useDisclosure } from '@nextui-org/modal'

export interface ProvidersProps {
	children: React.ReactNode
	themeProps?: ThemeProviderProps
}

export type EditBookmarkContextContent = {
	isEditBookmark: boolean
	onIsEditBookmark: () => void
	onIsEditBookmarkChange: () => void
}

export const EditBookmarkContext =
	React.createContext<EditBookmarkContextContent>({
		isEditBookmark: false,
		onIsEditBookmark: () => {},
		onIsEditBookmarkChange: () => {},
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
		category_id: 2,
	},
	setBookmark: () => {},
})

export function Providers({ children, themeProps }: ProvidersProps) {
	// const [isEditBookmark, setIsEditBookmark] = React.useState<boolean>(false)
	const {
		isOpen: isEditBookmark,
		onOpen: onIsEditBookmark,
		onOpenChange: onIsEditBookmarkChange,
	} = useDisclosure()
	const [bookmark, setBookmark] = React.useState<Bookmark>({
		id: 0,
		name: '',
		link: '',
		description: '',
		url: '',
		category_id: 2,
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
					onIsEditBookmark,
					onIsEditBookmarkChange,
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
