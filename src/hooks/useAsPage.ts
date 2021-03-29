import { useEffect } from 'react'
import { IBreadcrumbItem } from '../stores/LayoutStore'
import { useStore } from './useStore'

export interface IPageOptions {
  title: string
  breadcrumbs?: IBreadcrumbItem[]
}

export function useAsPage(options: IPageOptions) {
  const { setPageTitle, setBreadcrumbs, clearBreadcrumbs } = useStore('layout')

  useEffect(() => {
    if (options.breadcrumbs) setBreadcrumbs(options.breadcrumbs)
    else clearBreadcrumbs()

    setPageTitle(options.title)
  }, [options])
}
