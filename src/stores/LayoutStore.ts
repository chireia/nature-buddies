import { action, makeObservable, observable } from 'mobx'
import React from 'react'

export interface IBreadcrumbItem {
  title: string
  routePath?: string
  icon?: React.ReactNode
}

export class LayoutStore {
  @observable breadcrumbs: IBreadcrumbItem[] = []

  @observable pageTitle = ''

  constructor() {
    makeObservable(this)
  }

  @action.bound
  setBreadcrumbs(items: IBreadcrumbItem[]) {
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
