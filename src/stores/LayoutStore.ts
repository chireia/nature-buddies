import { action, makeObservable, observable } from 'mobx'
import React from 'react'

export interface BreadcrumbItem {
  title: string
  routePath?: string
  icon?: React.ReactNode
}

export class LayoutStore {
  @observable breadcrumbs: BreadcrumbItem[] = []

  @observable pageTitle = ''

  constructor() {
    makeObservable(this)
  }

  @action.bound
  setBreadcrumbs(items: BreadcrumbItem[]) {
    this.breadcrumbs = items
  }

  @action.bound
  clearBreadcrumbs() {
    this.breadcrumbs = []
  }

  @action.bound
  setPageTitle(title: string) {
    this.pageTitle = title
  }
}
