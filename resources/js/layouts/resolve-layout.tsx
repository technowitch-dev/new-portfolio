import React, { createElement } from 'react';
import type { PageProps } from '@inertiajs/core';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import PublicLayout from '@/layouts/public-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { dashboard } from '@/routes/admin';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { show as showTwoFactor } from '@/routes/two-factor';
import { edit as editPassword } from '@/routes/user-password';
import { toUrl } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';

type LayoutConfig = {
    layout: 'public' | 'auth' | 'app' | 'settings';
    title?: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
};

const PAGE_CONFIG: Record<string, LayoutConfig> = {
    home: { layout: 'public', title: 'Home' },
    links: { layout: 'public', title: 'Links' },
    'blog/index': { layout: 'public', title: 'Blog' },
    'blog/show': { layout: 'public' },
    'admin/dashboard': { layout: 'public', title: 'Admin' },
    'admin/links/index': { layout: 'public', title: 'Manage Links' },
    'admin/links/create': { layout: 'public', title: 'Create Link' },
    'admin/links/edit': { layout: 'public', title: 'Edit Link' },
    'admin/blog/index': { layout: 'public', title: 'Manage Blog Posts' },
    'admin/blog/create': { layout: 'public', title: 'Create Blog Post' },
    'admin/blog/edit': { layout: 'public', title: 'Edit Blog Post' },
    'admin/settings': { layout: 'public', title: 'Settings' },
    'auth/login': {
        layout: 'auth',
        title: 'Log in to your account',
        description: 'Enter your email and password below to log in',
    },
    'auth/register': {
        layout: 'auth',
        title: 'Create an account',
        description: 'Enter your details below to create your account',
    },
    'auth/forgot-password': {
        layout: 'auth',
        title: 'Forgot your password?',
        description: 'Enter your email and we will send you a password reset link',
    },
    'auth/reset-password': {
        layout: 'auth',
        title: 'Reset password',
        description: 'Enter your new password below',
    },
    'auth/verify-email': {
        layout: 'auth',
        title: 'Verify your email',
        description: 'Thanks for signing up! Please verify your email address',
    },
    'auth/confirm-password': {
        layout: 'auth',
        title: 'Confirm password',
        description: 'This is a secure area. Please confirm your password',
    },
    'auth/two-factor-challenge': {
        layout: 'auth',
        title: 'Two-factor authentication',
        description: 'Please confirm access to your account by entering the authentication code',
    },
    dashboard: {
        layout: 'app',
        breadcrumbs: [{ title: 'Dashboard', href: toUrl(dashboard()) }],
    },
    'settings/profile': {
        layout: 'settings',
        breadcrumbs: [{ title: 'Profile settings', href: toUrl(editProfile()) }],
    },
    'settings/password': {
        layout: 'settings',
        breadcrumbs: [{ title: 'Password', href: toUrl(editPassword()) }],
    },
    'settings/two-factor': {
        layout: 'settings',
        breadcrumbs: [{ title: 'Two-Factor Auth', href: toUrl(showTwoFactor()) }],
    },
    'settings/appearance': {
        layout: 'settings',
        breadcrumbs: [{ title: 'Appearance', href: toUrl(editAppearance()) }],
    },
    'settings/errors': { layout: 'public', title: 'Error' },
};

const ERROR_TITLES: Record<number, string> = {
    403: '403: Forbidden',
    404: '404: Page Not Found',
    500: '500: Server Error',
    503: '503: Service Unavailable',
};

function getPageTitle(name: string, props: PageProps): string {
    const config = PAGE_CONFIG[name];
    const typedProps = props as Record<string, unknown>;

    if (name === 'settings/errors' && typeof typedProps.status === 'number') {
        return ERROR_TITLES[typedProps.status] ?? 'Error';
    }
    if (config?.title) return config.title;

    if (typedProps.post && typeof typedProps.post === 'object' && typedProps.post !== null) {
        const post = typedProps.post as { title?: string };
        if (post.title) return post.title;
    }
    if (typeof typedProps.title === 'string') return typedProps.title;

    const fallbacks: Record<string, string> = {
        'blog/show': 'Blog',
    };
    return fallbacks[name] ?? 'Technowitch';
}

export function resolveLayout(
    name: string,
    Page: React.ComponentType<PageProps>,
    props: PageProps,
): React.ReactElement {
    const config = PAGE_CONFIG[name] ?? { layout: 'public', title: 'Technowitch' };
    const title = getPageTitle(name, props);
    const pageElement = createElement(Page, props);

    switch (config.layout) {
        case 'auth':
            return createElement(
                AuthLayout,
                {
                    title: config.title ?? title,
                    description: config.description ?? '',
                },
                pageElement,
            );
        case 'app':
            return createElement(
                AppLayout,
                { breadcrumbs: config.breadcrumbs ?? [] },
                pageElement,
            );
        case 'settings':
            return createElement(
                AppLayout,
                { breadcrumbs: config.breadcrumbs ?? [] },
                createElement(SettingsLayout, null, pageElement),
            );
        case 'public':
        default:
            return createElement(PublicLayout, { title }, pageElement);
    }
}
