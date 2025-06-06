/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import type { CreateFileRoute, FileRoutesByPath } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthRouteImport } from './routes/_auth'
import { Route as AppRouteImport } from './routes/_app'
import { Route as IndexRouteRouteImport } from './routes/index.route'
import { Route as AuthSignupRouteRouteImport } from './routes/_auth/signup.route'
import { Route as AuthResetPasswordRouteRouteImport } from './routes/_auth/reset-password.route'
import { Route as AuthPasswordChangedRouteRouteImport } from './routes/_auth/password-changed.route'
import { Route as AuthLoginRouteRouteImport } from './routes/_auth/login.route'
import { Route as AuthForgotPasswordRouteRouteImport } from './routes/_auth/forgot-password.route'
import { Route as AppDashboardRouteRouteImport } from './routes/_app/dashboard.route'

// Create/Update Routes

const AuthRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AppRoute = AppRouteImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const IndexRouteRoute = IndexRouteRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignupRouteRoute = AuthSignupRouteRouteImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => AuthRoute,
} as any)

const AuthResetPasswordRouteRoute = AuthResetPasswordRouteRouteImport.update({
  id: '/reset-password',
  path: '/reset-password',
  getParentRoute: () => AuthRoute,
} as any)

const AuthPasswordChangedRouteRoute =
  AuthPasswordChangedRouteRouteImport.update({
    id: '/password-changed',
    path: '/password-changed',
    getParentRoute: () => AuthRoute,
  } as any)

const AuthLoginRouteRoute = AuthLoginRouteRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const AuthForgotPasswordRouteRoute = AuthForgotPasswordRouteRouteImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => AuthRoute,
} as any)

const AppDashboardRouteRoute = AppDashboardRouteRouteImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteRouteImport
      parentRoute: typeof rootRoute
    }
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/_app/dashboard': {
      id: '/_app/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AppDashboardRouteRouteImport
      parentRoute: typeof AppRouteImport
    }
    '/_auth/forgot-password': {
      id: '/_auth/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof AuthForgotPasswordRouteRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginRouteRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/password-changed': {
      id: '/_auth/password-changed'
      path: '/password-changed'
      fullPath: '/password-changed'
      preLoaderRoute: typeof AuthPasswordChangedRouteRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/reset-password': {
      id: '/_auth/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof AuthResetPasswordRouteRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/signup': {
      id: '/_auth/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof AuthSignupRouteRouteImport
      parentRoute: typeof AuthRouteImport
    }
  }
}

// Add type-safety to the createFileRoute function across the route tree

declare module './routes/index.route' {
  const createFileRoute: CreateFileRoute<
    '/',
    FileRoutesByPath['/']['parentRoute'],
    FileRoutesByPath['/']['id'],
    FileRoutesByPath['/']['path'],
    FileRoutesByPath['/']['fullPath']
  >
}
declare module './routes/_app' {
  const createFileRoute: CreateFileRoute<
    '/_app',
    FileRoutesByPath['/_app']['parentRoute'],
    FileRoutesByPath['/_app']['id'],
    FileRoutesByPath['/_app']['path'],
    FileRoutesByPath['/_app']['fullPath']
  >
}
declare module './routes/_auth' {
  const createFileRoute: CreateFileRoute<
    '/_auth',
    FileRoutesByPath['/_auth']['parentRoute'],
    FileRoutesByPath['/_auth']['id'],
    FileRoutesByPath['/_auth']['path'],
    FileRoutesByPath['/_auth']['fullPath']
  >
}
declare module './routes/_app/dashboard.route' {
  const createFileRoute: CreateFileRoute<
    '/_app/dashboard',
    FileRoutesByPath['/_app/dashboard']['parentRoute'],
    FileRoutesByPath['/_app/dashboard']['id'],
    FileRoutesByPath['/_app/dashboard']['path'],
    FileRoutesByPath['/_app/dashboard']['fullPath']
  >
}
declare module './routes/_auth/forgot-password.route' {
  const createFileRoute: CreateFileRoute<
    '/_auth/forgot-password',
    FileRoutesByPath['/_auth/forgot-password']['parentRoute'],
    FileRoutesByPath['/_auth/forgot-password']['id'],
    FileRoutesByPath['/_auth/forgot-password']['path'],
    FileRoutesByPath['/_auth/forgot-password']['fullPath']
  >
}
declare module './routes/_auth/login.route' {
  const createFileRoute: CreateFileRoute<
    '/_auth/login',
    FileRoutesByPath['/_auth/login']['parentRoute'],
    FileRoutesByPath['/_auth/login']['id'],
    FileRoutesByPath['/_auth/login']['path'],
    FileRoutesByPath['/_auth/login']['fullPath']
  >
}
declare module './routes/_auth/password-changed.route' {
  const createFileRoute: CreateFileRoute<
    '/_auth/password-changed',
    FileRoutesByPath['/_auth/password-changed']['parentRoute'],
    FileRoutesByPath['/_auth/password-changed']['id'],
    FileRoutesByPath['/_auth/password-changed']['path'],
    FileRoutesByPath['/_auth/password-changed']['fullPath']
  >
}
declare module './routes/_auth/reset-password.route' {
  const createFileRoute: CreateFileRoute<
    '/_auth/reset-password',
    FileRoutesByPath['/_auth/reset-password']['parentRoute'],
    FileRoutesByPath['/_auth/reset-password']['id'],
    FileRoutesByPath['/_auth/reset-password']['path'],
    FileRoutesByPath['/_auth/reset-password']['fullPath']
  >
}
declare module './routes/_auth/signup.route' {
  const createFileRoute: CreateFileRoute<
    '/_auth/signup',
    FileRoutesByPath['/_auth/signup']['parentRoute'],
    FileRoutesByPath['/_auth/signup']['id'],
    FileRoutesByPath['/_auth/signup']['path'],
    FileRoutesByPath['/_auth/signup']['fullPath']
  >
}

