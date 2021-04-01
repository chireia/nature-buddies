import { useEffect } from 'react'
import { BreadcrumbItem } from '../stores/LayoutStore'
import { useStore } from './useStore'

export interface PageOptions {
  title: string
  breadcrumbs?: BreadcrumbItem[]
}

export function useAsPage(options: PageOptions) {
  const { setPageTitle, setBreadcrumbs, clearBreadcrumbs } = useStore('layout')

  useEffect(() => {
    if (options.breadcrumbs) setBreadcrumbs(options.breadcrumbs)
    else clearBreadcrumbs()

    setPageTitle(options.title)
  }, [options])
}