// Create and export the route tree

interface AppRouteChildren {
  AppDashboardRouteRoute: typeof AppDashboardRouteRoute
}

const AppRouteChildren: AppRouteChildren = {
  AppDashboardRouteRoute: AppDashboardRouteRoute,
}

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren)

interface AuthRouteChildren {
  AuthForgotPasswordRouteRoute: typeof AuthForgotPasswordRouteRoute
  AuthLoginRouteRoute: typeof AuthLoginRouteRoute
  AuthPasswordChangedRouteRoute: typeof AuthPasswordChangedRouteRoute
  AuthResetPasswordRouteRoute: typeof AuthResetPasswordRouteRoute
  AuthSignupRouteRoute: typeof AuthSignupRouteRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthForgotPasswordRouteRoute: AuthForgotPasswordRouteRoute,
  AuthLoginRouteRoute: AuthLoginRouteRoute,
  AuthPasswordChangedRouteRoute: AuthPasswordChangedRouteRoute,
  AuthResetPasswordRouteRoute: AuthResetPasswordRouteRoute,
  AuthSignupRouteRoute: AuthSignupRouteRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRouteRoute
  '': typeof AuthRouteWithChildren
  '/dashboard': typeof AppDashboardRouteRoute
  '/forgot-password': typeof AuthForgotPasswordRouteRoute
  '/login': typeof AuthLoginRouteRoute
  '/password-changed': typeof AuthPasswordChangedRouteRoute
  '/reset-password': typeof AuthResetPasswordRouteRoute
  '/signup': typeof AuthSignupRouteRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRouteRoute
  '': typeof AuthRouteWithChildren
  '/dashboard': typeof AppDashboardRouteRoute
  '/forgot-password': typeof AuthForgotPasswordRouteRoute
  '/login': typeof AuthLoginRouteRoute
  '/password-changed': typeof AuthPasswordChangedRouteRoute
  '/reset-password': typeof AuthResetPasswordRouteRoute
  '/signup': typeof AuthSignupRouteRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRouteRoute
  '/_app': typeof AppRouteWithChildren
  '/_auth': typeof AuthRouteWithChildren
  '/_app/dashboard': typeof AppDashboardRouteRoute
  '/_auth/forgot-password': typeof AuthForgotPasswordRouteRoute
  '/_auth/login': typeof AuthLoginRouteRoute
  '/_auth/password-changed': typeof AuthPasswordChangedRouteRoute
  '/_auth/reset-password': typeof AuthResetPasswordRouteRoute
  '/_auth/signup': typeof AuthSignupRouteRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/dashboard'
    | '/forgot-password'
    | '/login'
    | '/password-changed'
    | '/reset-password'
    | '/signup'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/dashboard'
    | '/forgot-password'
    | '/login'
    | '/password-changed'
    | '/reset-password'
    | '/signup'
  id:
    | '__root__'
    | '/'
    | '/_app'
    | '/_auth'
    | '/_app/dashboard'
    | '/_auth/forgot-password'
    | '/_auth/login'
    | '/_auth/password-changed'
    | '/_auth/reset-password'
    | '/_auth/signup'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRouteRoute: typeof IndexRouteRoute
  AppRoute: typeof AppRouteWithChildren
  AuthRoute: typeof AuthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRouteRoute: IndexRouteRoute,
  AppRoute: AppRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_app",
        "/_auth"
      ]
    },
    "/": {
      "filePath": "index.route.tsx"
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/dashboard"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/forgot-password",
        "/_auth/login",
        "/_auth/password-changed",
        "/_auth/reset-password",
        "/_auth/signup"
      ]
    },
    "/_app/dashboard": {
      "filePath": "_app/dashboard.route.tsx",
      "parent": "/_app"
    },
    "/_auth/forgot-password": {
      "filePath": "_auth/forgot-password.route.tsx",
      "parent": "/_auth"
    },
    "/_auth/login": {
      "filePath": "_auth/login.route.tsx",
      "parent": "/_auth"
    },
    "/_auth/password-changed": {
      "filePath": "_auth/password-changed.route.tsx",
      "parent": "/_auth"
    },
    "/_auth/reset-password": {
      "filePath": "_auth/reset-password.route.tsx",
      "parent": "/_auth"
    },
    "/_auth/signup": {
      "filePath": "_auth/signup.route.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
